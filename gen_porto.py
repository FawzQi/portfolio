"""
generate_pdf.py — Portfolio PDF Generator with Images
======================================================
Reads all JSON data files and produces a polished, print-ready portfolio PDF
that includes your profile photo and project/experience images.

Usage:
    python generate_pdf.py
    python generate_pdf.py --output my_portfolio.pdf
    python generate_pdf.py --data-dir ./src/data --public-dir ./public --output ./portfolio.pdf

Image path resolution:
    JSON stores paths like "/images/profile.jpg"
    Script resolves them as:  <public-dir>/images/profile.jpg
    Missing images are silently skipped (gradient placeholder shown instead).
"""

import json, argparse, os, io
from pathlib import Path

from PIL import Image as PILImage

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    Table, TableStyle, KeepTogether, PageBreak, Image
)
from reportlab.platypus.flowables import Flowable

# ─── Brand colors ─────────────────────────────────────────────
BLUE        = colors.HexColor('#2563EB')
BLUE_LIGHT  = colors.HexColor('#DBEAFE')
BLUE_DARK   = colors.HexColor('#1E3A8A')
YELLOW      = colors.HexColor('#FACC15')
YELLOW_SOFT = colors.HexColor('#FEF9C3')
ORANGE      = colors.HexColor('#FB923C')
SLATE_900   = colors.HexColor('#0F172A')
SLATE_700   = colors.HexColor('#334155')
SLATE_500   = colors.HexColor('#64748B')
SLATE_300   = colors.HexColor('#CBD5E1')
SLATE_100   = colors.HexColor('#F1F5F9')
WHITE       = colors.white

PAGE_W, PAGE_H = A4
MARGIN      = 1.8 * cm
CONTENT_W   = PAGE_W - 2 * MARGIN

TYPE_COLORS = {
    'work':        (BLUE,   WHITE),
    'education':   (YELLOW, SLATE_900),
    'achievement': (ORANGE, WHITE),
}
TYPE_LABELS = {
    'work':        'WORK',
    'education':   'EDUCATION',
    'achievement': 'ACHIEVEMENT',
}


# ════════════════════════════════════════════════════════════════
# Image helpers
# ════════════════════════════════════════════════════════════════

def resolve_image(src_path: str, public_dir: Path) -> Path | None:
    """Convert a JSON image path like /images/foo.jpg → absolute Path, or None."""
    if not src_path:
        return None
    # Strip leading slash and join with public dir
    rel = src_path.lstrip('/')
    full = public_dir / rel
    return full if full.exists() else None


def fit_image(path: Path, max_w: float, max_h: float) -> Image | None:
    """
    Load an image and return a ReportLab Image flowable scaled to fit
    within max_w × max_h while preserving aspect ratio.
    Returns None if the file can't be opened.
    """
    try:
        with PILImage.open(path) as pil_img:
            orig_w, orig_h = pil_img.size
    except Exception:
        return None

    ratio = min(max_w / orig_w, max_h / orig_h)
    draw_w = orig_w * ratio
    draw_h = orig_h * ratio
    return Image(str(path), width=draw_w, height=draw_h)


def image_strip(paths: list[Path], total_w: float, target_h: float, gap: float = 4) -> Table | None:
    """
    Lay out up to `n` images side-by-side in a single Table row.
    Each image is constrained to (total_w/n - gap) × target_h.
    Returns None if no valid images.
    """
    valid = [p for p in paths if p and p.exists()]
    if not valid:
        return None

    n       = len(valid)
    cell_w  = (total_w - gap * (n - 1)) / n
    cells   = []
    col_ws  = []

    for i, p in enumerate(valid):
        img = fit_image(p, cell_w, target_h)
        if img:
            cells.append(img)
            col_ws.append(cell_w)
        else:
            cells.append(Spacer(cell_w, 1))
            col_ws.append(cell_w)

    if not cells:
        return None

    tbl = Table([cells], colWidths=col_ws)
    tbl.setStyle(TableStyle([
        ('ALIGN',         (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING',   (0, 0), (-1, -1), 0),
        ('RIGHTPADDING',  (0, 0), (-1, -1), gap / 2),
        ('TOPPADDING',    (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return tbl


# ════════════════════════════════════════════════════════════════
# Custom Flowables
# ════════════════════════════════════════════════════════════════

class ColorBar(Flowable):
    def __init__(self, height=3, color=BLUE, width=None):
        super().__init__()
        self.bar_height = height
        self.color      = color
        self.bar_width  = width
        self.width      = 0
        self.height     = height

    def draw(self):
        w = self.bar_width or CONTENT_W
        self.canv.setFillColor(self.color)
        self.canv.rect(0, 0, w, self.bar_height, stroke=0, fill=1)


class SectionHeader(Flowable):
    def __init__(self, title, width=CONTENT_W):
        super().__init__()
        self.title = title
        self.width = width
        self.height = 28

    def draw(self):
        c = self.canv
        c.setFillColor(YELLOW)
        c.rect(0, 0, 4, self.height, stroke=0, fill=1)
        c.setFillColor(SLATE_900)
        c.setFont('Helvetica-Bold', 13)
        c.drawString(12, 8, self.title.upper())
        title_w = c.stringWidth(self.title.upper(), 'Helvetica-Bold', 13)
        c.setStrokeColor(SLATE_300)
        c.setLineWidth(0.5)
        c.line(12 + title_w + 10, 14, self.width, 14)


class CircleImage(Flowable):
    """
    Draws a circular-clipped image (profile photo).
    Falls back to a colored initials circle if the image is missing.
    """
    def __init__(self, image_path: Path | None, diameter: float,
                 fallback_initials: str = 'AF'):
        super().__init__()
        self.image_path       = image_path
        self.diameter         = diameter
        self.fallback_initials = fallback_initials
        self.width            = diameter
        self.height           = diameter

    def draw(self):
        c   = self.canv
        d   = self.diameter
        r   = d / 2
        cx, cy = r, r   # center in local coords

        # Clip to circle
        p = c.beginPath()
        p.circle(cx, cy, r)
        c.clipPath(p, stroke=0, fill=0)

        if self.image_path and self.image_path.exists():
            # Draw image inside the clipped region
            c.drawImage(
                str(self.image_path),
                0, 0, d, d,
                preserveAspectRatio=True,
                anchor='c',
                mask='auto',
            )
        else:
            # Fallback: blue circle with yellow initials
            c.setFillColor(BLUE_DARK)
            c.circle(cx, cy, r, stroke=0, fill=1)
            c.setFillColor(YELLOW)
            c.setFont('Helvetica-Bold', d * 0.32)
            text_w = c.stringWidth(self.fallback_initials, 'Helvetica-Bold', d * 0.32)
            c.drawString(cx - text_w / 2, cy - d * 0.12, self.fallback_initials)

        # Draw yellow border ring
        c.setStrokeColor(YELLOW)
        c.setLineWidth(2.5)
        c.circle(cx, cy, r - 1, stroke=1, fill=0)


# ════════════════════════════════════════════════════════════════
# Style registry
# ════════════════════════════════════════════════════════════════

def make_styles():
    return {
        'normal': ParagraphStyle(
            'normal', fontName='Helvetica', fontSize=9,
            textColor=SLATE_700, leading=14, spaceAfter=4),
        'small': ParagraphStyle(
            'small', fontName='Helvetica', fontSize=8,
            textColor=SLATE_500, leading=12),
        'bold': ParagraphStyle(
            'bold', fontName='Helvetica-Bold', fontSize=9,
            textColor=SLATE_900, leading=14),
        'title_name': ParagraphStyle(
            'title_name', fontName='Helvetica-Bold', fontSize=24,
            textColor=WHITE, leading=28),
        'title_role': ParagraphStyle(
            'title_role', fontName='Helvetica', fontSize=11,
            textColor=colors.HexColor('#BFDBFE'), leading=16),
        'title_tagline': ParagraphStyle(
            'title_tagline', fontName='Helvetica', fontSize=8.5,
            textColor=colors.HexColor('#93C5FD'), leading=13),
        'contact_item': ParagraphStyle(
            'contact_item', fontName='Helvetica', fontSize=8,
            textColor=colors.HexColor('#DBEAFE'), leading=13),
        'entry_title': ParagraphStyle(
            'entry_title', fontName='Helvetica-Bold', fontSize=10,
            textColor=SLATE_900, leading=14),
        'entry_org': ParagraphStyle(
            'entry_org', fontName='Helvetica-Bold', fontSize=8.5,
            textColor=BLUE, leading=13),
        'entry_meta': ParagraphStyle(
            'entry_meta', fontName='Helvetica', fontSize=8,
            textColor=SLATE_500, leading=12),
        'entry_desc': ParagraphStyle(
            'entry_desc', fontName='Helvetica', fontSize=8.5,
            textColor=SLATE_700, leading=13, spaceAfter=3),
        'bullet_item': ParagraphStyle(
            'bullet_item', fontName='Helvetica', fontSize=8.5,
            textColor=SLATE_700, leading=13, leftIndent=10, spaceAfter=1),
        'project_title': ParagraphStyle(
            'project_title', fontName='Helvetica-Bold', fontSize=9.5,
            textColor=SLATE_900, leading=13),
        'image_caption': ParagraphStyle(
            'image_caption', fontName='Helvetica', fontSize=7,
            textColor=SLATE_500, leading=10, alignment=TA_CENTER),
        'footer': ParagraphStyle(
            'footer', fontName='Helvetica', fontSize=7.5,
            textColor=SLATE_500, alignment=TA_CENTER),
    }


# ════════════════════════════════════════════════════════════════
# Section builders
# ════════════════════════════════════════════════════════════════

def build_header(profile: dict, s: dict, public_dir: Path) -> list:
    """Hero header: blue block with profile photo + name/contact."""
    story = []

    # Resolve profile photo
    profile_img_path = resolve_image(profile.get('profileImage', ''), public_dir)
    print("PROFILE IMAGE =", profile.get('profileImage'))
    print("RESOLVED PATH =", profile_img_path)
    print("EXISTS =", profile_img_path.exists() if profile_img_path else False)


    avatar = CircleImage(profile_img_path, diameter=2.6 * cm,
                         fallback_initials=''.join(w[0] for w in profile.get('name','AF').split())[:2])

    # Contact line
    contacts = []
    if profile.get('email'):    contacts.append(f"✉  {profile['email']}")
    if profile.get('location'): contacts.append(f"📍 {profile['location']}")
    if profile.get('github'):   contacts.append(f"⌥  {profile['github']}")
    if profile.get('linkedin'): contacts.append(f"in  {profile['linkedin']}")
    contact_str = '   |   '.join(contacts)

    # Text column
    text_col = [
        Paragraph(profile.get('name', ''), s['title_name']),
        Spacer(1, 3),
        Paragraph(profile.get('title', ''), s['title_role']),
        Spacer(1, 5),
        Paragraph(profile.get('tagline', ''), s['title_tagline']),
        Spacer(1, 10),
        Paragraph(contact_str, s['contact_item']),
    ]

    PHOTO_COL_W = 3.2 * cm
    TEXT_COL_W  = CONTENT_W - PHOTO_COL_W - 0.4 * cm

    header_tbl = Table(
        [[text_col, avatar]],
        colWidths=[TEXT_COL_W, PHOTO_COL_W],
    )
    header_tbl.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (-1, -1), BLUE),
        ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN',         (1, 0), (1,  0),  'CENTER'),
        ('TOPPADDING',    (0, 0), (-1, -1), 20),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 20),
        ('LEFTPADDING',   (0, 0), (0,  0),  18),
        ('RIGHTPADDING',  (0, 0), (0,  0),  10),
        ('LEFTPADDING',   (1, 0), (1,  0),  0),
        ('RIGHTPADDING',  (1, 0), (1,  0),  14),
    ]))

    story.append(header_tbl)
    story.append(Spacer(1, 16))
    return story


def build_about(profile: dict, s: dict) -> list:
    story = []
    story.append(SectionHeader('About Me'))
    story.append(Spacer(1, 8))
    story.append(Paragraph(profile.get('about', profile.get('description', '')), s['normal']))
    if profile.get('focus'):
        story.append(Spacer(1, 5))
        focus_text = '  ·  '.join(profile['focus'])
        story.append(Paragraph(
            f'<font color="{BLUE.hexval()}"><b>Focus areas:</b></font>  {focus_text}',
            s['small']
        ))
    story.append(Spacer(1, 14))
    return story


def build_skills(skills: list, s: dict) -> list:
    story = []
    story.append(SectionHeader('Skills'))
    story.append(Spacer(1, 10))

    half_w = (CONTENT_W - 8) / 2

    def make_skill_card(category: dict):
        cfg_bg, cfg_fg = (BLUE, WHITE) if category.get('color') == 'blue' else (YELLOW, SLATE_900)
        header = Table(
            [[Paragraph(category['category'],
                        ParagraphStyle('sc', fontName='Helvetica-Bold', fontSize=9,
                                       textColor=cfg_fg, leading=13))]],
            colWidths=[half_w]
        )
        header.setStyle(TableStyle([
            ('BACKGROUND',    (0,0),(-1,-1), cfg_bg),
            ('TOPPADDING',    (0,0),(-1,-1), 7),
            ('BOTTOMPADDING', (0,0),(-1,-1), 7),
            ('LEFTPADDING',   (0,0),(-1,-1), 10),
            ('RIGHTPADDING',  (0,0),(-1,-1), 10),
        ]))
        skill_lines = [
            Paragraph(
                f'<font name="{"Helvetica-Bold" if i==0 else "Helvetica"}">{"★ " if i==0 else "· "}{sk}</font>',
                ParagraphStyle('sl', fontName='Helvetica', fontSize=8.5,
                               textColor=SLATE_700, leading=13)
            )
            for i, sk in enumerate(category.get('skills', []))
        ]
        body = Table([[sl] for sl in skill_lines], colWidths=[half_w])
        body.setStyle(TableStyle([
            ('BACKGROUND',    (0,0),(-1,-1), SLATE_100),
            ('TOPPADDING',    (0,0),(-1,-1), 4),
            ('BOTTOMPADDING', (0,0),(-1,-1), 4),
            ('LEFTPADDING',   (0,0),(-1,-1), 10),
            ('RIGHTPADDING',  (0,0),(-1,-1), 10),
            ('LINEBELOW',     (0,0),(-1,-2), 0.3, SLATE_300),
        ]))
        card = Table([[header],[body]], colWidths=[half_w])
        card.setStyle(TableStyle([
            ('BOX',           (0,0),(-1,-1), 0.5, SLATE_300),
            ('TOPPADDING',    (0,0),(-1,-1), 0),
            ('BOTTOMPADDING', (0,0),(-1,-1), 0),
            ('LEFTPADDING',   (0,0),(-1,-1), 0),
            ('RIGHTPADDING',  (0,0),(-1,-1), 0),
        ]))
        return card

    pairs = [skills[i:i+2] for i in range(0, len(skills), 2)]
    for pair in pairs:
        left  = make_skill_card(pair[0])
        right = make_skill_card(pair[1]) if len(pair) > 1 else Spacer(half_w, 1)
        row = Table([[left, right]], colWidths=[half_w, half_w], hAlign='LEFT')
        row.setStyle(TableStyle([
            ('LEFTPADDING',   (0,0),(-1,-1), 0),
            ('RIGHTPADDING',  (0,0),(-1,-1), 0),
            ('TOPPADDING',    (0,0),(-1,-1), 0),
            ('BOTTOMPADDING', (0,0),(-1,-1), 0),
            ('VALIGN',        (0,0),(-1,-1), 'TOP'),
        ]))
        story.append(row)
        story.append(Spacer(1, 7))

    story.append(Spacer(1, 8))
    return story


def build_experience(experience: list, s: dict, public_dir: Path) -> list:
    story = []
    story.append(SectionHeader('Experience'))
    story.append(Spacer(1, 10))

    order = ['work', 'education', 'achievement']
    grouped = {t: [e for e in experience if e.get('type') == t] for t in order}
    section_labels = {
        'work':        '💼  Work Experience',
        'education':   '🎓  Education',
        'achievement': '🏆  Honors & Achievements',
    }

    for typ in order:
        entries = grouped[typ]
        if not entries:
            continue

        bg, fg = TYPE_COLORS.get(typ, (SLATE_100, SLATE_900))
        label_tbl = Table(
            [[Paragraph(section_labels[typ],
                        ParagraphStyle('tl', fontName='Helvetica-Bold', fontSize=9,
                                       textColor=fg, leading=13))]],
            colWidths=[CONTENT_W]
        )
        label_tbl.setStyle(TableStyle([
            ('BACKGROUND',    (0,0),(-1,-1), bg),
            ('TOPPADDING',    (0,0),(-1,-1), 5),
            ('BOTTOMPADDING', (0,0),(-1,-1), 5),
            ('LEFTPADDING',   (0,0),(-1,-1), 10),
            ('RIGHTPADDING',  (0,0),(-1,-1), 10),
        ]))
        story.append(label_tbl)
        story.append(Spacer(1, 6))

        for entry in entries:
            block = []

            # ── Images (if any) ────────────────────────────────
            img_paths = [resolve_image(src, public_dir) for src in entry.get('images', [])]
            img_paths = [p for p in img_paths if p]   # drop missing

            if img_paths:
                # Up to 3 images side-by-side; taller if only 1
                n         = min(len(img_paths), 3)
                img_h     = 3.5 * cm if n == 1 else 2.8 * cm
                inner_w   = CONTENT_W - 20   # card padding
                strip     = image_strip(img_paths[:n], inner_w, img_h)
                if strip:
                    block.append(strip)
                    if len(img_paths) > 3:
                        block.append(Paragraph(
                            f'+ {len(img_paths) - 3} more image(s)',
                            s['image_caption']
                        ))
                    block.append(Spacer(1, 6))

            # ── Header row: title + period ─────────────────────
            period_style = ParagraphStyle('period', fontName='Helvetica', fontSize=8,
                                          textColor=SLATE_500, alignment=TA_RIGHT)
            header_row = Table(
                [[Paragraph(entry.get('title',''), s['entry_title']),
                  Paragraph(entry.get('period',''), period_style)]],
                                colWidths=[CONTENT_W * 0.76, CONTENT_W * 0.18]
            )
            header_row.setStyle(TableStyle([
                ('VALIGN',        (0,0),(-1,-1), 'MIDDLE'),
                ('LEFTPADDING',   (0,0),(-1,-1), 0),
                ('RIGHTPADDING',  (0,0),(-1,-1), 0),
                ('TOPPADDING',    (0,0),(-1,-1), 0),
                ('BOTTOMPADDING', (0,0),(-1,-1), 0),
            ]))
            block.append(header_row)

            # Org + location
            meta = f'{entry.get("organization","")}  ·  {entry.get("location","")}'
            block.append(Paragraph(meta, s['entry_org']))
            block.append(Spacer(1, 3))

            if entry.get('description'):
                block.append(Paragraph(entry['description'], s['entry_desc']))

            for hl in entry.get('highlights', []):
                block.append(Paragraph(f'• {hl}', s['bullet_item']))

            block.append(Spacer(1, 2))

            # Card with left accent
            card = Table([[block]], colWidths=[CONTENT_W - 8])
            card.setStyle(TableStyle([
                ('BACKGROUND',    (0,0),(-1,-1), WHITE),
                ('TOPPADDING',    (0,0),(-1,-1), 8),
                ('BOTTOMPADDING', (0,0),(-1,-1), 8),
                ('LEFTPADDING',   (0,0),(-1,-1), 10),
                ('RIGHTPADDING',  (0,0),(-1,-1), 8),
                ('BOX',           (0,0),(-1,-1), 0.4, SLATE_300),
                ('LINEBEFORE',    (0,0),(0,-1),  3,   bg),
            ]))
            story.append(KeepTogether(card))
            story.append(Spacer(1, 5))

        story.append(Spacer(1, 6))

    return story


def build_projects(projects: list, s: dict, public_dir: Path) -> list:
    story = []
    story.append(SectionHeader('Projects'))
    story.append(Spacer(1, 10))

    featured     = [p for p in projects if p.get('featured')]
    non_featured = [p for p in projects if not p.get('featured')]

    def project_card(proj: dict, width: float, is_featured: bool = False) -> Table:
        block = []
        inner_w = width - 20

        # ── Images ────────────────────────────────────────────
        img_paths = [resolve_image(src, public_dir) for src in proj.get('images', [])]
        img_paths = [p for p in img_paths if p]

        if img_paths:
            n     = min(len(img_paths), 3)
            # Featured: taller single image; grid: compact strip
            img_h = (5.0 * cm if n == 1 else 3.5 * cm) if is_featured else \
                    (3.5 * cm if n == 1 else 2.5 * cm)
            strip = image_strip(img_paths[:n], inner_w, img_h)
            if strip:
                block.append(strip)
                if len(img_paths) > 3:
                    block.append(Paragraph(
                        f'+ {len(img_paths) - 3} more',
                        s['image_caption']
                    ))
                block.append(Spacer(1, 6))

        # ── Title ──────────────────────────────────────────────
        title_text = proj.get('title', 'Untitled')
        if is_featured:
            title_text = f'<font color="{YELLOW.hexval()}">★</font>  {title_text}'
        block.append(Paragraph(title_text, s['project_title']))
        block.append(Spacer(1, 3))

        # Description
        block.append(Paragraph(proj.get('description', ''), s['entry_desc']))

        # Tags
        tags = proj.get('tags', [])
        if tags:
            tags_text = '  '.join([f'[{t}]' for t in tags])
            block.append(Paragraph(
                f'<font color="{BLUE.hexval()}" size="7.5">{tags_text}</font>',
                ParagraphStyle('tags', fontName='Helvetica', fontSize=7.5,
                               textColor=BLUE, leading=11, spaceAfter=3)
            ))

        # Links
        links = []
        if proj.get('github'): links.append(f'GitHub: {proj["github"]}')
        if proj.get('demo'):   links.append(f'Demo: {proj["demo"]}')
        if links:
            block.append(Paragraph(
                '  |  '.join(links),
                ParagraphStyle('links', fontName='Helvetica', fontSize=7.5,
                               textColor=SLATE_500, leading=11)
            ))

        # Card styling
        bg           = YELLOW_SOFT if is_featured else SLATE_100
        border_color = YELLOW      if is_featured else SLATE_300
        accent_color = YELLOW      if is_featured else BLUE

        card = Table([[block]], colWidths=[width - 2])
        card.setStyle(TableStyle([
            ('BACKGROUND',    (0,0),(-1,-1), bg),
            ('TOPPADDING',    (0,0),(-1,-1), 9),
            ('BOTTOMPADDING', (0,0),(-1,-1), 9),
            ('LEFTPADDING',   (0,0),(-1,-1), 10),
            ('RIGHTPADDING',  (0,0),(-1,-1), 10),
            ('BOX',           (0,0),(-1,-1), 0.6 if is_featured else 0.4, border_color),
            ('LINEBEFORE',    (0,0),(0,-1),  3, accent_color),
        ]))
        return card

    # ── Featured — full width ──────────────────────────────────
    if featured:
        story.append(Paragraph(
            '<font name="Helvetica-Bold" color="#FACC15">★</font>'
            '<font name="Helvetica-Bold">  Featured Projects</font>',
            ParagraphStyle('fh', fontName='Helvetica-Bold', fontSize=9,
                           textColor=SLATE_900, leading=14)
        ))
        story.append(Spacer(1, 5))
        for proj in featured:
            story.append(KeepTogether(project_card(proj, CONTENT_W, is_featured=True)))
            story.append(Spacer(1, 6))
        story.append(Spacer(1, 4))

    # ── Other projects — 2-column grid ────────────────────────
    if non_featured:
        story.append(Paragraph(
            '<font name="Helvetica-Bold">Other Projects</font>',
            ParagraphStyle('oh', fontName='Helvetica-Bold', fontSize=9,
                           textColor=SLATE_700, leading=14)
        ))
        story.append(Spacer(1, 5))
        col_w = (CONTENT_W - 8) / 2
        pairs = [non_featured[i:i+2] for i in range(0, len(non_featured), 2)]
        for pair in pairs:
            left  = project_card(pair[0], col_w)
            right = project_card(pair[1], col_w) if len(pair) > 1 else Spacer(col_w, 1)
            row = Table([[left, right]], colWidths=[col_w, col_w])
            row.setStyle(TableStyle([
                ('LEFTPADDING',   (0,0),(-1,-1), 0),
                ('RIGHTPADDING',  (0,0),(-1,-1), 0),
                ('TOPPADDING',    (0,0),(-1,-1), 0),
                ('BOTTOMPADDING', (0,0),(-1,-1), 0),
                ('VALIGN',        (0,0),(-1,-1), 'TOP'),
            ]))
            story.append(row)
            story.append(Spacer(1, 6))

    return story


def build_footer(profile: dict, s: dict) -> list:
    story = []
    story.append(HRFlowable(width=CONTENT_W, thickness=0.5, color=SLATE_300))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        f'{profile.get("name","")}  ·  {profile.get("email","")}  ·  {profile.get("github","")}',
        s['footer']
    ))
    return story


# ════════════════════════════════════════════════════════════════
# Page decorator
# ════════════════════════════════════════════════════════════════

def make_page_decorator(profile: dict):
    name = profile.get('name', '')
    def decorate(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(BLUE)
        canvas.rect(MARGIN, PAGE_H - 10 * mm, CONTENT_W, 3, stroke=0, fill=1)
        canvas.setFont('Helvetica', 7.5)
        canvas.setFillColor(SLATE_500)
        canvas.drawCentredString(PAGE_W / 2, 8 * mm, f'{name}  ·  Page {doc.page}')
        canvas.restoreState()
    return decorate


# ════════════════════════════════════════════════════════════════
# Main
# ════════════════════════════════════════════════════════════════

def load_json(path: Path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def generate(data_dir: str, public_dir: str, output_path: str):
    data_dir   = Path(data_dir)
    public_dir = Path(public_dir)
    output_dir = Path(public_dir) 

    print(f"  Data dir:   {data_dir}")
    print(f"  Public dir: {public_dir}")

    profile    = load_json(data_dir / 'profile.json')
    projects   = load_json(data_dir / 'projects.json')
    skills     = load_json(data_dir / 'skills.json')
    experience = load_json(data_dir / 'experience.json')

    print(f"  ✓ profile    — {profile.get('name')}")
    print(f"  ✓ projects   — {len(projects)} items")
    print(f"  ✓ skills     — {len(skills)} categories")
    print(f"  ✓ experience — {len(experience)} items")

    # Count how many image files actually exist
    all_img_srcs = (
        [profile.get('profileImage', '')] +
        [src for p in projects   for src in p.get('images', [])] +
        [src for e in experience for src in e.get('images', [])]
    )
    found = sum(1 for s in all_img_srcs if s and resolve_image(s, public_dir))
    print(f"  ✓ images     — {found}/{len(all_img_srcs)} files found")

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=1.5 * cm, bottomMargin=1.8 * cm,
        title=f"{profile.get('name', '')} — Portfolio",
        author=profile.get('name', ''),
        subject=profile.get('title', ''),
        creator='generate_pdf.py',
    )

    s         = make_styles()
    decorator = make_page_decorator(profile)

    story = []
    story += build_header(profile, s, public_dir)
    story += build_about(profile, s)
    story += build_skills(skills, s)
    story.append(PageBreak())
    story += build_projects(projects, s, public_dir)
    story.append(PageBreak())
    story += build_experience(experience, s, public_dir)
    story += build_footer(profile, s)

    doc.build(story, onFirstPage=decorator, onLaterPages=decorator)

    size_kb = os.path.getsize(output_path) / 1024
    # move file to public dir
    if output_path != output_dir / "portfolio.pdf":
        os.replace(output_path, output_dir / "portfolio.pdf")
    print(f"  ✅ PDF saved to → {output_dir / 'portfolio.pdf'}")
    # print(f"\n  ✅ PDF saved → {output_path}  ({size_kb:.1f} KB)")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Generate a portfolio PDF with images from JSON data files.'
    )
    parser.add_argument('--data-dir',   '-d', default='./src/data',
        help='Folder with profile/projects/skills/experience JSON (default: ./src/data)')
    parser.add_argument('--public-dir', '-p', default='./public',
        help='Vite public folder where images live (default: ./public)')
    parser.add_argument('--output',     '-o', default='portfolio.pdf',
        help='Output PDF path (default: portfolio.pdf)')
    args = parser.parse_args()

    print('\n📄 Portfolio PDF Generator')
    print('─' * 40)
    generate(args.data_dir, args.public_dir, args.output)
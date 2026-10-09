"""Trace the supplied LWS artwork; build reproducible vector and app icon assets.

Requires Pillow, vtracer and resvg-py. No generative redrawing or external fonts.
"""
from pathlib import Path
from io import BytesIO
import tempfile
import xml.etree.ElementTree as ET

from PIL import Image, ImageDraw
import resvg_py
import vtracer

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/assets/lws-logo.jpg"
BRAND = ROOT / "public/brand"
MASTERS = ROOT / "brand/identity-v1"
BRAND.mkdir(parents=True, exist_ok=True)
MASTERS.mkdir(parents=True, exist_ok=True)

# The supplied logo's intentional artwork lies within this central rectangle.
# Exclude JPEG paper dust around it; keep the face, bolt, heart and ink drips.
logo = Image.open(SOURCE).convert("L").crop((126, 167, 516, 531))
logo = logo.point(lambda value: 0 if value < 155 else 255).convert("RGB")
with tempfile.TemporaryDirectory(prefix="aura-logo-") as directory:
    bitmap = Path(directory) / "trace.png"
    traced = Path(directory) / "trace.svg"
    logo.save(bitmap)
    vtracer.convert_image_to_svg_py(
        str(bitmap), str(traced), colormode="binary", mode="spline",
        filter_speckle=9, corner_threshold=60, length_threshold=3.5,
        splice_threshold=45, path_precision=2,
    )
    tree = ET.fromstring(traced.read_text())

paths = []
for node in tree.iter():
    if node.tag.endswith("path"):
        attributes = {key: value for key, value in node.attrib.items() if key != "fill"}
        attributes["fill"] = "currentColor"
        paths.append("<path " + " ".join(f'{key}="{value}"' for key, value in attributes.items()) + "/>")
artwork = "".join(paths)
if not paths:
    raise RuntimeError("Logo trace did not produce vector paths")

def svg(width=1024, height=1024, rounded=True, transparent=False, maskable=False, color="#ffffff"):
    target_width = 640 if maskable else (760 if width == height else 590)
    scale = target_width / 390
    x = (width - 390 * scale) / 2
    y = (height - 364 * scale) / 2
    background = "" if transparent else f'<rect width="{width}" height="{height}" rx="{176 if rounded else 0}" fill="#080808"/>'
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="Aura by LWS — фирменный знак LWS">'
        + background + f'<g color="{color}" transform="translate({x:.3f} {y:.3f}) scale({scale:.6f})">' + artwork + "</g></svg>"
    )

def render(markup, size=None):
    return resvg_py.svg_to_bytes(svg_string=markup, width=size, height=size)

master = svg()
symbol = svg(transparent=True)
(MASTERS / "aura-lws-master.svg").write_text(master)
(MASTERS / "aura-lws-symbol.svg").write_text(symbol)
(MASTERS / "aura-lws-symbol-dark.svg").write_text(svg(transparent=True, color="#080808"))
(MASTERS / "aura-lws-master-1024.png").write_bytes(render(master))
(MASTERS / "aura-lws-transparent-1024.png").write_bytes(render(symbol))
(BRAND / "aura-lws-icon.svg").write_text(master)
(ROOT / "public/favicon.svg").write_text(master)

for size in (16, 32, 48, 64, 128, 180, 192, 256, 512, 1024):
    (BRAND / f"icon-{size}.png").write_bytes(render(master, size))
for size in (192, 512):
    (BRAND / f"icon-maskable-{size}.png").write_bytes(render(svg(rounded=False, maskable=True), size))
Image.open(BytesIO(render(master))).save(ROOT / "public/favicon.ico", sizes=[(16,16), (32,32), (48,48), (64,64)])
(ROOT / "public/apple-touch-icon.png").write_bytes(render(svg(rounded=False), 180))
preview = svg(1200, 630, rounded=False)
(MASTERS / "aura-lws-preview.svg").write_text(preview)
(BRAND / "preview.png").write_bytes(render(preview))

# Review at actual small sizes on light/dark surfaces, plus an enlarged master.
proof = Image.new("RGB", (1200, 780), "#eceae6")
draw = ImageDraw.Draw(proof)
draw.rectangle((600, 0, 1200, 780), fill="#191919")
for column in (0, 600):
    large = Image.open(BytesIO(render(master, 400))).convert("RGBA")
    proof.paste(large, (column + 100, 55), large)
    for size, x in [(16, 80), (32, 150), (48, 245), (64, 355), (128, 455)]:
        small = Image.open(BytesIO(render(master, size))).convert("RGBA")
        proof.paste(small, (column + x, 535), small)
        draw.text((column + x, 685), f"{size} px", fill="#fff" if column else "#111")
proof.save(MASTERS / "aura-lws-proof.png")
print(f"Built {len(paths)} traced logo paths and icon assets in {BRAND}")

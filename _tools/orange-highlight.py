#!/usr/bin/env python3
"""Fill parts of a plain CAD line render with Focal orange, keeping the line work.

Used for the guide diagrams in assets/diagrams/ (e.g. the set screws in the
rail-installation steps). Needs Pillow and numpy.

    _tools/orange-highlight.py IN.png OUT.png PART [PART ...] [--crop WxH+X+Y]

Each PART is one of:
    x,y                 flood-fill from a point inside the part, stopping at
                        the drawn outline. Best when the outline is closed;
                        give several points if inner lines split the face.
    hull:x0,y0,x1,y1    fill the convex hull of the line work inside this box.
                        Best for round parts (screw heads, holes) at any tilt,
                        and it doesn't care about gaps in inner rings. Keep
                        other parts' lines out of the box.
    ell:cx,cy,rx,ry     fill an upright ellipse. Last resort, for a head
                        facing the camera whose outline is too faint for hull.

The script refuses a point that lands on a line, and a flood fill that leaks
out through a gap; switch that part to hull: when it does.

Coordinates are in the full-size input image. Finding the point: crop and
zoom the render around the part with a pixel grid, and pick a spot inside the
face that isn't on a line. Always check the result zoomed in: orange should
reach the outline and never spill past it.
"""
import argparse

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ORANGE = np.array([255, 122, 0])  # --focal in assets/style.css
LINE = 170  # pixels darker than this are line work and stop the flood fill


def hull(pts):
    pts = sorted(set(map(tuple, pts)))
    def half(ps):
        h = []
        for p in ps:
            while len(h) >= 2 and (h[-1][0] - h[-2][0]) * (p[1] - h[-2][1]) - (h[-1][1] - h[-2][1]) * (p[0] - h[-2][0]) <= 0:
                h.pop()
            h.append(p)
        return h
    return half(pts)[:-1] + half(pts[::-1])[:-1]


def part_mask(gray, spec):
    h, w = gray.shape
    kind, _, nums = spec.rpartition(":")
    v = [int(n) for n in nums.split(",")]
    m = Image.new("L", (w, h), 0)
    if kind == "ell":
        cx, cy, rx, ry = v
        ImageDraw.Draw(m).ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=255)
        return np.asarray(m)
    if kind == "hull":
        x0, y0, x1, y1 = v
        ys, xs = np.nonzero(gray[y0:y1, x0:x1] < 130)
        ImageDraw.Draw(m).polygon([(x + x0, y + y0) for x, y in hull(np.c_[xs, ys])], fill=255)
        return np.asarray(m)
    x, y = v
    walls = Image.fromarray(np.where(gray < LINE, 0, 255).astype("uint8"))
    if walls.getpixel((x, y)) == 0:
        raise SystemExit(f"point {x},{y} is on a line; pick a spot inside the face")
    ImageDraw.floodfill(walls, (x, y), 128, thresh=0)
    filled = np.where(np.asarray(walls) == 128, 255, 0).astype("uint8")
    if filled.mean() > 255 * 0.05:
        raise SystemExit(f"fill from {x},{y} leaked (outline has a gap); use hull: for this part")
    # grow over the antialiased edge so the orange meets the outline
    return np.asarray(Image.fromarray(filled).filter(ImageFilter.MaxFilter(5)))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("parts", nargs="+")
    ap.add_argument("--crop", help="ImageMagick-style WxH+X+Y, applied after filling")
    a = ap.parse_args()

    gray = np.asarray(Image.open(a.src).convert("L")).astype(float)
    mask = np.zeros(gray.shape, "uint8")
    for p in a.parts:
        mask = np.maximum(mask, part_mask(gray, p))
    m = np.asarray(Image.fromarray(mask).filter(ImageFilter.GaussianBlur(0.6))).astype(float)[..., None] / 255

    g = np.repeat(gray[..., None], 3, 2)
    out = g * (1 - m) + ORANGE * (g / 255) * m  # white -> orange, lines stay dark
    img = Image.fromarray(out.clip(0, 255).astype("uint8"))
    if a.crop:
        size, x, y = a.crop.split("+")
        cw, ch = map(int, size.split("x"))
        img = img.crop((int(x), int(y), int(x) + cw, int(y) + ch))
    img.save(a.out, optimize=True)


if __name__ == "__main__":
    main()

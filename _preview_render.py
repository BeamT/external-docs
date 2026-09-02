#!/usr/bin/env python3
"""Faithful-enough emulation of what GitHub Pages Jekyll does with this repo,
so we can preview the output locally. Handles: frontmatter, the {% include %}
tags used by these guides, kramdown-style markdown, and the two layouts."""
import re, os, glob, sys, html
from urllib.parse import quote

ROOT = os.path.dirname(os.path.abspath(__file__))
try:
    import markdown as mdlib
    def md(s): return mdlib.markdown(s, extensions=["tables"])
except Exception:
    md = None

BASEURL = ""  # matches _config.yml default (root preview)

def parse_frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n?(.*)$", text, re.S)
    if not m:
        return {}, text
    fm_raw, body = m.group(1), m.group(2)
    fm = {}
    for line in fm_raw.split("\n"):
        mm = re.match(r"^(\w+):\s*(.*)$", line)
        if not mm:
            continue
        k, v = mm.group(1), mm.group(2).strip()
        if v.startswith("[") and v.endswith("]"):
            fm[k] = [x.strip() for x in v[1:-1].split(",") if x.strip()]
        else:
            fm[k] = v.strip('"')
    return fm, body

def parse_include_args(argstr):
    # matches key="value" pairs, allowing escaped quotes inside
    args = {}
    for m in re.finditer(r'(\w+)="((?:[^"\\]|\\.)*)"', argstr):
        args[m.group(1)] = m.group(2).replace('\\"', '"')
    return args

def render_include(name, args):
    tpl = open(os.path.join(ROOT, "_includes", name)).read()
    if name == "dodont.html":
        return f'''<div class="dodont">
  <div class="dd do"><span class="tag"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>Do</span><p>{html.escape(args.get("do",""))}</p></div>
  <div class="dd dont"><span class="tag"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>Don&#39;t</span><p>{html.escape(args.get("dont",""))}</p></div>
</div>'''
    if name == "warn.html":
        return f'''<div class="warn"><svg class="ico" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 16H3l9-16z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 9v5M12 17v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><p>{html.escape(args.get("text",""))}</p></div>'''
    if name == "step.html":
        fig = ""
        if args.get("diagram"):
            src = f"{BASEURL}/assets/diagrams/{args['diagram']}"
            fig = f'<div class="step-figure"><img src="{src}" alt="" onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{{className:\'diagram-missing\',textContent:\'Diagram coming soon\'}}))"></div>'
        return f'''<div class="step"><div class="step-num">{html.escape(args.get("number",""))}</div><div class="step-body"><div class="step-title">{html.escape(args.get("title",""))}</div><p>{html.escape(args.get("body",""))}</p></div>{fig}</div>'''
    if name == "diagram.html":
        src = f"{BASEURL}/assets/diagrams/{args.get('src','')}"
        cap = f'<figcaption>{html.escape(args["caption"])}</figcaption>' if args.get("caption") else ""
        return f'<figure class="diagram"><img src="{src}" alt="" onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{{className:\'diagram-missing\',textContent:\'Diagram coming soon\'}}))">{cap}</figure>'
    if name == "steplink.html":
        return f'<a class="step step-link" href="/{args.get("slug","")}/"><div class="step-num">{html.escape(args.get("number",""))}</div><div class="step-body"><div class="step-title">{html.escape(args.get("title",""))} <span class="step-arrow">&#8594;</span></div><p>{html.escape(args.get("body",""))}</p></div></a>'
    if name == "stepitem.html":
        return f'<span class="step-item"><span class="step-num">{html.escape(args.get("number",""))}</span><span class="step-body"><span class="step-title">{html.escape(args.get("title",""))}</span><span class="step-desc">{html.escape(args.get("body",""))}</span></span></span>'
    if name == "nextlink.html":
        label = html.escape(args.get("label", "Next"))
        return f'<a class="next-link no-print" href="/{args.get("slug","")}/"><span class="next-label">{label}</span><span class="next-title">{html.escape(args.get("title",""))}</span><span class="next-arrow">&#8594;</span></a>'
    if name == "printlink.html":
        return f'<a class="print-link" href="{args.get("url","")}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9V4h12v5M6 18H4v-6a2 2 0 012-2h12a2 2 0 012 2v6h-2M8 14h8v6H8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>{html.escape(args.get("label",""))}</a>'
    if name == "checklist.html":
        items = [i.strip() for i in args.get("items", "").split("|") if i.strip()]
        lis = "".join(f"<li>{html.escape(i)}</li>" for i in items)
        return f'<ul class="checklist">{lis}</ul>'
    if name == "contact.html":
        if args.get("style") == "compact":
            return ('Questions: <a href="mailto:support@focalheat.co">support@focalheat.co</a>'
                    ' &middot; <a href="tel:+14153230091">415-323-0091</a>')
        return ('<div class="contact"><p class="contact-name">Focal</p>'
                '<p>375 Alabama St Suite 220<br>San Francisco, CA 94110</p>'
                '<p>Phone: <a href="tel:+14153230091">415-323-0091</a>'
                '<br>Email: <a href="mailto:support@focalheat.co">support@focalheat.co</a>'
                '<br>Web: <a href="https://www.focalheat.co">www.focalheat.co</a></p></div>')
    if name == "service.html":
        txt = ("The heater has no user-serviceable parts. All service beyond basic "
               "cleaning must be done by Focal-authorized personnel.")
        if args.get("style") == "warn":
            return render_include("warn.html", {"text": txt})
        return f"<p>{txt}</p>"
    if name == "serial.html":
        return ("<p>The serial number is printed on the top of each heater, where it "
                "mounts to the rail. It also appears on the Heater Control page when "
                "you tap a slot.</p>")
    if name == "video.html":
        vid = f"{BASEURL}/assets/video/{args.get('src','')}"
        vid_id = args.get("id", "video")
        poster = f' poster="{BASEURL}/assets/video/{args["poster"]}"' if args.get("poster") else ""
        track = (f'<track kind="captions" src="{BASEURL}/assets/video/{args["captions"]}"'
                 ' srclang="en" label="English" default>') if args.get("captions") else ""
        cap = f'<figcaption>{html.escape(args["caption"])}</figcaption>' if args.get("caption") else ""
        qr = f'<img src="{BASEURL}/assets/video/{args["qr"]}" alt="">' if args.get("qr") else ""
        return (f'<figure class="video" id="{vid_id}">'
                f'<video controls preload="none" playsinline{poster}>'
                f'<source src="{vid}" type="video/mp4">{track}'
                f'<a href="{vid}">Download the video</a></video>{cap}'
                f'<div class="video-print">{qr}<span>Watch this step at '
                f'{vid_id}</span></div></figure>')
    # Fall through to the raw template rather than dropping the include silently.
    # Static includes such as railtable.html render correctly this way, and any
    # future include with Liquid in it will show up visibly broken instead of
    # disappearing without a trace.
    return tpl

def expand_includes(body):
    def repl(m):
        return render_include(m.group(1), parse_include_args(m.group(2)))
    return re.sub(r"\{%\s*include\s+([\w.]+)\s+(.*?)%\}", repl, body, flags=re.S)


import re as _re
def slugify(t):
    t=_re.sub(r"<[^>]+>","",t).strip().lower()
    t=_re.sub(r"[^a-z0-9 -]","",t)
    t=_re.sub(r"\s+","-",t)
    return t
def add_anchors(html):
    def h(m):
        lvl,txt=m.group(1),m.group(2)
        return f'<h{lvl} id="{slugify(txt)}">{txt}</h{lvl}>'
    return _re.sub(r"<h([23])>(.*?)</h\1>", h, html)

def render_markdown_preserving_html(body):
    # Split into include-generated HTML blocks vs markdown; render markdown only.
    if md is None:
        return "<pre>(python-markdown not installed; run pip install markdown)</pre>"
    return add_anchors(md(body))

FEEDBACK_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSeRpO6MOve96TcSFl6TOZL383j3cJ6oyqnPy2VG5joxngoFhg/viewform?usp=pp_url"

def apply_guide_layout(fm, content_html):
    badges = "".join(
        f'<span class="badge">{"Restaurant" if a == "customer" else a.capitalize()}</span>'
        for a in fm.get("audience", [])
    )
    fb = (f'{FEEDBACK_FORM}&amp;entry.262754240={quote(fm.get("title",""))}'
          f'&amp;entry.130157017={quote("/" + fm.get("_slug","") + "/")}')
    return f'''<article class="doc">
  <a href="{BASEURL}/" class="crumb"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>All guides</a>
  <div class="doc-head"><h1>{html.escape(fm.get("title",""))}</h1>
  <div class="doc-meta">{badges}<span>v{fm.get("version","")}</span><span>Updated {fm.get("updated","")}</span></div>
  <p class="print-only-url">https://support.focalheat.co/{fm.get("_slug","")}/</p></div>
  <div class="doc-body">{content_html}</div>
  <div class="doc-footer no-print"><p class="feedback">Something wrong, unclear or missing on this page? <a href="{fb}" target="_blank" rel="noopener">Provide feedback</a></p><button class="print-btn" onclick="window.print()">Print or save as PDF</button></div>
</article>'''

def page_shell(title, inner, is_home=False):
    search = ""
    if is_home:
        search = '<div class="searchbox"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><input type="search" id="search" placeholder="Search the guides…"></div>'
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{html.escape(title)} · Focal Docs</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{BASEURL}/assets/style.css"></head><body>
<header class="topbar"><div class="topbar-inner"><a href="{BASEURL}/" class="brand">Focal<span class="dot">.</span></a>{search}</div></header>
<main class="wrap">{inner}</main></body></html>'''


def build_packet(out, guides_data):
    import base64, os
    # installer guides sorted by installer order, excluding start-here
    ig=[g for g in guides_data if 'installer' in g.get('audience',[]) and g['_slug']!='start-here']
    ig.sort(key=lambda g:int(g.get('_iorder',999)))
    css=open(os.path.join(ROOT,"assets","style.css")).read()
    qr_path=os.path.join(ROOT,"assets","diagrams","qr-installer.svg")
    qr_data="data:image/svg+xml;base64,"+base64.b64encode(open(qr_path,'rb').read()).decode() if os.path.exists(qr_path) else ""
    cover=f'''<section class="packet-cover"><div class="cover-brand">Focal<span class="dot">.</span></div>
    <h1>Installer Packet</h1><p class="cover-sub">Everything you need to install Focal heaters, in order.</p>
    <div class="cover-qr"><img src="{qr_data}" width="150" height="150"><div class="cover-qr-text"><strong>Scan for the live guides</strong><span>Always current, with search and full-size diagrams. Opens to the installer sequence.</span></div></div>
    <ol class="cover-seq"><li><strong>Safety &amp; Clearances</strong></li><li><strong>Rail Installation</strong></li><li><strong>Network Setup</strong></li><li><strong>Install the Heaters</strong></li><li><strong>Register &amp; Assign Heaters</strong></li></ol>
    <p class="cover-foot">Questions: support@focalheat.co · 415-323-0091</p></section>'''
    body=cover
    for g in ig:
        body+=f'<section class="packet-guide"><div class="packet-guide-head"><h1>{g["title"]}</h1><span class="packet-ver">v{g.get("version","")} · {g.get("updated","")}</span></div>{g["_html"]}</section>'
    html=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body><div class="packet">{body}</div></body></html>'
    os.makedirs(os.path.join(out,"print","installer"),exist_ok=True)
    open(os.path.join(out,"print","installer","index.html"),"w").write(html)

def build():
    out = os.path.join(ROOT, "_preview")
    os.makedirs(out, exist_ok=True)
    os.makedirs(os.path.join(out, "assets", "diagrams"), exist_ok=True)
    # copy assets
    import shutil
    shutil.copy(os.path.join(ROOT, "assets", "style.css"), os.path.join(out, "assets", "style.css"))
    for f in glob.glob(os.path.join(ROOT, "assets", "diagrams", "*")):
        shutil.copy(f, os.path.join(out, "assets", "diagrams", os.path.basename(f)))

    guides = []
    for path in glob.glob(os.path.join(ROOT, "_guides", "*.md")):
        fm, body = parse_frontmatter(open(path).read())
        fm["_slug"] = os.path.splitext(os.path.basename(path))[0]
        expanded = expand_includes(body)
        content_html = render_markdown_preserving_html(expanded)
        fm["_html"] = content_html
        m_io = re.search(r'installer:\s*(\d+)', open(path).read())
        fm["_iorder"] = m_io.group(1) if m_io else "999"
        inner = apply_guide_layout(fm, content_html)
        gdir = os.path.join(out, fm["_slug"])
        os.makedirs(gdir, exist_ok=True)
        open(os.path.join(gdir, "index.html"), "w").write(page_shell(fm.get("title",""), inner))
        guides.append(fm)

    build_packet(out, guides)

    guides.sort(key=lambda g: int(g.get("order", "99")))
    cards = ""
    for g in guides:
        badges = "".join(f'<span class="badge">{a.capitalize()}</span>' for a in g.get("audience", []))
        cards += f'''<a class="card" href="{BASEURL}/{g["_slug"]}/" data-audience="{','.join(g.get("audience",[]))}" data-title="{html.escape(g.get("title","").lower())}" data-summary="{html.escape(g.get("summary","").lower())}"><h2>{html.escape(g.get("title",""))}</h2><p>{html.escape(g.get("summary",""))}</p><div class="badges">{badges}</div></a>'''
    home_inner = open(os.path.join(ROOT, "index.html")).read()
    home_inner = re.split(r"^---.*?---\s*", home_inner, maxsplit=1, flags=re.S)[-1]
    # strip the liquid card loop, inject rendered cards
    home_inner = re.sub(r'<div class="card-list" id="card-list">.*?</div>\s*<p class="empty"',
                        f'<div class="card-list" id="card-list">{cards}</div>\n<p class="empty"', home_inner, flags=re.S)
    open(os.path.join(out, "index.html"), "w").write(page_shell("Focal Duo guides", home_inner, is_home=True))
    print("Preview built to", out)
    print("Guides:", ", ".join(g["_slug"] for g in guides))

if __name__ == "__main__":
    build()

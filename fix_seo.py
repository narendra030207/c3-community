import sys

with open("index.html", "r") as f:
    content = f.read()

target = '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">'

seo_tags = """<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    
    <!-- SEO Optimization -->
    <title>Creative Coding Community | GEC Samastipur</title>
    <meta name="description" content="Creative Coding Community (C3) at GEC Samastipur — A coding club for hackathons, bootcamps, coding events, and collaborative learning.">
    <meta name="keywords" content="Creative Coding Community, C3, GEC Samastipur, coding club, hackathon, bootcamp">
    <meta name="author" content="Creative Coding Community">
    <meta name="robots" content="index, follow">

    <!-- Open Graph (Facebook/LinkedIn) -->
    <meta property="og:title" content="Creative Coding Community | GEC Samastipur">
    <meta property="og:description" content="Join Creative Coding Community (C3) — Hackathons, bootcamps, coding events, and innovation at GEC Samastipur.">
    <meta property="og:image" content="https://c3-community.vercel.app/icon-512.png">
    <meta property="og:url" content="https://c3-community.vercel.app/">
    <meta property="og:type" content="website">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Creative Coding Community | GEC Samastipur">
    <meta name="twitter:description" content="Join Creative Coding Community (C3) — Hackathons, bootcamps, coding events, and innovation at GEC Samastipur.">
    <meta name="twitter:image" content="https://c3-community.vercel.app/icon-512.png">
"""

if target in content:
    content = content.replace(target, seo_tags)
    with open("index.html", "w") as f:
        f.write(content)
    print("SEO tags added!")
else:
    print("Could not find the target string")

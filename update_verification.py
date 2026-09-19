import sys

with open("index.html", "r") as f:
    content = f.read()

# Replace any existing google-site-verification and add msvalidate
old_seo_block = """    <!-- SEO Optimization -->
    <title>Creative Coding Community | GEC Samastipur</title>"""
    
new_seo_block = """    <!-- SEO Optimization -->
    <title>Creative Coding Community | GEC Samastipur</title>
    <meta name="msvalidate.01" content="447F7D8B723C7108795431C5F2D97119">
    <meta name="google-site-verification" content="A17DFdY8amH0Jv-nYcvcV2yzD_tFoP65Fv2LGPReovk">"""

if old_seo_block in content:
    content = content.replace(old_seo_block, new_seo_block)
    
    # Remove the random one if it exists
    content = content.replace('<meta name="google-site-verification" content="owLXGN2Pl97M6kJiplT9w6yQjo7akYBIEj5kl11vZtQ" />\n    ', '')
    
    with open("index.html", "w") as f:
        f.write(content)
    print("Verification tags updated!")
else:
    print("Could not find SEO block")

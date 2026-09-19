import sys

with open("src/main.rs", "r") as f:
    content = f.read()

old_str = """                                svg { class: "w-5 h-5", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "viewBox": "0 0 24 24", path { d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1v-1.586a2 2 0 0 0-.586-1.414l-8-8a2 2 0 0 0-2.828 0l-2 2a2 2 0 0 0 0 2.828l8 8Z" }, circle { cx: "16.5", cy: "7.5", r: "4.5" }, path { d: "m14 10 1-1" } }
                                "Use Passkey\""""

new_str = """                                svg { class: "w-5 h-5", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "viewBox": "0 0 24 24", path { d: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" } }
                                "Login with Passkey\""""

if old_str in content:
    content = content.replace(old_str, new_str)
    with open("src/main.rs", "w") as f:
        f.write(content)
    print("Passkey SVG updated!")
else:
    print("Could not find the passkey string")

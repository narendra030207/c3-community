import sys

with open("src/main.rs", "r") as f:
    content = f.read()

# Replace the login icon color
old_login = 'rounded-full text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-container-high)] cursor-pointer transition-colors",\n                        svg { class: "w-6 h-6", fill: "none", stroke: "currentColor"'
new_login = 'rounded-full text-[var(--text-main)] hover:bg-[var(--md-sys-color-surface-container-high)] cursor-pointer transition-colors",\n                        svg { class: "w-6 h-6", fill: "none", stroke: "currentColor"'

# Replace the hamburger icon color
old_hamburger = 'rounded-full text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-container-high)] cursor-pointer transition-colors",\n                        onclick: move |_| is_mobile_menu_open.set(true),'
new_hamburger = 'rounded-full text-[var(--text-main)] hover:bg-[var(--md-sys-color-surface-container-high)] cursor-pointer transition-colors",\n                        onclick: move |_| is_mobile_menu_open.set(true),'

if old_login in content and old_hamburger in content:
    content = content.replace(old_login, new_login)
    content = content.replace(old_hamburger, new_hamburger)
    with open("src/main.rs", "w") as f:
        f.write(content)
    print("Icon colors updated!")
else:
    print("Could not find the target strings")

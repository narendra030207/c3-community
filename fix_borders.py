import sys

with open("src/main.rs", "r") as f:
    content = f.read()

old_footer = 'footer { class: "bg-[var(--bg-surface)] border-t border-[var(--border-color)] text-[var(--text-muted)] py-16 transition-colors duration-300",'
new_footer = 'footer { class: "bg-[var(--bg-surface)] text-[var(--text-muted)] py-16 transition-colors duration-300",'

old_logic = 'div { class: "relative max-w-7xl mx-auto px-4 py-32 border-t border-[var(--border-glass)]",'
new_logic = 'div { class: "relative max-w-7xl mx-auto px-4 py-32",'

if old_footer in content and old_logic in content:
    content = content.replace(old_footer, new_footer)
    content = content.replace(old_logic, new_logic)
    with open("src/main.rs", "w") as f:
        f.write(content)
    print("Borders removed!")
else:
    print("Could not find the target strings")

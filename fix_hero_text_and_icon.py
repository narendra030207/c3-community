import sys

with open("src/main.rs", "r") as f:
    content = f.read()

# 1. Update h1 font size and wrapping
old_h1 = 'h1 { class: "text-[9vw] sm:text-[8vw] md:text-8xl lg:text-9xl font-extrabold mb-8 tracking-tighter text-[var(--text-main)] leading-[0.9] w-full break-words",'
new_h1 = 'h1 { class: "text-[8vw] sm:text-[7.5vw] md:text-8xl lg:text-9xl font-extrabold mb-8 tracking-tighter text-[var(--text-main)] leading-[0.9] w-full whitespace-nowrap",'

# 2. Update {{ }} visibility
old_icon = 'div { class: "text-[15rem] font-black opacity-10 text-[var(--accent)] -translate-y-4",'
new_icon = 'div { class: "text-[15rem] font-black opacity-60 text-[var(--text-main)] -translate-y-4 drop-shadow-xl",'

if old_h1 in content and old_icon in content:
    content = content.replace(old_h1, new_h1)
    content = content.replace(old_icon, new_icon)
    with open("src/main.rs", "w") as f:
        f.write(content)
    print("Updates applied!")
else:
    print("Could not find the target strings")

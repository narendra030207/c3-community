use dioxus::prelude::*;

#[derive(Debug, Clone, Routable, PartialEq)]
#[rustfmt::skip]
enum Route {
    #[layout(Navbar)]
    #[route("/")]
    Home {},
    #[route("/team")]
    Team {},
    #[route("/events")]
    Events {},
    #[route("/resources")]
    Resources {},
    #[route("/about")]
    About {},
}

const FAVICON_SVG: Asset = asset!("/assets/favicon.svg");
const ICON_192: Asset = asset!("/assets/icon-192.png");
const ICON_512: Asset = asset!("/assets/icon-512.png");
const MANIFEST: Asset = asset!("/assets/manifest.json");
const MAIN_CSS: Asset = asset!("/assets/main.css");
const PWA_JS: Asset = asset!("/assets/pwa.js");

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    rsx! {
        document::Link { rel: "icon", r#type: "image/svg+xml", href: FAVICON_SVG }
        document::Link { rel: "apple-touch-icon", href: ICON_192 }
        document::Link { rel: "manifest", href: MANIFEST }
        document::Link { rel: "stylesheet", href: MAIN_CSS }
        document::Script { src: "https://unpkg.com/@tailwindcss/browser@4" }
        document::Script { src: PWA_JS }

        Router::<Route> {}
    }
}

#[component]
fn Navbar() -> Element {
    rsx! {
        nav { class: "bg-[var(--bg-base)] text-[var(--text-main)] p-4 border-b border-[var(--border-color)] sticky top-0 z-50 transition-colors duration-300",
            div { class: "max-w-7xl mx-auto flex justify-between items-center",
                div { class: "flex items-center space-x-2",
                    Link { to: Route::Home {}, class: "text-2xl font-bold tracking-tight text-[var(--text-main)] cursor-pointer rounded-xl px-2 py-1", "Creative Coding Community" }
                }
                div { class: "hidden md:flex space-x-6 text-sm font-medium text-[var(--text-muted)]",
                    Link { to: Route::Home {}, class: "px-4 py-2 rounded-full hover:bg-[var(--md-sys-color-surface-container-high)] hover:text-[var(--md-sys-color-primary)] cursor-pointer transition-colors font-medium", "Home" }
                    Link { to: Route::Team {}, class: "px-4 py-2 rounded-full hover:bg-[var(--md-sys-color-surface-container-high)] hover:text-[var(--md-sys-color-primary)] cursor-pointer transition-colors font-medium", "Team" }
                    Link { to: Route::Events {}, class: "px-4 py-2 rounded-full hover:bg-[var(--md-sys-color-surface-container-high)] hover:text-[var(--md-sys-color-primary)] cursor-pointer transition-colors font-medium", "Events" }
                    Link { to: Route::Resources {}, class: "px-4 py-2 rounded-full hover:bg-[var(--md-sys-color-surface-container-high)] hover:text-[var(--md-sys-color-primary)] cursor-pointer transition-colors font-medium", "Resources" }
                    Link { to: Route::About {}, class: "px-4 py-2 rounded-full hover:bg-[var(--md-sys-color-surface-container-high)] hover:text-[var(--md-sys-color-primary)] cursor-pointer transition-colors font-medium", "About" }
                }
                div { class: "flex space-x-4",
                    button { class: "px-5 py-2.5 rounded-full text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-container-high)] cursor-pointer transition-colors text-sm font-medium", "Log in" }
                    button { class: "px-5 py-2.5 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full transition-colors text-sm font-medium cursor-pointer shadow-sm", "Join Now" }
                }
            }
        }
        Outlet::<Route> {}
        Footer {}
    }
}

#[component]
fn Home() -> Element {
    rsx! {
        div { class: "bg-[var(--bg-base)] text-[var(--text-main)] min-h-screen transition-colors duration-300",
            HeroSection {}
            StatsSection {}
            FacultyMentorsSection {}
            LogicLeagueSection {}
            LatestNoticesSection {}
            GallerySection {}
            CTASection {}
        }
    }
}

#[component]
fn HeroSection() -> Element {
    rsx! {
        div { class: "relative max-w-7xl mx-auto px-4 pt-32 pb-24 overflow-hidden",
            div { class: "absolute top-10 right-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[var(--accent)] opacity-20 blur-[150px] rounded-full pointer-events-none translate-x-1/3" }
            div { class: "absolute bottom-0 left-0 w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-[var(--text-main)] opacity-10 blur-[100px] rounded-full pointer-events-none -translate-x-1/2" }

            div { class: "relative z-10 flex flex-col md:flex-row items-center justify-between gap-12",
                div { class: "md:w-2/3",
                    div { class: "inline-block mb-6 px-4 py-2 rounded-full  glass-panel animate-fade-in-up delay-1 text-[var(--accent)] text-sm font-bold tracking-widest uppercase shadow-sm",
                        "✨ Welcome to C3"
                    }
                    h1 { class: "text-6xl md:text-8xl lg:text-9xl font-extrabold mb-8 tracking-tighter text-[var(--text-main)] leading-[0.9]",
                        "CREATE." br {} "CODE." br {} "CONQUER."
                    }
                    p { class: "text-xl md:text-2xl font-medium text-[var(--text-muted)] max-w-2xl mb-12 leading-relaxed",
                        "Where creativity meets code at GEC Samastipur. Join our vibrant team of coders, creators, and innovators."
                    }
                    div { class: "flex flex-col sm:flex-row gap-6",
                        Link { to: Route::Events {}, class: "px-10 py-5 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] font-bold rounded-full text-lg transition-colors cursor-pointer shadow-md flex items-center justify-center",
                            "Explore Events"
                        }
                        Link { to: Route::Team {}, class: "px-10 py-5 bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-on-surface)] font-bold rounded-full text-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center",
                            "Meet the Team"
                        }
                    }
                }
                div { class: "md:w-1/3 flex justify-center mt-12 md:mt-0",
                    div { class: "relative w-full aspect-square max-w-[350px]",
                        div { class: "absolute inset-0 bg-gradient-to-br from-[var(--bg-glass)] to-[var(--bg-base)] backdrop-blur-3xl rounded-[3rem]  shadow-2xl flex items-center justify-center overflow-hidden",
                            div { class: "text-[15rem] font-black opacity-10 text-[var(--accent)] -translate-y-4",
                                span { "{{" }
                                span { "}}" }
                            }
                        }
                        div { class: "absolute -bottom-6 -left-6 w-28 h-28 bg-[var(--bg-glass)] backdrop-blur-2xl rounded-[2rem]  shadow-xl flex items-center justify-center text-4xl animate-bounce-slow", "💡" }
                        div { class: "absolute -top-6 -right-6 w-20 h-20 bg-[var(--accent)] rounded-[1.5rem] shadow-xl rotate-12 opacity-90" }
                    }
                }
            }
        }
    }
}

#[component]
fn StatsSection() -> Element {
    rsx! {
        div { class: "relative max-w-7xl mx-auto px-4 py-24",
            div { class: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px]",
                div { class: "col-span-2 row-span-2 bg-[var(--bg-glass)] backdrop-blur-xl rounded-[2rem]  p-10 flex flex-col justify-end relative overflow-hidden group shadow-lg hover:shadow-xl transition-all",
                    div { class: "absolute top-0 right-0 p-8 text-8xl opacity-10 group-hover:scale-110 transition-transform duration-700 ease-out", "" }
                    span { class: "text-6xl md:text-8xl font-black text-[var(--text-main)] mb-2 tracking-tighter", "500+" }
                    span { class: "text-[var(--text-muted)] text-lg font-bold uppercase tracking-widest", "Active Coders" }
                }
                div { class: "col-span-2 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-base)] rounded-[2rem]  p-8 flex flex-col justify-center items-start shadow-md ",
                    span { class: "text-4xl md:text-5xl font-black text-[var(--text-main)] mb-2 tracking-tighter", "20+" }
                    span { class: "text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest", "Hackathons Hosted" }
                }
                div { class: "bg-[var(--accent)] text-[#eae3d9] rounded-[2rem] p-8 flex flex-col justify-center items-start shadow-md ",
                    span { class: "text-4xl font-black mb-2 tracking-tighter", "45+" }
                    span { class: "text-xs font-bold uppercase tracking-widest opacity-80", "Workshops" }
                }
                div { class: "glass-panel animate-fade-in-up delay-1 rounded-[2rem]  p-8 flex flex-col justify-center items-start shadow-md ",
                    span { class: "text-4xl font-black text-[var(--text-main)] mb-2 tracking-tighter", "100+" }
                    span { class: "text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest", "Projects" }
                }
            }
        }
    }
}

#[component]
fn LatestNoticesSection() -> Element {
    rsx! {
        div { class: "max-w-7xl mx-auto px-4 py-24",
            div { class: "text-center mb-12",
                h2 { class: "text-3xl md:text-4xl font-bold mb-4", "Latest Notices" }
                p { class: "text-[var(--text-muted)] text-lg max-w-2xl mx-auto", "Stay updated with the latest announcements from our team." }
            }
            div { class: "max-w-4xl mx-auto",
                // Live Notice Card
                div { class: "glass-panel animate-fade-in-up delay-1 p-8 rounded-[2rem] border-2 border-[var(--accent)] shadow-xl relative overflow-hidden",
                    // Pulse Live Indicator
                    div { class: "absolute top-6 right-6 flex items-center gap-2 bg-[var(--bg-base)] px-4 py-1.5 rounded-full",
                        div { class: "w-3 h-3 rounded-full bg-red-500 animate-pulse" }
                        span { class: "text-sm font-bold text-red-500 tracking-wider", "LIVE" }
                    }

                    div { class: "flex items-center gap-2 text-[var(--accent)] font-bold mb-4",
                        "📅 9/17/2026"
                    }

                    h3 { class: "text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-4",
                        "🚀 C3 Coding Club Recruitment – 2K25 Batch"
                    }

                    div { class: "text-[var(--text-muted)] text-lg leading-relaxed space-y-2 mb-8",
                        p { "Hello 2K25 Students," }
                        p { "Ready to code, learn, build, and grow with an amazing community? 💻✨" }
                        p { "The C3 Coding Club Recruitment for the 2K25 Batch is here! 🎉" }
                        p { "📅 Date: 22 September 2026" }
                        p { "⏰ Time: 2:00 PM onwards" }
                        p { "Stay tuned fo..." }
                    }

                    div { class: "flex flex-col sm:flex-row items-center gap-4",
                        a { href: "https://forms.gle/v2k4Kx22rp1uwWyW9", target: "_blank", class: "w-full sm:w-auto px-8 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] font-bold rounded-full text-center transition-colors cursor-pointer shadow-md",
                            "Register Now"
                        }
                        button { class: "w-full sm:w-auto px-8 py-3 bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-on-surface)] font-bold rounded-full text-center transition-colors cursor-pointer shadow-sm",
                            "Read More ↓"
                        }
                    }
                }
            }
        }
    }
}

#[component]
fn GallerySection() -> Element {
    rsx! {
        div { class: "max-w-7xl mx-auto px-4 py-16",
            div { class: "text-center mb-12",
                h2 { class: "text-3xl md:text-4xl font-bold mb-4", "📸 Glimpses of Our Journey" }
                p { class: "text-[var(--text-muted)] text-lg max-w-2xl mx-auto", "Moments captured from our events, workshops, and celebrations." }
            }
            div { class: "grid grid-cols-2 md:grid-cols-4 gap-4",
                div { class: "aspect-video bg-[var(--bg-surface)] rounded-xl  animate-pulse" }
                div { class: "aspect-video bg-[var(--bg-surface)] rounded-xl  animate-pulse" }
                div { class: "aspect-video bg-[var(--bg-surface)] rounded-xl  animate-pulse" }
                div { class: "aspect-video bg-[var(--bg-surface)] rounded-xl  animate-pulse" }
            }
        }
    }
}

#[component]
fn FacultyMentorsSection() -> Element {
    rsx! {
        div { class: "relative max-w-7xl mx-auto px-4 py-24",
            div { class: "text-center mb-20",
                h2 { class: "text-5xl md:text-6xl font-extrabold text-[var(--text-main)] tracking-tighter mb-6", "Faculty Mentors" }
                p { class: "text-[var(--text-muted)] text-xl font-medium max-w-2xl mx-auto", "Guiding our vision, nurturing talent, and shaping the future of tech at GEC Samastipur." }
            }
            div { class: "grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto",
                MentorCard { name: "Rajesh Kumar", department: "CSE Department", image: asset!("/assets/rajesh_sir.jpg"), delay: "0" }
                MentorCard { name: "Shafaque Aziz", department: "CSE Department", image: asset!("/assets/shafaque_mam.jpg"), delay: "1" }
            }
        }
    }
}

#[component]
fn MentorCard(name: String, department: String, image: Asset, delay: String) -> Element {
    rsx! {
        div { class: "group relative bg-[var(--bg-glass)] backdrop-blur-xl rounded-[3rem]  p-10 flex flex-col items-center hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden",
            div { class: "absolute top-0 right-0 w-64 h-64 bg-[var(--accent)] rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" }

            div { class: "w-48 h-48 mb-8 rounded-full overflow-hidden border-8 border-[var(--bg-surface)] shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500",
                img {
                    src: "{image}",
                    alt: "{name}",
                    class: "w-full h-full object-cover"
                }
            }
            h3 { class: "text-3xl font-bold text-[var(--text-main)] mb-2 z-10 tracking-tight", "{name}" }
            p { class: "text-[var(--text-muted)] font-bold mb-8 tracking-widest uppercase text-sm z-10", "{department}" }
            div { class: "flex gap-5 z-10",
                a { href: "#", class: "w-12 h-12 flex items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-[#eae3d9] transition-all cursor-pointer shadow-md",
                    svg { class: "w-5 h-5", fill: "currentColor", "viewBox": "0 0 24 24",
                        path { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
                    }
                }
                a { href: "#", class: "w-12 h-12 flex items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-[#eae3d9] transition-all cursor-pointer shadow-md",
                    svg { class: "w-5 h-5", fill: "currentColor", "viewBox": "0 0 24 24",
                        path { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }
                    }
                }
            }
        }
    }
}

#[component]
fn LogicLeagueSection() -> Element {
    rsx! {
        div { class: "relative max-w-7xl mx-auto px-4 py-32 border-t border-[var(--border-glass)]",
            div { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[var(--text-main)] opacity-5 blur-[150px] rounded-full pointer-events-none" }
            div { class: "text-center mb-24 relative z-10",
                div { class: "inline-block mb-4 px-4 py-1.5 rounded-full  glass-panel animate-fade-in-up delay-1 text-[var(--accent)] text-xs font-bold tracking-widest uppercase shadow-sm",
                    "🏆 Hall of Fame"
                }
                h2 { class: "text-5xl md:text-7xl font-extrabold text-[var(--text-main)] tracking-tighter mb-4", "LOGIC LEAGUE" }
                p { class: "text-[var(--text-muted)] text-xl font-medium tracking-wide", "Celebrating the brilliant minds who conquered the code." }
            }
            div { class: "flex flex-col md:flex-row justify-center items-end gap-6 max-w-5xl mx-auto relative z-10",
                div { class: "w-full md:w-1/3 order-2 md:order-1 transition-transform hover:-translate-y-2",
                    WinnerCard { name: "Manas Kumar Thakur", position: "2nd", batch: "2024-2028", image: asset!("/assets/manash-kumar-thakur.png"), custom_class: "md:h-[350px] glass-panel animate-fade-in-up delay-1" }
                }
                div { class: "w-full md:w-1/3 order-1 md:order-2 z-10 md:-translate-y-8 transition-transform hover:-translate-y-10 shadow-2xl",
                    WinnerCard { name: "Kumari Angel", position: "1st", batch: "2024-2028", image: asset!("/assets/kumari-angel.png"), custom_class: "md:h-[420px] bg-gradient-to-t from-[var(--bg-surface)] to-[var(--bg-glass)] backdrop-blur-xl border-[var(--accent)] border-2" }
                }
                div { class: "w-full md:w-1/3 order-3 md:order-3 transition-transform hover:-translate-y-2",
                    WinnerCard { name: "Adil Aftab", position: "3rd", batch: "2024-2028", image: asset!("/assets/adil-aftab.png"), custom_class: "md:h-[300px] glass-panel animate-fade-in-up delay-1" }
                }
            }
        }
    }
}

#[component]
fn WinnerCard(
    name: String,
    position: String,
    batch: String,
    image: Asset,
    custom_class: String,
) -> Element {
    let medal = match position.as_str() {
        "1st" => "🥇",
        "2nd" => "🥈",
        "3rd" => "🥉",
        _ => "🏅",
    };

    rsx! {
        div { class: "relative  rounded-[2rem] p-8 flex flex-col items-center justify-center {custom_class} group overflow-hidden",
            div { class: "absolute top-4 right-6 text-4xl filter drop-shadow-md z-20 group-hover:scale-125 transition-transform duration-500", "{medal}" }

            div { class: "w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden border-4 border-[var(--bg-base)] shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-500",
                img {
                    src: "{image}",
                    alt: "{name}",
                    class: "w-full h-full object-cover"
                }
            }
            div { class: "text-[var(--accent)] text-lg font-black tracking-widest uppercase mb-1 z-10", "{position} PLACE" }
            h3 { class: "text-2xl font-bold text-[var(--text-main)] mb-1 z-10 text-center leading-tight tracking-tight", "{name}" }
            div { class: "text-[var(--text-muted)] text-sm font-bold z-10", "{batch}" }
        }
    }
}

#[component]
fn CTASection() -> Element {
    rsx! {
        div { class: "max-w-4xl mx-auto px-4 py-20 text-center",
            h2 { class: "text-3xl md:text-4xl font-bold mb-6 text-[var(--text-main)]", "Empowering the next generation of innovators." }
            p { class: "text-[var(--text-muted)] text-lg mb-8", "Join our vibrant team of students at GEC Samastipur." }
            button { class: "px-8 py-4 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] font-bold rounded-full text-lg transition-all cursor-pointer shadow-md",
                "Join C3 Team Today"
            }
        }
    }
}

// ---------------------------------------------------------
// Sub Pages
// ---------------------------------------------------------

#[component]
fn Team() -> Element {
    rsx! {
        div { class: "bg-[var(--bg-base)] text-[var(--text-main)] min-h-screen py-16",
            div { class: "max-w-7xl mx-auto px-4",
                div { class: "text-center mb-16",
                    h1 { class: "text-4xl md:text-5xl font-extrabold mb-4", "Our Team" }
                    p { class: "text-[var(--text-muted)] text-xl", "Meet the passionate individuals driving the Creative Coding Community." }
                }

                TeamSection { title: "Founding Members", icon: "🚀", count: "5 members",
                    TeamCard { name: "Sumit Sharma", role: "Founding Member", batch: "2022-2026", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789118879/sumit-sharma-founding-member-c3-community.jpg", linkedin: "https://www.linkedin.com/in/sumit-kr-sharma-02692a279/" }
                    TeamCard { name: "Harinand Kumar", role: "Founding Member", batch: "2022-2026", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789120614/harinand-kumar-founding-member-c3-community.jpg", linkedin: "https://www.linkedin.com/in/harinandkumar/" }
                    TeamCard { name: "Utkarsh Kumar Jha", role: "Founding Member", batch: "2022-2026", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789120775/utkarsh-kumar-jha-founding-member-c3-community.png", linkedin: "https://www.linkedin.com/in/utkarsh-kumar-jha/" }
                    TeamCard { name: "Basant Kumar", role: "Founding Member", batch: "2022-2026", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789120849/basant-kumar-founding-member-c3-community.jpg", linkedin: "https://www.linkedin.com/in/basant-kumar-1b2667279/" }
                    TeamCard { name: "Raushan Kumar", role: "Founding Member", batch: "2022-2026", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789120920/raushan-kumar-founding-member-c3-community.png", linkedin: "https://www.linkedin.com/in/raushan41/" }
                }

                TeamSection { title: "Senior Coordinators", icon: "⭐", count: "7 members",
                    TeamCard { name: "Prajjwal", role: "Senior Coordinator", batch: "2023-2027", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789065988/prajjwal-senior-coordinator-c3-community.jpg" }
                    TeamCard { name: "Pushkar Kumar", role: "Senior Coordinator", batch: "2023-2027", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789068601/pushkar-kumar-senior-coordinator-c3-community.png" }
                    TeamCard { name: "Sonam Yadav", role: "Senior Coordinator", batch: "2023-2027", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789068793/sonam-yadav-senior-coordinator-c3-community.jpg" }
                    TeamCard { name: "Kajal Kumari", role: "Senior Coordinator", batch: "2023-2027", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789069200/kajal-kumari-senior-coordinator-c3-community.jpg" }
                    TeamCard { name: "Vishal Kriti", role: "Senior Coordinator", batch: "2023-2027", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789069034/vishal-kriti-senior-coordinator-c3-community.jpg" }
                    TeamCard { name: "Ehetesham Alam", role: "Senior Coordinator", batch: "2023-2027", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789069746/ehetesham-alam-senior-coordinator-c3-community.jpg" }
                    TeamCard { name: "Bhupendra Kumar", role: "Senior Coordinator", batch: "2023-2027", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789069834/bhupendra-kumar-senior-coordinator-c3-community.jpg" }
                }

                TeamSection { title: "Coordinators", icon: "📋", count: "8 members",
                    TeamCard { name: "Nilesh Kumar", role: "Coordinator", batch: "2024-2028", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789066223/nilesh-kumar-coordinator-c3-community.jpg" }
                    TeamCard { name: "Minakshi Kumari", role: "Coordinator", batch: "2024-2028", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789066748/minakshi-kumari-coordinator-c3-community.jpg" }
                    TeamCard { name: "Kajal Kumari", role: "Coordinator", batch: "2024-2028", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789066924/kajal-kumari-coordinator-c3-community.jpg" }
                    TeamCard { name: "NARENDRA KUMAR", role: "Coordinator", batch: "2024-2028", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789067155/narendra-kumar-coordinator-c3-community.jpg", linkedin: "https://www.linkedin.com/in/narendra030207/" }
                    TeamCard { name: "SHIVAM KUMAR SHARMA", role: "Coordinator", batch: "2024-2028", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789067389/shivam-kumar-sharma-coordinator-c3-community.jpg" }
                    TeamCard { name: "Swati Priya", role: "Coordinator", batch: "2024-2028", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789067731/swati-priya-coordinator-c3-community.jpg" }
                    TeamCard { name: "Sakshi Chaudhary", role: "Coordinator", batch: "2024-2028", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789067608/sakshi-chaudhary-coordinator-c3-community.jpg" }
                    TeamCard { name: "NIRAJ KUMAR", role: "Coordinator", batch: "2024-2028", image: "https://res.cloudinary.com/dvmvsnf73/image/upload/v1789319151/c3-team/niraj-kumar-coordinator-c3-community-1789319150707.jpg" }
                }

                TeamSection { title: "Sub-Coordinators", icon: "🟢", count: "0 members",
                    div { class: "col-span-full py-12 text-center text-[var(--text-muted)] bg-[var(--bg-surface)] border border-dashed border-[var(--border-color)] rounded-2xl",
                        "No members in this category yet"
                    }
                }

                TeamSection { title: "Volunteers", icon: "🤝", count: "0 members",
                    div { class: "col-span-full py-12 text-center text-[var(--text-muted)] bg-[var(--bg-surface)] border border-dashed border-[var(--border-color)] rounded-2xl",
                        "No members in this category yet"
                    }
                }
            }
        }
    }
}

#[component]
fn TeamSection(title: String, icon: String, count: String, children: Element) -> Element {
    rsx! {
        div { class: "mb-16",
            div { class: "flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-8",
                h2 { class: "text-2xl font-bold text-[var(--text-main)] flex items-center gap-3",
                    span { "{icon}" }
                    "{title}"
                }
                span { class: "px-3 py-1 glass-panel animate-fade-in-up delay-1 rounded-full text-[var(--text-muted)] text-sm font-semibold shadow-sm",
                    "{count}"
                }
            }
            div { class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
                {children}
            }
        }
    }
}

#[component]
fn TeamCard(
    name: String,
    role: String,
    batch: String,
    image: String,
    linkedin: Option<String>,
) -> Element {
    rsx! {
        div { class: "flex flex-col items-center p-6 glass-panel animate-fade-in-up delay-1 rounded-2xl  shadow-lg text-center group",
            div { class: "w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-[var(--bg-base)] group-hover:border-[var(--accent)] transition-colors shadow-md bg-gray-200",
                img {
                    src: "{image}",
                    alt: "{name}",
                    class: "w-full h-full object-cover"
                }
            }
            div { class: "text-[var(--accent)] text-xs font-bold tracking-wide uppercase mb-1", "{role}" }
            h3 { class: "text-lg font-bold text-[var(--text-main)] mb-1 leading-tight", "{name}" }
            div { class: "text-[var(--text-muted)] text-sm font-medium mb-4", "📅 {batch}" }
            if let Some(url) = linkedin {
                a { href: "{url}", target: "_blank", class: "w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-base)] text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-[#eae3d9] transition-all cursor-pointer",
                    svg { class: "w-4 h-4", fill: "currentColor", "viewBox": "0 0 24 24",
                        path { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
                    }
                }
            } else {
                span { class: "text-[var(--text-muted)] opacity-50 text-xs py-2", "No social" }
            }
        }
    }
}

#[component]
fn Events() -> Element {
    rsx! {
        div { class: "bg-[var(--bg-base)] text-[var(--text-main)] min-h-screen py-16",
            div { class: "max-w-7xl mx-auto px-4",
                div { class: "text-center mb-16",
                    h1 { class: "text-4xl md:text-5xl font-extrabold mb-4", "Events" }
                    p { class: "text-[var(--text-muted)] text-xl max-w-2xl mx-auto", "Join our exciting events designed to challenge your skills and expand your knowledge in creative coding." }
                }
                div { class: "grid md:grid-cols-2 gap-8",
                    EventCard { title: "C3 Hackathon 2026", action: "Register Now", date: "April 15-17", tag: "Hackathon" }
                    EventCard { title: "Web Dev Bootcamp", action: "View Details", date: "May 2", tag: "Workshop" }
                    EventCard { title: "Algorithmic Challenge", action: "Leaderboard", date: "May 10", tag: "Competition" }
                    EventCard { title: "AI/ML Workshop", action: "Register Now", date: "June 5", tag: "Seminar" }
                }
            }
        }
    }
}

#[component]
fn EventCard(title: String, action: String, date: String, tag: String) -> Element {
    rsx! {
        div { class: "p-8 rounded-2xl  bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] transition-all flex flex-col h-full group hover:-translate-y-1 duration-300",
            div { class: "flex justify-between items-start mb-6",
                span { class: "px-3 py-1 rounded-full text-xs font-semibold bg-[var(--text-muted)] text-[var(--bg-base)]", "{tag}" }
                span { class: "text-sm text-[var(--text-muted)] font-medium", "{date}" }
            }
            h3 { class: "text-2xl font-bold mb-4 flex-grow text-[var(--text-main)]", "{title}" }
            button { class: "mt-6 py-3 px-6 bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] rounded-full text-sm font-bold w-full transition-colors flex justify-center items-center gap-2 cursor-pointer",
                "{action}"
            }
        }
    }
}

#[component]
fn Resources() -> Element {
    rsx! {
        div { class: "bg-[var(--bg-base)] text-[var(--text-main)] min-h-screen py-16",
            div { class: "max-w-7xl mx-auto px-4",
                div { class: "text-center mb-16",
                    h1 { class: "text-4xl md:text-5xl font-extrabold mb-4", "Resources" }
                    p { class: "text-[var(--text-muted)] text-xl max-w-2xl mx-auto", "Curated materials, roadmaps, and tools to help you excel in software development." }
                }
                div { class: "grid md:grid-cols-3 gap-6",
                    ResourceCard { title: "Web Development", desc: "HTML, CSS, JS and React Roadmaps" }
                    ResourceCard { title: "Data Structures", desc: "Algorithms and DSA practice sheets" }
                    ResourceCard { title: "Open Source", desc: "Guide to getting started with Git & GitHub" }
                    ResourceCard { title: "Machine Learning", desc: "Python, Pandas, and Neural Networks" }
                    ResourceCard { title: "DevOps", desc: "Docker, Kubernetes, and CI/CD pipelines" }
                    ResourceCard { title: "Design", desc: "Figma and UI/UX best practices" }
                }
            }
        }
    }
}

#[component]
fn ResourceCard(title: String, desc: String) -> Element {
    rsx! {
        div { class: "p-6 rounded-2xl glass-panel animate-fade-in-up delay-1 hover:border-[var(--accent)] transition-colors cursor-pointer",
            h3 { class: "text-xl font-bold text-[var(--text-main)] mb-2", "{title}" }
            p { class: "text-[var(--text-muted)]", "{desc}" }
        }
    }
}

#[component]
fn About() -> Element {
    rsx! {
        div { class: "bg-[var(--bg-base)] text-[var(--text-main)] min-h-screen py-16",
            div { class: "max-w-4xl mx-auto px-4",
                div { class: "text-center mb-16",
                    h1 { class: "text-4xl md:text-5xl font-extrabold mb-4", "About Us" }
                    p { class: "text-[var(--text-muted)] text-xl", "Empowering coders through collaboration, education, and innovation at GEC Samastipur." }
                }
                div { class: "bg-[var(--bg-surface)] p-8 rounded-2xl  mb-12",
                    h2 { class: "text-2xl font-bold mb-4", "Our Mission" }
                    p { class: "text-[var(--text-muted)] leading-relaxed text-lg",
                        "The Creative Coding Community (C3) was established to foster a strong coding culture among students. We organize hackathons, coding workshops, and collaborative projects to bridge the gap between academic learning and industry requirements."
                    }
                }
            }
        }
    }
}

// ---------------------------------------------------------
// Shared Footer
// ---------------------------------------------------------

#[component]
fn Footer() -> Element {
    rsx! {
        footer { class: "bg-[var(--bg-surface)] border-t border-[var(--border-color)] text-[var(--text-muted)] py-16 transition-colors duration-300",
            div { class: "max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12",
                div { class: "col-span-1 md:col-span-2",
                    div { class: "text-2xl font-bold text-[var(--text-main)] mb-6 tracking-tight", "Creative Coding Community" }
                    p { class: "mb-6 text-sm max-w-xs leading-relaxed", "Empowering the next generation of tech innovators through coding, competitions, and teamwork at GEC Samastipur." }
                    div { class: "flex space-x-5",
                        a { href: "#", class: "hover:text-[var(--text-main)] transition-colors cursor-pointer rounded-md px-2 py-1", "𝕏 Twitter" }
                        a { href: "#", class: "hover:text-[var(--text-main)] transition-colors cursor-pointer rounded-md px-2 py-1", "🐙 GitHub" }
                        a { href: "#", class: "hover:text-[var(--text-main)] transition-colors cursor-pointer rounded-md px-2 py-1", "💼 LinkedIn" }
                    }
                }
                FooterColumn { title: "Quick Links", links: vec!["Home".into(), "Events".into(), "Team".into(), "Gallery".into(), "Notices".into()] }
                FooterColumn { title: "Contact", links: vec!["Contact Us".into(), "Help Center".into()] }
            }
            div { class: "max-w-7xl mx-auto px-4 pt-8 border-t border-[var(--border-color)] text-sm flex flex-col md:flex-row justify-between items-center gap-4",
                span { "© 2025 Creative Coding Community. All rights reserved." }
                div { class: "flex space-x-6",
                    span { "Developed with ❤️ by C3 Team" }
                }
            }
        }
    }
}

#[component]
fn FooterColumn(title: String, links: Vec<String>) -> Element {
    rsx! {
        div { class: "col-span-1",
            h4 { class: "text-[var(--text-main)] font-bold mb-5 tracking-wide", "{title}" }
            ul { class: "space-y-3 text-sm",
                for link in links {
                    li {
                        a { href: "#", class: "px-4 py-2 rounded-full hover:bg-[var(--md-sys-color-surface-container-high)] hover:text-[var(--md-sys-color-primary)] cursor-pointer transition-colors font-medium", "{link}" }
                    }
                }
            }
        }
    }
}

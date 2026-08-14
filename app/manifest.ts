import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "C3 Community",
    short_name: "C3",
    description:
      "Premium technology community platform for coding enthusiasts, hackathons, competitions, and student achievements.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e1a",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Emmanuel Boat Club",
    short_name: "EBC",
    description: "Emmanuel Boat Club",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/ebc-logo-1024x1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}

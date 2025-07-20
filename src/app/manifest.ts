import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Emmanuel Boat Club",
    short_name: "EBC",
    description: "Emmanuel Boat Club",
    start_url: "/",
    display: "standalone",
  };
}

import { Collection } from "@/lib/collection-schema";
import { PWALink } from "./pwa-link";
import { useIntranetStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";

export function Card({
  href,
  collections,
}: {
  href: string;
  collections: Collection[];
}) {
  const pinnedHrefs = useIntranetStore(
    useShallow((state) => state.pinnedHrefs)
  );

  function findLabelAndCollectionTitle(
    href: string,
    collections: Collection[]
  ): { label: string; collectionTitle: string } | undefined {
    for (const collection of collections) {
      for (const item of collection.labelledHrefs) {
        if (item.href === href) {
          return {
            label: item.label,
            collectionTitle: collection.title,
          };
        }
      }
    }
    return undefined;
  }

  const match = findLabelAndCollectionTitle(href, collections);

  if (!match) {
    return null;
  }

  return (
    <PWALink
      href={href}
      className="p-3 rounded-lg h-20 flex flex-col justify-end relative"
      style={{
        backgroundImage: `url('/mesh/${pinnedHrefs.indexOf(href)}.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="text-white/70 text-xs font-bold uppercase">
        {match.collectionTitle}
      </p>
      <h2 className="text-white text-sm font-medium">{match.label}</h2>
    </PWALink>
  );
}

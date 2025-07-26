import { CollectionSection } from "@/components/collection-section";
import { Nav } from "@/components/nav";
import { PinGrid } from "@/components/pin-grid";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { Separator } from "@/components/ui/separator";
import { getRole } from "@/lib/get-role";
import { redirect } from "next/navigation";

export default async function Home() {
  const role = await getRole();

  if (!role) {
    redirect("/auth");
  }

  return (
    <main
      style={{
        height: "calc(100vh - env(safe-area-inset-top) - 68px)",
        paddingTop: "calc(env(safe-area-inset-top) + 68px)",
      }}
    >
      <Nav title="EBC Intranet" />

      <div className="flex flex-col pb-4">
        <PinGrid collections={role.collections} />

        <div className="flex flex-col pt-4">
          <Separator />
          {role.collections.map((collection) => {
            return (
              <CollectionSection
                collection={collection}
                key={collection.title}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

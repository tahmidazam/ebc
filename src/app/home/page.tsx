import { CollectionSection } from "@/components/collection-section";
import { Nav } from "@/components/nav";
import { PinGrid } from "@/components/pin-grid";
import { Separator } from "@/components/ui/separator";
import { getRole } from "@/lib/get-role";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const role = await getRole();

  if (!role) {
    (await cookies()).delete("code");
    redirect("/auth");
  }

  return (
    <main
      style={{
        height: "calc(100vh - env(safe-area-inset-top) - 68px)",
        paddingTop: "calc(env(safe-area-inset-top) + 68px)",
      }}
    >
      <Nav title="EBC Intranet" subtitle={role.title} />

      <div
        style={{
          paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
          paddingRight: "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
        }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">EBC Intranet</h1>
        <p className="text-muted-foreground">{role.title}</p>
      </div>

      <div className="flex flex-col gap-4 py-4">
        <PinGrid collections={role.collections} />

        <div className="flex flex-col">
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

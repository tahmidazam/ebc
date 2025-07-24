import { Card } from "@/components/card";
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
    <div
      className="grid grid-cols-2 gap-4 py-4"
      style={{
        paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
        paddingRight: "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
      }}
    >
      <Card
        label="Summer Training Log"
        href="googlesheets://docs.google.com/spreadsheets/d/1Qnym4-vOcVDyV2yax6wfX5P2iY9ILoqRNxXGoT_GVaI/edit"
      />
    </div>
  );
}

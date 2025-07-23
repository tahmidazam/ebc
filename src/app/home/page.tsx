import { Card } from "@/components/card";

export default function Home() {
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

import { Nav } from "@/components/nav";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      style={{
        height: "calc(100vh - env(safe-area-inset-top) - 68px)",
        paddingTop: "calc(env(safe-area-inset-top) + 68px)",
      }}
    >
      <Nav />

      <h1
        className="text-3xl font-semibold tracking-tight"
        style={{
          paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
          paddingRight: "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
        }}
      >
        EBC Intranet
      </h1>

      {children}
    </main>
  );
}

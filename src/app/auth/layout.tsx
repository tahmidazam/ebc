export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="h-screen"
      style={{
        paddingTop: "calc(env(safe-area-inset-top))",
        paddingBottom: "calc(env(safe-area-inset-bottom))",
      }}
    >
      {children}
    </main>
  );
}

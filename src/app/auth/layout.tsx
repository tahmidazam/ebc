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
      }}
    >
      {children}
    </main>
  );
}

import Link from "next/link";

export function Card({ label, href }: { label: string; href: string }) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="p-3 rounded-lg h-26 flex flex-col justify-end relative"
      style={{
        backgroundImage: "url('/mesh/0.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-white text-sm font-medium">{label}</h2>
    </Link>
  );
}

import { Card } from "@/components/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-16">
      <Link href="/auth">Go to Auth</Link>
      <Link href="/home">Go to Home</Link>
    </div>
  );
}

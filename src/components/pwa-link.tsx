import Link from "next/link";

export function PWALink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
} & React.ComponentProps<typeof Link>) {
  const url = new URL(href);

  if (
    url.hostname === "docs.google.com" &&
    url.pathname.startsWith("/spreadsheets/")
  ) {
    const transformedHref = href.replace(/^https:/, "googlesheets:");

    return (
      <Link href={transformedHref} {...props}>
        {children}
      </Link>
    );
  }

  const transformedHref = `x-safari-${href}`;

  return (
    <Link href={transformedHref} {...props}>
      {children}
    </Link>
  );
}

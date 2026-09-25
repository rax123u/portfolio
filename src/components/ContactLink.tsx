type ContactLinkProps = {
  href: string;
  label: string;
  kind?: "email" | "url";
  className?: string;
};

export function ContactLink({ href, label, kind = "url", className = "" }: ContactLinkProps) {
  const resolved = !href ? "" : kind === "email" && !href.startsWith("mailto:") ? `mailto:${href}` : href;

  if (!resolved) {
    return (
      <span className={className} title="Add this link in src/data/site.ts">
        {label}
        <span className="sr-only">. Placeholder. Add the real link in src/data/site.ts.</span>
      </span>
    );
  }

  const external = resolved.startsWith("http");

  return (
    <a
      className={`link-line ${className}`}
      href={resolved}
      data-cursor="Open"
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {label}
    </a>
  );
}

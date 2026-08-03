export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl leading-tight text-foreground sm:text-4xl">{title}</h2>
      <div
        className={
          align === "center" ? "gold-rule mx-auto mt-4 w-24" : "gold-rule mt-4 w-24"
        }
        aria-hidden="true"
      />
      {subtitle && (
        <p
          className={
            "mt-4 text-sm leading-relaxed text-muted-foreground " +
            (align === "center" ? "mx-auto max-w-xl" : "max-w-xl")
          }
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

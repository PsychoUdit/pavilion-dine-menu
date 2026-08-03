import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  X,
  Clock,
  MapPin,
  Phone,
  Quote,
  Star,
  ChefHat,
  Utensils,
  Sparkles,
  ArrowUp,
} from "lucide-react";

const heroImage = "/hero-dining.jpg";
import { menu, restaurant, reviews, gallery, type Dish } from "@/data/menu";
import { DishRow, DietMark } from "@/components/menu/DishRow";
import { SectionHeading } from "@/components/menu/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TITLE = "Pavilion All Day Dining, Indore — Menu";
const DESCRIPTION =
  "Browse the full Pavilion All Day Dining menu in Indore: soups, starters, North Indian, Chinese, pasta, pizza, biryani, breads and desserts. Buffet timings, location and hours.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: MenuPage,
});

type Filter = "all" | "veg" | "nonveg";

function MenuPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState(menu[0]!.id);
  const [showTop, setShowTop] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((d) => {
          const dietOk = filter === "all" || d.diet === filter;
          const queryOk =
            !q ||
            d.name.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q) ||
            cat.title.toLowerCase().includes(q);
          return dietOk && queryOk;
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query, filter]);

  const isSearching = query.trim().length > 0 || filter !== "all";
  const resultCount = sections.reduce((n, c) => n + c.items.length, 0);

  const popular = useMemo(
    () => menu.flatMap((c) => c.items.filter((d) => d.popular).map((d) => ({ ...d, cat: c.title }))),
    [],
  );
  const chefPicks = useMemo(
    () =>
      menu.flatMap((c) => c.items.filter((d) => d.chefPick).map((d) => ({ ...d, cat: c.title }))),
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-140px 0px -65% 0px", threshold: 0 },
    );
    menu.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections.length]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const chip = navRef.current?.querySelector<HTMLElement>(`[data-chip="${activeId}"]`);
    chip?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeId]);

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* ---------------------------------------------------------------- Hero */}
        <header className="relative isolate overflow-hidden">
          <img
            src={heroImage}
            alt="The Pavilion dining room with green banquettes, chandeliers and the live buffet counter"
            width={1600}
            height={1104}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="hero-scrim absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto flex min-h-[78svh] max-w-2xl flex-col items-center justify-end px-6 pt-24 pb-14 text-center">
            <div className="animate-fade-in">
              <p className="eyebrow text-gold-soft">Est. Indore</p>
              <h1 className="mt-3 font-display text-6xl leading-[0.95] text-cream sm:text-7xl">
                {restaurant.name}
              </h1>
              <p className="mt-3 font-display text-xl tracking-[0.22em] text-gold-soft uppercase">
                {restaurant.tagline}
              </p>
              <div className="gold-rule mx-auto mt-6 w-32" aria-hidden="true" />
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-cream/85">
                Breakfast to late dinner — a warm, family-friendly room with a generous buffet,
                courteous service and food prepared to hotel hygiene standards.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="rounded-full px-7">
                  <a href="#menu">View the menu</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-gold-soft/60 bg-transparent px-7 text-cream hover:bg-cream/10 hover:text-cream"
                >
                  <a href="#visit">Hours &amp; location</a>
                </Button>
              </div>
              <p className="mt-8 text-[0.7rem] tracking-[0.2em] text-cream/60 uppercase">
                Scan · Browse · Order with your server
              </p>
            </div>
          </div>
        </header>

        {/* ------------------------------------------------- Sticky search + nav */}
        <div className="sticky top-0 z-40 border-b border-border/70 bg-background/92 backdrop-blur-md">
          <div className="mx-auto max-w-3xl px-4 pt-3 pb-2">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <div className="relative min-w-0">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search dishes…"
                  aria-label="Search the menu"
                  className="h-10 rounded-full border-border bg-card pr-9 pl-9 placeholder:text-muted-foreground"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-muted"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div
                role="group"
                aria-label="Filter by dietary preference"
                className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-card p-1"
              >
                {(["all", "veg", "nonveg"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      filter === f
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {f === "all" ? "All" : f === "veg" ? "Veg" : "Non-veg"}
                  </button>
                ))}
              </div>
            </div>

            <nav aria-label="Menu categories" className="mt-2">
              <div
                ref={navRef}
                className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {menu.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    data-chip={cat.id}
                    aria-current={activeId === cat.id ? "true" : undefined}
                    className={cn(
                      "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide whitespace-nowrap transition-colors",
                      activeId === cat.id
                        ? "border-gold bg-gold/15 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-gold/50 hover:text-foreground",
                    )}
                  >
                    {cat.title}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* ----------------------------------------------------- Highlight rails */}
        {!isSearching && (
          <>
            <section className="mx-auto max-w-3xl px-5 pt-14">
              <SectionHeading
                eyebrow="Guest favourites"
                title="Most loved at Pavilion"
                subtitle="The dishes our regulars come back for, week after week."
              />
              <div className="-mx-5 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {popular.map((d) => (
                  <HighlightCard key={d.name} dish={d} category={d.cat} icon={Star} />
                ))}
              </div>
            </section>

            <section className="mx-auto max-w-3xl px-5 pt-12">
              <SectionHeading
                eyebrow="From the pass"
                title="Chef's recommendations"
                subtitle="Hand-picked by our kitchen team for this season."
              />
              <div className="-mx-5 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {chefPicks.map((d) => (
                  <HighlightCard key={d.name} dish={d} category={d.cat} icon={ChefHat} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* ------------------------------------------------------------ The menu */}
        <section id="menu" className="mx-auto max-w-3xl scroll-mt-40 px-5 pt-14 pb-4">
          <SectionHeading
            eyebrow="À la carte"
            title="The Menu"
            subtitle="All prices in ₹ and inclusive of taxes. Please tell your server about any allergies — our kitchen is happy to adapt."
          />
          {isSearching && (
            <p
              aria-live="polite"
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              {resultCount} {resultCount === 1 ? "dish" : "dishes"} found
              {query.trim() && <> for “{query.trim()}”</>}
            </p>
          )}
        </section>

        <div className="mx-auto max-w-3xl px-5 pb-6">
          {sections.length === 0 ? (
            <div className="surface-card rounded-xl px-6 py-14 text-center">
              <Utensils className="mx-auto size-6 text-gold" aria-hidden="true" />
              <p className="mt-4 font-display text-xl">No dishes match that search</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different dish name, or ask your server for the day's specials.
              </p>
              <Button
                variant="outline"
                className="mt-5 rounded-full"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
              >
                Reset search
              </Button>
            </div>
          ) : (
            sections.map((cat) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-40 pt-10">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl text-foreground sm:text-3xl">{cat.title}</h3>
                  <span className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" aria-hidden="true" />
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground italic">{cat.blurb}</p>
                <ul className="mt-2 divide-y divide-border/70">
                  {cat.items.map((d) => (
                    <DishRow key={d.name} dish={d} />
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>

        {/* ------------------------------------------------------------- Gallery */}
        <section className="mx-auto max-w-3xl px-5 pt-14">
          <SectionHeading
            eyebrow="The room"
            title="A look around"
            subtitle="Comfortable seating, an open kitchen and space for the whole family."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.map((g) => (
              <figure
                key={g.label}
                className="lift surface-card group relative aspect-4/5 overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 grid place-items-center bg-secondary">
                  <Sparkles className="size-6 text-gold/60" aria-hidden="true" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/85 to-transparent p-3 pt-8">
                  <p className="font-display text-sm text-cream">{g.label}</p>
                  <p className="text-[0.68rem] text-cream/70">{g.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- Reviews */}
        <section className="mt-16 bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-3xl px-5">
            <p className="eyebrow text-center text-gold-soft">Guest book</p>
            <h2 className="mt-2 text-center text-3xl text-cream sm:text-4xl">
              What our guests say
            </h2>
            <div className="gold-rule mx-auto mt-4 w-24" aria-hidden="true" />
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {reviews.map((r) => (
                <blockquote
                  key={r.author}
                  className="rounded-xl border border-cream/15 bg-cream/5 p-5"
                >
                  <Quote className="size-5 text-gold" aria-hidden="true" />
                  <p className="mt-3 font-display text-lg leading-snug text-cream italic">
                    “{r.quote}”
                  </p>
                  <footer className="mt-4 text-xs tracking-widest text-cream/65 uppercase">
                    {r.author} · {r.context}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- Hours, contact, map */}
        <section id="visit" className="mx-auto max-w-3xl scroll-mt-40 px-5 py-16">
          <SectionHeading eyebrow="Plan your visit" title="Hours &amp; Location" />
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="surface-card rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-xl">
                <Clock className="size-4 text-gold" aria-hidden="true" />
                Opening hours
              </h3>
              <dl className="mt-4 space-y-3">
                {restaurant.hours.map((h) => (
                  <div key={h.day} className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-foreground">{h.day}</dt>
                    <dd className="text-right text-sm text-muted-foreground tabular-nums">
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">Open all seven days.</p>
            </div>

            <div className="surface-card rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-xl">
                <MapPin className="size-4 text-gold" aria-hidden="true" />
                Find us
              </h3>
              <address className="mt-4 text-sm leading-relaxed text-muted-foreground not-italic">
                {restaurant.address}
              </address>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild size="sm" className="rounded-full">
                  <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer">
                    Get directions
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a href={`tel:${restaurant.phone.replace(/\s/g, "")}`}>
                    <Phone className="size-3.5" aria-hidden="true" />
                    Call us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* -------------------------------------------------------------- Footer */}
      <footer className="border-t border-border bg-secondary/60 py-10">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="font-display text-3xl text-foreground">{restaurant.name}</p>
          <p className="mt-1 text-[0.7rem] tracking-[0.24em] text-muted-foreground uppercase">
            {restaurant.tagline} · {restaurant.city}
          </p>
          <div className="mt-5 flex items-center justify-center gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <DietMark diet="veg" /> Vegetarian
            </span>
            <span className="inline-flex items-center gap-1.5">
              <DietMark diet="nonveg" /> Non-vegetarian
            </span>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Browsing only — please place your order with your server. Prices are indicative and
            subject to change.
          </p>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "fixed right-4 bottom-5 z-40 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300",
          showTop ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}

function HighlightCard({
  dish,
  category,
  icon: Icon,
}: {
  dish: Dish;
  category: string;
  icon: typeof Star;
}) {
  return (
    <article className="lift surface-card w-60 shrink-0 snap-start rounded-xl p-5">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{category}</span>
        <Icon className="size-4 text-gold" aria-hidden="true" />
      </div>
      <div className="mt-3 flex items-start gap-2">
        <DietMark diet={dish.diet} />
        <h3 className="font-display text-xl leading-snug">{dish.name}</h3>
      </div>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {dish.description}
      </p>
      <p className="mt-4 text-sm font-medium tabular-nums">₹{dish.price}</p>
    </article>
  );
}

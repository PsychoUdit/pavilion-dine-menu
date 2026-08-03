import { Flame, Star, ChefHat } from "lucide-react";
import type { Dish } from "@/data/menu";
import { cn } from "@/lib/utils";

export function DietMark({ diet }: { diet: Dish["diet"] }) {
  const isVeg = diet === "veg";
  return (
    <span
      role="img"
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
      title={isVeg ? "Vegetarian" : "Non-vegetarian"}
      className={cn(
        "mt-1 grid size-4 shrink-0 place-items-center rounded-[3px] border-[1.5px]",
        isVeg ? "border-veg" : "border-nonveg",
      )}
    >
      <span
        className={cn("block size-1.5 rounded-full", isVeg ? "bg-veg" : "bg-nonveg")}
        aria-hidden="true"
      />
    </span>
  );
}

export function DishRow({ dish }: { dish: Dish }) {
  return (
    <li className="group flex items-start gap-3 py-4">
      <DietMark diet={dish.diet} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="min-w-0 flex-1 text-lg leading-snug font-medium text-foreground">
            {dish.name}
          </h4>
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 translate-y-[-0.25rem] border-b border-dotted border-border sm:block"
          />
          <span className="shrink-0 font-sans text-sm font-medium tabular-nums text-foreground/80">
            ₹{dish.price}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{dish.description}</p>
        {(dish.popular || dish.chefPick || dish.spicy) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {dish.popular && <Tag icon={Star} label="Popular" />}
            {dish.chefPick && <Tag icon={ChefHat} label="Chef's pick" />}
            {dish.spicy && <Tag icon={Flame} label="Spicy" />}
          </div>
        )}
      </div>
    </li>
  );
}

function Tag({
  icon: Icon,
  label,
}: {
  icon: typeof Star;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-accent-foreground uppercase">
      <Icon className="size-3 text-gold" aria-hidden="true" />
      {label}
    </span>
  );
}

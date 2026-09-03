import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatEventDate(dateStr: string) {
  const date = new Date(`${dateStr}T00:00:00`);
  return {
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase(),
    month: date.toLocaleDateString("en-US", { month: "long" }).toUpperCase(),
    year: date.toLocaleDateString("en-US", { year: "numeric" }),
    full: date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

export function formatPrice(price: number, currency: string) {
  return `${currency}${price}`;
}

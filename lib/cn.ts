type ClassValue = string | false | null | undefined;

/** Minimale classname-joiner — geen dependency nodig voor dit project. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

export function classNames(...values: unknown[]): string | undefined {
  return values.filter(Boolean).join(" ") || undefined;
}

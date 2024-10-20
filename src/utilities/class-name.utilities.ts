type Arg = boolean | number | string | null | undefined;

export function classNames(...args: Arg[]): string | undefined {
  return args.filter(Boolean).join(" ") || undefined;
}

import { icons } from "../icons/icons";

interface IconProps {
  className?: string;
  name: string;
}

export function Icon({ className, name }: IconProps) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height="1em"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
    >
      {icons[name]}
    </svg>
  );
}

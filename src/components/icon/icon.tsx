import { icons } from "../../icons/icons";

interface Props {
  className?: string;
  name: string;
}

export function Icon({ className, name }: Props) {
  return (
    <svg aria-hidden className={className} fill="currentColor" height="1em" viewBox="0 0 16 16" width="1em">
      {icons[name]}
    </svg>
  );
}

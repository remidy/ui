import { MouseEventHandler } from "react";
import { classNames } from "../../utilities/class-name.utilities";

interface Props {
  children: string;
  className?: string;
  color: "primary" | "secondary";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: "button" | "submit";
}

export function Button({ children, className, color, onClick, type }: Props) {
  return (
    <button
      className={classNames(
        "px-16 py-8 rounded-4",
        color === "primary" && "bg-black text-white",
        color === "secondary" && "bg-white ring ring-black",
        className
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

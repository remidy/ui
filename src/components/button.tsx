import { MouseEventHandler } from "react";
import { classNames } from "../utilities/class-name.utilities";

type ButtonColor = "primary" | "secondary";

interface ButtonProps {
  children: string;
  className?: string;
  color: ButtonColor;
  onClick?: MouseEventHandler<HTMLElement>;
  type: "button" | "submit";
}

const colorMap: Record<ButtonColor, string> = {
  primary: "bg-black text-white hocus:bg-gray-darkest",
  secondary: "bg-white outline outline-1 outline-black -outline-offset-1 hocus:bg-gray-lightest"
};

export function Button({ children, className, color, onClick, type }: ButtonProps) {
  return (
    <button
      className={classNames("px-24 py-12 rounded-4", colorMap[color], className)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

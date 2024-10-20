import { MouseEventHandler, ReactNode } from "react";
import { classNames } from "../utilities/class-name.utilities";
import { Icon } from "./icon";

type BadgeColor = "neutral";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  color: BadgeColor;
  onClick?: MouseEventHandler<HTMLElement>;
  onRemove?: () => void;
}

const colorMap: Record<BadgeColor, string> = {
  neutral: "bg-gray-lightest"
};

export function Badge({ children, className, color, onClick, onRemove }: BadgeProps) {
  return (
    <span className={classNames("inline-flex px-8 rounded-full", colorMap[color], className)} onClick={onClick}>
      {children}
      {onRemove && (
        <button onClick={onRemove} title="Remove" type="button">
          <Icon name="x" />
        </button>
      )}
    </span>
  );
}

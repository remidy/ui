import { classNames } from "../utilities/class-name.utilities";
import { Icon } from "./icon";

interface OptionProps {
  active: boolean;
  children: string;
  id: string;
  selected: boolean;
  value: string;
}

export function Option({ active, children, id, selected, value }: OptionProps) {
  return (
    <div
      aria-selected={selected}
      className={classNames(
        "flex gap-8 items-center justify-between p-12 hover:bg-gray-lightest",
        active && "bg-gray-lightest"
      )}
      data-value={value}
      id={id}
      role="option"
    >
      {children}
      {selected && <Icon className="shrink-0 text-24" name="check" />}
    </div>
  );
}

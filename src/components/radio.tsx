import { ChangeEventHandler, FocusEventHandler } from "../types/form.types";
import { classNames } from "../utilities/class-name.utilities";
import { Icon } from "./icon";

export interface RadioProps {
  checked: boolean;
  className?: string;
  id?: string;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  value: string;
}

export function Radio({ checked, className, id, name, onBlur, onChange, value }: RadioProps) {
  return (
    <div className={classNames("inline-flex relative", className)}>
      <input
        checked={checked}
        className="bg-white cursor-pointer outline outline-1 outline-gray-dark -outline-offset-1 p-12 rounded-full focus-within:outline-gray-darker hover:outline-gray-darker"
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        type="radio"
        value={value}
      />
      {checked && <Icon className="absolute left-4 pointer-events-none top-4" name="check" />}
    </div>
  );
}

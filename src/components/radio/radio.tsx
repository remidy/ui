import { ChangeEventHandler, FocusEventHandler } from "../../types/form.types";
import { Icon } from "../icon/icon";

interface Props {
  checked: boolean;
  id?: string;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  value: string;
}

export function Radio({ checked, id, name, onBlur, onChange, value }: Props) {
  return (
    <div className="inline-flex relative">
      <input
        checked={checked}
        className="bg-white cursor-pointer p-12 ring ring-gray-dark rounded-full"
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

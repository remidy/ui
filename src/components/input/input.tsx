import { ReactNode } from "react";
import { ChangeEventHandler, FocusEventHandler } from "../../types/form.types";
import { classNames } from "../../utilities/class-name.utilities";

interface Props {
  id?: string;
  leading?: ReactNode;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  trailing?: ReactNode;
  type: "password" | "text";
  value: string;
}

export function Input({ id, leading, name, onBlur, onChange, trailing, type, value }: Props) {
  return (
    <div className="bg-white border border-gray-dark flex overflow-hidden rounded-4">
      {leading}
      <input
        className={classNames("grow -m-px p-8", leading && "ml-0", trailing && "mr-0")}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        value={value}
      />
      {trailing}
    </div>
  );
}

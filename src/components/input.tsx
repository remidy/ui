import { ReactNode } from "react";
import { ChangeEventHandler, FocusEventHandler } from "../types/form.types";
import { classNames } from "../utilities/class-name.utilities";

export interface InputProps {
  className?: string;
  id?: string;
  leading?: ReactNode;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  trailing?: ReactNode;
  type: "password" | "text";
  value: string;
}

export function Input({ className, id, leading, name, onBlur, onChange, trailing, type, value }: InputProps) {
  return (
    <div
      className={classNames(
        "bg-white flex outline outline-1 outline-gray-dark -outline-offset-1 overflow-hidden rounded-4 focus-within:outline-gray-darker hover:outline-gray-darker",
        className
      )}
    >
      {leading}
      <input
        autoComplete="off"
        className="grow -outline-offset-1 p-12"
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

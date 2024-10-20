import { useState } from "react";
import { ChangeEventHandler, FocusEventHandler } from "../types/form.types";
import { Icon } from "./icon";
import { Input } from "./input";

export interface PasswordInputProps {
  className?: string;
  id?: string;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  value: string;
}

export function PasswordInput({ className, id, name, onBlur, onChange, value }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible(!visible);
  }

  return (
    <Input
      className={className}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      trailing={(
        <button
          className="p-12"
          onClick={handleClick}
          title={visible ? "Hide" : "Show"}
          type="button"
        >
          <Icon className="text-24" name={visible ? "eye-slash" : "eye"} />
        </button>
      )}
      type={visible ? "text" : "password"}
      value={value}
    />
  );
}

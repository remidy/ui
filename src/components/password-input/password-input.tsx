import { useState } from "react";
import { ChangeEventHandler, FocusEventHandler } from "../../types/form.types";
import { Icon } from "../icon/icon";
import { Input } from "../input/input";

interface Props {
  id?: string;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  value: string;
}

export function PasswordInput({ id, name, onBlur, onChange, value }: Props) {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible(!visible);
  }

  return (
    <Input
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      trailing={(
        <button
          className="-m-px ml-0 p-12"
          onClick={handleClick}
          title={visible ? "Hide password" : "Show password"}
          type="button"
        >
          <Icon name={visible ? "eye-slash" : "eye"} />
        </button>
      )}
      type={visible ? "text" : "password"}
      value={value}
    />
  );
}

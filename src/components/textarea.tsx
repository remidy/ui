import { ChangeEventHandler, FocusEventHandler } from "../types/form.types";
import { classNames } from "../utilities/class-name.utilities";

export interface TextareaProps {
  className?: string;
  autoGrow?: boolean;
  id?: string;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  rows?: number;
  value: string;
}

export function Textarea({ autoGrow, className, id, name, onBlur, onChange, rows, value }: TextareaProps) {
  return (
    <div
      className={classNames(
        "bg-white grid outline outline-1 outline-gray-dark -outline-offset-1 overflow-hidden rounded-4 focus-within:outline-gray-darker hover:outline-gray-darker",
        className
      )}
    >
      <textarea
        className="col-end-2 col-start-1 p-12 row-end-2 row-start-1"
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        rows={rows}
        value={value}
      />
      {autoGrow && (
        <div className="break-words col-end-2 col-start-1 invisible p-12 row-end-2 row-start-1 whitespace-pre-wrap">
          {value}
          {" "}
        </div>
      )}
    </div>
  );
}

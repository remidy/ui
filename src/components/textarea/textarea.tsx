import { ChangeEventHandler, FocusEventHandler } from "../../types/form.types";

interface Props {
  autoGrow?: boolean;
  id?: string;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  rows?: number;
  value: string;
}

export function Textarea({ autoGrow, id, name, onBlur, onChange, rows, value }: Props) {
  return (
    <div className="bg-white border border-gray-dark grid overflow-hidden rounded-4">
      <textarea
        className="col-end-2 col-start-1 -m-px p-8 row-end-2 row-start-1"
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        rows={rows}
        value={value}
      />
      {autoGrow && (
        <div className="break-words col-end-2 col-start-1 invisible -m-px p-8 row-end-2 row-start-1 whitespace-pre-wrap">
          {value}
          {" "}
        </div>
      )}
    </div>
  );
}

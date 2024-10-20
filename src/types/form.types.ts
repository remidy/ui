interface ChangeEvent<Type = string> {
  target: {
    checked?: boolean;
    name: string;
    value: Type;
  };
}

interface FocusEvent {
  target: {
    name: string;
  };
}

export interface OptionModel {
  text: string;
  value: string;
}

export type ChangeEventHandler<Type = string> = (event: ChangeEvent<Type>) => void;

export type FocusEventHandler = (event: FocusEvent) => void;

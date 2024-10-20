import { KeyboardEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/use-outside-click";
import { ChangeEventHandler, FocusEventHandler, OptionModel } from "../types/form.types";
import { classNames } from "../utilities/class-name.utilities";
import { Icon } from "./icon";
import { Option } from "./option";

export interface SelectProps {
  className?: string;
  clearable?: boolean;
  id: string;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  options: OptionModel[];
  value: string;
}

export function Select({ className, clearable, id, name, onBlur, onChange, options, value }: SelectProps) {
  const comboboxRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const selectedOption = useMemo(() => options.find((o) => o.value === value), [value]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  useOutsideClick(() => setExpanded(false), ref, expanded);

  useEffect(() => {
    listboxRef.current?.children[activeIndex === -1 ? 0 : activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleBlur() {
    onBlur?.({ target: { name } });
  }

  function handleClear(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setActiveIndex(-1);
    onChange({ target: { name, value: "" } });
    comboboxRef.current?.focus();
  }

  function handleClick() {
    setExpanded(!expanded);
    comboboxRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (expanded) {
      if (event.key === "Tab" || event.key === "Enter" || event.key === " ") {
        if (event.key !== "Tab") {
          event.preventDefault();
        }
        setExpanded(false);
        if (activeIndex !== -1) {
          const nextValue = options[activeIndex].value;
          if (nextValue !== value) {
            onChange({ target: { name, value: nextValue } });
          }
        }
      } else if (event.key === "Escape") {
        setExpanded(false);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (activeIndex < options.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
      }
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      setExpanded(true);
    }
  }

  function handleListboxClick(event: MouseEvent<HTMLElement>) {
    if (event.target instanceof HTMLElement) {
      const nextValue = event.target.dataset.value;
      if (nextValue !== undefined) {
        setActiveIndex(options.findIndex((o) => o.value === nextValue));
        setExpanded(false);
        if (nextValue !== value) {
          onChange({ target: { name, value: nextValue } });
        }
        comboboxRef.current?.focus();
      }
    }
  }

  return (
    <div className={classNames("relative select-none", className)} ref={ref}>
      <div
        className="bg-white cursor-pointer flex outline outline-1 outline-gray-dark -outline-offset-1 overflow-hidden rounded-4 focus-within:outline-gray-darker hover:outline-gray-darker"
        onBlur={handleBlur}
        onClick={handleClick}
      >
        <div className="grow p-12 truncate">
          {selectedOption?.text}
        </div>
        {clearable && value.length > 0 && (
          <button className="-outline-offset-1 p-12 shrink-0 text-24" onClick={handleClear} title="Clear">
            <Icon name="x" />
          </button>
        )}
        <button
          aria-activedescendant={activeIndex === -1 ? undefined : `${id}-option-${activeIndex}`}
          aria-controls={`${id}-listbox`}
          aria-expanded={expanded}
          className="-outline-offset-1 p-12 shrink-0 text-24"
          id={id}
          onKeyDown={handleKeyDown}
          ref={comboboxRef}
          role="combobox"
          title={expanded ? "Collapse" : "Expand"}
          type="button"
        >
          <Icon className={classNames(expanded && "rotate-180")} name="chevron-down" />
        </button>
      </div>
      <div
        className={classNames(
          "absolute bg-white max-h-240 mt-4 outline outline-1 outline-gray-dark -outline-offset-1 overflow-x-hidden overflow-y-auto rounded-4 w-full",
          !expanded && "hidden"
        )}
        id={`${id}-listbox`}
        onClick={handleListboxClick}
        ref={listboxRef}
        role="listbox"
      >
        {options.map((option, index) => (
          <Option
            active={index === activeIndex}
            id={`${id}-option-${index}`}
            key={option.value}
            selected={option.value === value}
            value={option.value}
          >
            {option.text}
          </Option>
        ))}
      </div>
    </div>
  );
}

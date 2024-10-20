import { KeyboardEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/use-outside-click";
import { ChangeEventHandler, FocusEventHandler, OptionModel } from "../types/form.types";
import { classNames } from "../utilities/class-name.utilities";
import { Badge } from "./badge";
import { Icon } from "./icon";
import { Option } from "./option";

export interface MultiSelectProps {
  className?: string;
  clearable?: boolean;
  id: string;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler<string[]>;
  options: OptionModel[];
  value: string[];
}

export function MultiSelect({ className, clearable, id, name, onBlur, onChange, options, value }: MultiSelectProps) {
  const comboboxRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const selectedOptions = useMemo(() => options.filter((o) => value.includes(o.value)), [value]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  useOutsideClick(() => setExpanded(false), ref, expanded);

  useEffect(() => {
    listboxRef.current?.children[activeIndex === -1 ? 0 : activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleBadgeClick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  function handleBlur() {
    onBlur?.({ target: { name } });
  }

  function handleClear(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setActiveIndex(-1);
    onChange({ target: { name, value: [] } });
    comboboxRef.current?.focus();
  }

  function handleClick() {
    setExpanded(!expanded);
    comboboxRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (expanded) {
      if (event.key === "Tab" || event.key === "Enter" || event.key === " ") {
        if (activeIndex !== -1) {
          setValue(options[activeIndex].value);
        }
        if (event.key === "Tab") {
          setExpanded(false);
        } else {
          event.preventDefault();
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
        setValue(nextValue);
        comboboxRef.current?.focus();
      }
    }
  }

  function handleRemove(nextValue: string) {
    onChange({ target: { name, value: value.filter((v) => v !== nextValue) } });
  }

  function setValue(nextValue: string) {
    if (!value.includes(nextValue)) {
      onChange({ target: { name, value: [...value, nextValue] } });
    }
  }

  return (
    <div className={classNames("relative select-none", className)} ref={ref}>
      <div
        className="bg-white cursor-pointer flex outline outline-1 outline-gray-dark -outline-offset-1 overflow-hidden rounded-4 focus-within:outline-gray-darker hover:outline-gray-darker"
        onBlur={handleBlur}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-wrap gap-8 grow p-12">
          {selectedOptions.map((option) => (
            <Badge
              color="neutral"
              key={option.value}
              onClick={handleBadgeClick}
              onRemove={() => handleRemove(option.value)}
            >
              {option.text}
            </Badge>
          ))}
        </div>
        {clearable && value.length > 0 && (
          <button className="p-12 shrink-0 text-24" onClick={handleClear} title="Clear">
            <Icon name="x" />
          </button>
        )}
        <button
          aria-activedescendant={activeIndex === -1 ? undefined : `${id}-option-${activeIndex}`}
          aria-controls={`${id}-listbox`}
          aria-expanded={expanded}
          className="p-12 shrink-0 text-24"
          id={id}
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
            selected={value.includes(option.value)}
            value={option.value}
          >
            {option.text}
          </Option>
        ))}
      </div>
    </div>
  );
}

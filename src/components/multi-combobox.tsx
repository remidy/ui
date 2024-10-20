import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/use-outside-click";
import { ChangeEventHandler, FocusEventHandler, OptionModel } from "../types/form.types";
import { classNames } from "../utilities/class-name.utilities";
import { Badge } from "./badge";
import { Icon } from "./icon";
import { Option } from "./option";

export interface MultiComboboxProps {
  className?: string;
  clearable?: boolean;
  id: string;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler<string[]>;
  options: OptionModel[];
  value: string[];
}

export function MultiCombobox({ className, clearable, id, name, onBlur, onChange, options, value }: MultiComboboxProps) {
  const comboboxRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const selectedOptions = useMemo(() => options.filter((o) => value.includes(o.value)), [value]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [comboboxValue, setComboboxValue] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  useOutsideClick(() => setExpanded(false), ref, expanded);

  useEffect(() => {
    listboxRef.current?.children[activeIndex === -1 ? 0 : activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleBadgeClick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  function handleBlur() {
    setComboboxValue("");
    onBlur?.({ target: { name } });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextComboboxValue = event.target.value;
    if (nextComboboxValue) {
      const lowerCaseValue = nextComboboxValue.toLowerCase();
      const nextFilteredOptions = options.filter((o) => o.text.toLowerCase().includes(lowerCaseValue));
      if (activeIndex > nextFilteredOptions.length - 1) {
        setActiveIndex(nextFilteredOptions.length > 0 ? nextFilteredOptions.length - 1 : 0);
      }
      setFilteredOptions(nextFilteredOptions);
    } else {
      setFilteredOptions(options);
    }
    setComboboxValue(nextComboboxValue);
    setExpanded(true);
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
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (expanded) {
        if (activeIndex < filteredOptions.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
      } else {
        setExpanded(true);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (expanded) {
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
      } else {
        setExpanded(true);
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (expanded) {
        setExpanded(false);
        if (activeIndex !== -1) {
          setValue(filteredOptions[activeIndex].value);
        }
      }
    } else if (event.key === "Tab" || event.key === "Escape") {
      setExpanded(false);
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

  function handleMouseDown(event: MouseEvent<HTMLElement>) {
    if (event.target instanceof HTMLElement && event.target.id !== id && document.activeElement?.id === id) {
      event.preventDefault();
    }
  }

  function handleRemove(nextValue: string) {
    onChange({ target: { name, value: value.filter((v) => v !== nextValue) } });
  }

  function setValue(nextValue: string) {
    if (!value.includes(nextValue)) {
      setComboboxValue("");
      onChange({ target: { name, value: [...value, nextValue] } });
    }
  }

  return (
    <div className={classNames("relative select-none", className)} onMouseDown={handleMouseDown} ref={ref}>
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
          <input
            aria-activedescendant={activeIndex === -1 ? undefined : `${id}-option-${activeIndex}`}
            aria-controls={`${id}-listbox`}
            aria-expanded={expanded}
            autoComplete="off"
            className="grow"
            id={id}
            onChange={handleChange}
            ref={comboboxRef}
            role="combobox"
            type="text"
            value={comboboxValue}
          />
        </div>
        {clearable && value.length > 0 && (
          <button className="p-12 shrink-0 text-24" onClick={handleClear} title="Clear">
            <Icon name="x" />
          </button>
        )}
        <div className="p-12 shrink-0 text-24">
          <Icon className={classNames(expanded && "rotate-180")} name="chevron-down" />
        </div>
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
        {filteredOptions.map((option, index) => (
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

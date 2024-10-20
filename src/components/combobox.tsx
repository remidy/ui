import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/use-outside-click";
import { ChangeEventHandler, FocusEventHandler, OptionModel } from "../types/form.types";
import { classNames } from "../utilities/class-name.utilities";
import { Icon } from "./icon";
import { Option } from "./option";

export interface ComboboxProps {
  className?: string;
  clearable?: boolean;
  id: string;
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  options: OptionModel[];
  value: string;
}

export function Combobox({ className, clearable, id, name, onBlur, onChange, options, value }: ComboboxProps) {
  const comboboxRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const selectedOption = useMemo(() => options.find((o) => o.value === value), [value]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [comboboxValue, setComboboxValue] = useState(selectedOption?.text ?? "");
  const [expanded, setExpanded] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  useOutsideClick(() => setExpanded(false), ref, expanded);

  useEffect(() => {
    listboxRef.current?.children[activeIndex === -1 ? 0 : activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    setComboboxValue(selectedOption?.text ?? "");
  }, [selectedOption]);

  function handleBlur() {
    setComboboxValue(selectedOption?.text ?? "");
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
    onChange({ target: { name, value: "" } });
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
        setExpanded(false);
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

  function setValue(nextValue: string) {
    if (nextValue !== value) {
      onChange({ target: { name, value: nextValue } });
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
        <input
          aria-activedescendant={activeIndex === -1 ? undefined : `${id}-option-${activeIndex}`}
          aria-controls={`${id}-listbox`}
          aria-expanded={expanded}
          autoComplete="off"
          className="grow -outline-offset-1 p-12"
          id={id}
          onChange={handleChange}
          ref={comboboxRef}
          role="combobox"
          type="text"
          value={comboboxValue}
        />
        {clearable && value.length > 0 && (
          <button className="-outline-offset-1 p-12 shrink-0 text-24" onClick={handleClear} title="Clear">
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

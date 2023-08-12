import { KeyboardEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { ChangeEventHandler, FocusEventHandler, SelectItemModel } from "../../types/form.types";
import { classNames } from "../../utilities/class-name.utilities";
import { Icon } from "../icon/icon";

interface Props {
  id: string;
  items: SelectItemModel[];
  name: string;
  onBlur?: FocusEventHandler;
  onChange: ChangeEventHandler;
  value: string;
}

export function Select({ id, items, name, onBlur, onChange, value }: Props) {
  const selectedItemIndex = useMemo(() => (
    items.findIndex((item) => item.value === value)
  ), [value]);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [listExpanded, setListExpanded] = useState(false);
  useOutsideClick(handleOutsideListClick, listRef, listExpanded);

  useEffect(() => {
    if (selectedItemIndex >= 0) {
      setActiveItemIndex(selectedItemIndex);
    }
  }, [selectedItemIndex]);

  useEffect(() => {
    listRef.current?.children[activeItemIndex].scrollIntoView({ block: "nearest" });
  }, [activeItemIndex]);

  function handleButtonBlur() {
    onBlur?.({ target: { name: name } });
  }

  function handleButtonClick() {
    setListExpanded(!listExpanded);
  }

  function handleButtonKeyDown(event: KeyboardEvent) {
    if (listExpanded) {
      if (event.key === " " || event.key === "Enter" || event.key === "Tab") {
        const activeItemValue = items[activeItemIndex].value;
        if (activeItemValue !== value) {
          onChange({ target: { name, value: activeItemValue } });
        }
        if (event.key === "Tab") {
          setListExpanded(false);
        }
      } else if (event.key === "ArrowDown") {
        if (activeItemIndex < items.length - 1) {
          setActiveItemIndex(activeItemIndex + 1);
        }
      } else if (event.key === "ArrowUp") {
        if (activeItemIndex > 0) {
          setActiveItemIndex(activeItemIndex - 1);
        }
      } else if (event.key === "Escape") {
        setListExpanded(false);
      }
    } else if (event.key === " " || event.key === "ArrowDown" || event.key === "ArrowUp") {
      setListExpanded(true);
    }
  }

  function handleListClick(event: MouseEvent<HTMLUListElement>) {
    const nextValue = (event.target as HTMLLIElement).dataset.value;
    if (nextValue !== undefined && nextValue !== value) {
      onChange({ target: { name, value: nextValue } });
      setListExpanded(false);
    }
  }

  function handleOutsideListClick() {
    setListExpanded(false);
  }

  return (
    <div className="relative">
      <div
        className="bg-white border border-gray-dark cursor-pointer flex overflow-hidden rounded-4"
        onClick={handleButtonClick}
      >
        <button
          aria-activedescendant={`${id}-item-${activeItemIndex}`}
          aria-controls={`${id}-list`}
          aria-expanded={listExpanded}
          className="grow -m-px mr-0 p-8 truncate"
          id={id}
          onBlur={handleButtonBlur}
          onKeyDown={handleButtonKeyDown}
          role="combobox"
          type="button"
        >
          {selectedItemIndex >= 0 && items[selectedItemIndex].text}
        </button>
        <div className="-m-px ml-0 p-12 shrink-0">
          <Icon name="chevron-down" />
        </div>
      </div>
      <div
        className={classNames(
          "absolute bg-white border border-gray-dark max-h-320 mt-4 overflow-x-hidden overflow-y-auto rounded-4 w-full",
          !listExpanded && "hidden"
        )}
      >
        <ul
          className="-m-px select-none"
          id={`${id}-list`}
          onClick={handleListClick}
          ref={listRef}
          role="listbox"
        >
          {items.map((item, index) => (
            <li
              aria-selected={item.value === value}
              className={classNames(
                "p-8 hover:bg-gray-lightest",
                (index === activeItemIndex || index === selectedItemIndex) && "bg-gray-lightest"
              )}
              data-value={item.value}
              id={`${id}-item-${index}`}
              key={item.value}
              role="option"
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

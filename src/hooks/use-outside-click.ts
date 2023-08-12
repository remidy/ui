import { RefObject, useEffect } from "react";

export function useOutsideClick(onOutsideClick: () => void, ref: RefObject<HTMLElement>, active = true) {
  useEffect(() => {
    if (active) {
      setTimeout(add);

      return remove;
    }
  }, [active]);

  function add() {
    document.addEventListener("click", handleDocumentClick);
  }

  function handleDocumentClick(event: MouseEvent) {
    if (!ref.current?.contains(event.target as Node)) {
      remove();
      onOutsideClick();
    }
  }

  function remove() {
    document.removeEventListener("click", handleDocumentClick);
  }
}

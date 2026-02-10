import { useCallback, useMemo, useReducer } from "react";
import type { Option } from "../components/Select.js";

type OptionMapItem = Option & {
  previous: OptionMapItem | undefined;
  next: OptionMapItem | undefined;
  index: number;
};

/**
 * A specialized `Map` implementation for managing a list of options.
 * It maintains relationships between options (next/previous) and their indices
 * to facilitate efficient navigation and windowed rendering.
 *
 * @internal
 */
export class OptionMap extends Map<string, OptionMapItem> {
  readonly first: OptionMapItem | undefined;

  constructor(options: readonly Option[]) {
    const items: [string, OptionMapItem][] = [];
    let firstItem: OptionMapItem | undefined;
    let previous: OptionMapItem | undefined;
    let index = 0;

    for (const option of options) {
      const item: OptionMapItem = {
        ...option,
        previous,
        next: undefined,
        index,
      };

      if (previous) {
        previous.next = item;
      }

      firstItem ||= item;

      items.push([option.value, item]);
      index++;
      previous = item;
    }

    super(items);
    this.first = firstItem;
  }

  getNext(value: string): OptionMapItem | undefined {
    const item = this.get(value);
    return item?.next;
  }

  getPrevious(value: string): OptionMapItem | undefined {
    const item = this.get(value);
    return item?.previous;
  }

  getIndex(value: string): number {
    const item = this.get(value);
    return item?.index ?? -1;
  }

  at(index: number): OptionMapItem | undefined {
    for (const item of this.values()) {
      if (item.index === index) {
        return item;
      }
    }
    return undefined;
  }
}

interface State {
  readonly visibleOptionCount: number;
  readonly options: OptionMap;
  readonly focusedValue: string;
  readonly value: string;
  readonly previousValue: string;
}

type Action =
  | {
      type: "focus next option";
    }
  | {
      type: "focus previous option";
    }
  | {
      type: "select option";
      value: string;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "focus next option": {
      const nextOption = state.options.getNext(state.focusedValue);

      if (!nextOption) {
        return state;
      }

      return {
        ...state,
        focusedValue: nextOption.value,
      };
    }

    case "focus previous option": {
      const previousOption = state.options.getPrevious(state.focusedValue);

      if (!previousOption) {
        return state;
      }

      return {
        ...state,
        focusedValue: previousOption.value,
      };
    }

    case "select option": {
      return {
        ...state,
        value: action.value,
      };
    }
  }
};

/**
 * The state object returned by the {@link useSelectState} hook.
 * Contains both current state values and methods to manipulate that state.
 *
 * @public
 */
export interface SelectState {
  /**
   * A subset of the original options list, windowed around the currently focused option.
   * This should be used for rendering the visible portion of the select list.
   */
  readonly visibleOptions: readonly Option[];

  /**
   * The value of the option that currently has focus (hovered/selected by cursor).
   */
  readonly focusedValue: string;

  /**
   * The value of the currently selected option.
   */
  readonly value: string;

  /**
   * A function to move focus to the next available option in the list.
   * Does nothing if the end of the list is reached.
   */
  readonly focusNextOption: () => void;

  /**
   * A function to move focus to the previous available option in the list.
   * Does nothing if the start of the list is reached.
   */
  readonly focusPreviousOption: () => void;

  /**
   * A function that sets the currently focused value as the selected value.
   * Triggers the `onChange` callback if provided.
   */
  readonly selectFocusedOption: () => void;
}

/**
 * Configuration options for the {@link useSelectState} hook.
 *
 * @public
 */
export interface UseSelectStateOptions {
  /**
   * The maximum number of options to be included in `visibleOptions`.
   */
  visibleOptionCount: number;

  /**
   * The source array of options to be managed.
   */
  options: readonly Option[];

  /**
   * The value that should be selected by default on initial render.
   */
  defaultValue?: string;

  /**
   * A callback function invoked when a new option is selected.
   *
   * @param value - The value of the selected option.
   */
  onChange?: (value: string) => void;
}

/**
 * A custom hook that manages the internal state of a Select component.
 *
 * @remarks
 * This hook handles focus tracking, selection state, and viewport windowing
 * (calculating which options should be visible). It uses a reducer for complex
 * state transitions.
 *
 * @param options - Configuration including options list and initial values.
 * @returns An object containing the current {@link SelectState}.
 *
 * @public
 */
export function useSelectState({
  visibleOptionCount,
  options: rawOptions,
  defaultValue,
  onChange,
}: UseSelectStateOptions): SelectState {
  const [state, dispatch] = useReducer(reducer, {
    visibleOptionCount,
    options: new OptionMap(rawOptions),
    focusedValue: rawOptions[0]?.value ?? "",
    value: defaultValue ?? "",
    previousValue: "",
  });

  const visibleOptions = useMemo(() => {
    const options: Option[] = [];
    const indexOfFocusedOption = state.options.getIndex(state.focusedValue);
    const start = Math.max(
      0,
      Math.min(
        indexOfFocusedOption - Math.floor(visibleOptionCount / 2),
        state.options.size - visibleOptionCount,
      ),
    );
    const end = Math.min(start + visibleOptionCount, state.options.size);

    for (let index = start; index < end; index++) {
      const option = state.options.at(index);

      if (option) {
        options.push(option);
      }
    }

    return options;
  }, [state.options, state.focusedValue, visibleOptionCount]);

  const focusNextOption = useCallback(() => {
    dispatch({
      type: "focus next option",
    });
  }, []);

  const focusPreviousOption = useCallback(() => {
    dispatch({
      type: "focus previous option",
    });
  }, []);

  const selectFocusedOption = useCallback(() => {
    if (state.focusedValue === state.value) {
      return;
    }

    dispatch({
      type: "select option",
      value: state.focusedValue,
    });

    onChange?.(state.focusedValue);
  }, [state.focusedValue, state.value, onChange]);

  return {
    visibleOptions,
    focusedValue: state.focusedValue,
    value: state.value,
    focusNextOption,
    focusPreviousOption,
    selectFocusedOption,
  };
}

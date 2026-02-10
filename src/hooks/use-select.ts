import { useCallback } from "react";
import { useInput, type Key } from "tinky";
import type { SelectState } from "./use-select-state.js";

/**
 * Configuration options for the {@link useSelect} hook.
 *
 * @public
 */
export interface UseSelectOptions {
  /**
   * If true, the hook will not respond to any keyboard input.
   */
  isDisabled: boolean;

  /**
   * The current state of the select component, as returned by {@link useSelectState}.
   * This hook uses the state's navigation and selection functions.
   */
  state: SelectState;
}

/**
 * A custom hook that attaches keyboard event listeners for Select component navigation.
 *
 * @remarks
 * This hook uses Tinky's `useInput` to listen for:
 * - `DownArrow`: Moves focus to the next option.
 * - `UpArrow`: Moves focus to the previous option.
 * - `Return/Enter`: Selects the currently focused option.
 *
 * Keyboard listeners are only active when `isDisabled` is false.
 *
 * @param options - Configuration for input handling and state interaction.
 *
 * @public
 */
export function useSelect({ isDisabled, state }: UseSelectOptions): void {
  const { focusNextOption, focusPreviousOption, selectFocusedOption } = state;

  const handleInput = useCallback(
    (_input: string, key: Key) => {
      if (key.downArrow) {
        focusNextOption();
        return;
      }

      if (key.upArrow) {
        focusPreviousOption();
        return;
      }

      if (key.return) {
        selectFocusedOption();
      }
    },
    [focusNextOption, focusPreviousOption, selectFocusedOption],
  );

  useInput(handleInput, { isActive: !isDisabled });
}

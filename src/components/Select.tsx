import { type JSX, type ReactNode } from "react";
import { Box, Text } from "tinky";
import { useComponentTheme } from "tinky-theme";
import { defaultSelectTheme } from "../themes/select-theme.js";

import { SelectOption } from "./SelectOption.js";
import { useSelectState } from "../hooks/use-select-state.js";
import { useSelect } from "../hooks/use-select.js";

/**
 * Represents an individual option in the Select component.
 *
 * @public
 */
export interface Option {
  /**
   * The display text for the option as shown in the list.
   */
  label: string;
  /**
   * The unique identifier for the option. This value is returned via `onChange`.
   */
  value: string;
}

/**
 * Properties for the {@link Select} component.
 *
 * @public
 */
export interface SelectProps {
  /**
   * Indicates whether the select component is interactive.
   * When true, keyboard navigation and selection are disabled.
   *
   * @defaultValue `false`
   */
  readonly isDisabled?: boolean;

  /**
   * The number of options to display simultaneously in the viewport.
   * If the total number of options exceeds this value, the list will scroll.
   *
   * @defaultValue `5`
   */
  readonly visibleOptionCount?: number;

  /**
   * A string to search for within each option's label. Matches will be
   * visually highlighted using the theme's `highlightedText` style.
   */
  readonly highlightText?: string;

  /**
   * The complete list of options available for selection.
   */
  readonly options: Option[];

  /**
   * The initially selected value. Must match the `value` property of one of the `options`.
   */
  readonly defaultValue?: string;

  /**
   * Event handler triggered when a user selects an option.
   *
   * @param value - The value of the newly selected option.
   */
  readonly onChange?: (value: string) => void;
}

/**
 * A highly customizable Select component for Tinky-based CLIs.
 *
 * @remarks
 * This component handles rendering a list of options with support for:
 * - Keyboard navigation (Up/Down Arrows)
 * - Selection (Enter/Return)
 * - Automatic scrolling for large lists
 * - Text highlighting
 * - Themable indicators and labels
 *
 * @example
 * ```tsx
 * import { Select } from 'tinky-select';
 *
 * const MyComponent = () => (
 *   <Select
 *     options={[
 *       { label: 'Red', value: 'red' },
 *       { label: 'Green', value: 'green' },
 *       { label: 'Blue', value: 'blue' }
 *     ]}
 *     onChange={(value) => console.log('Selected color:', value)}
 *     visibleOptionCount={3}
 *   />
 * );
 * ```
 *
 * @param props - The properties for the Select component.
 * @returns A JSX element representing the rendered select list.
 *
 * @public
 */
export function Select({
  isDisabled = false,
  visibleOptionCount = 5,
  highlightText,
  options,
  defaultValue,
  onChange,
}: SelectProps): JSX.Element {
  const state = useSelectState({
    visibleOptionCount,
    options,
    defaultValue,
    onChange,
  });

  useSelect({ isDisabled, state });

  const { styles } = useComponentTheme("Select", defaultSelectTheme, {
    isFocused: false,
    isSelected: false,
  });

  return (
    <Box {...styles.container}>
      {state.visibleOptions.map((option) => {
        let label: ReactNode = option.label;

        if (highlightText && option.label.includes(highlightText)) {
          const index = option.label.indexOf(highlightText);

          label = (
            <>
              {option.label.slice(0, index)}
              <Text {...styles.highlightedText}>{highlightText}</Text>
              {option.label.slice(index + highlightText.length)}
            </>
          );
        }

        return (
          <SelectOption
            key={option.value}
            isFocused={!isDisabled && state.focusedValue === option.value}
            isSelected={state.value === option.value}
          >
            {label}
          </SelectOption>
        );
      })}
    </Box>
  );
}

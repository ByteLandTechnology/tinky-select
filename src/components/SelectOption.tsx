import { type JSX, type ReactNode } from "react";
import { Box, Text } from "tinky";
import { useComponentTheme } from "tinky-theme";
import {
  defaultSelectTheme,
  type SelectThemeProps,
} from "../themes/select-theme.js";

/**
 * Properties for the {@link SelectOption} component.
 *
 * @internal
 */
export interface SelectOptionProps {
  /**
   * Indicates if the option is the current target of keyboard navigation.
   * Typically rendered with a focus indicator (e.g., a cursor prefix).
   */
  readonly isFocused: boolean;

  /**
   * Indicates if the option is the currently chosen value in the select component.
   * Typically rendered with a selection indicator (e.g., a checkmark suffix).
   */
  readonly isSelected: boolean;

  /**
   * The content to be rendered as the option's label.
   * Can be a string or a React node (e.g., for highlighted text).
   */
  readonly children: ReactNode;
}

/**
 * A internal component representing a single row in the selection list.
 *
 * @remarks
 * This component responsible for applying theme-based styles and rendering
 * focus/selection indicators based on the provided state.
 *
 * @param props - The properties for the SelectOption component.
 * @returns A JSX element representing the rendered option row.
 *
 * @internal
 */
export function SelectOption({
  isFocused,
  isSelected,
  children,
}: SelectOptionProps): JSX.Element {
  const { styles } = useComponentTheme<SelectThemeProps>(
    "Select",
    defaultSelectTheme,
    {
      isFocused,
      isSelected,
    },
  );

  return (
    <Box {...styles.option}>
      {isFocused && <Text {...styles.focusIndicator}>❯</Text>}

      <Text {...styles.label}>{children}</Text>

      {isSelected && <Text {...styles.selectedIndicator}>✔</Text>}
    </Box>
  );
}

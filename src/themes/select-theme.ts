import { type BoxProps, type TextProps } from "tinky";
import { type ComponentTheme } from "tinky-theme";

/**
 * Properties consumed by the {@link SelectTheme}'s style functions to determine
 * conditional styling based on the component's state.
 *
 * @public
 */
export interface SelectThemeProps {
  /**
   * Indicates if the specific element (typically an option) is currently focused
   * by the user's keyboard navigation.
   */
  readonly isFocused?: boolean;

  /**
   * Indicates if the specific element is the currently selected value.
   */
  readonly isSelected?: boolean;
}

/**
 * The default theme definition for the {@link Select} component.
 *
 * @remarks
 * This theme defines styles for:
 * - `container`: The outer wrapper of the select list.
 * - `option`: Individual option rows.
 * - `selectedIndicator`: The icon/text shown for selected options.
 * - `focusIndicator`: The cursor/prefix shown for the focused option.
 * - `label`: The text content of the option.
 * - `highlightedText`: Styling for text matches when searching/highlighting.
 *
 * @public
 */
export const defaultSelectTheme = {
  styles: {
    container: (): BoxProps => ({
      flexDirection: "column",
    }),
    option: ({ isFocused }: SelectThemeProps): BoxProps => ({
      gap: 1,
      paddingLeft: isFocused ? 0 : 2,
    }),
    selectedIndicator: (): TextProps => ({
      color: "green",
    }),
    focusIndicator: (): TextProps => ({
      color: "blue",
    }),
    label({ isFocused, isSelected }: SelectThemeProps): TextProps {
      let color: string | undefined;

      if (isSelected) {
        color = "green";
      }

      if (isFocused) {
        color = "blue";
      }

      return { color };
    },
    highlightedText: (): TextProps => ({
      bold: true,
    }),
  },
} satisfies ComponentTheme<SelectThemeProps>;

export type SelectTheme = typeof defaultSelectTheme;

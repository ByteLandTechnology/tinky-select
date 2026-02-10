/**
 * A Select component for Tinky, built with React for high-performance terminal user interfaces.
 *
 * @remarks
 * This package provides a highly customizable selection list component, including
 * hooks for state management and keyboard navigation, and a robust theming system.
 *
 * @packageDocumentation
 */

export { Select, type SelectProps, type Option } from "./components/Select.js";
export {
  SelectOption,
  type SelectOptionProps,
} from "./components/SelectOption.js";
export { useSelect, type UseSelectOptions } from "./hooks/use-select.js";
export {
  useSelectState,
  type SelectState,
  type UseSelectStateOptions,
} from "./hooks/use-select-state.js";
export {
  defaultSelectTheme,
  type SelectTheme,
  type SelectThemeProps,
} from "./themes/select-theme.js";

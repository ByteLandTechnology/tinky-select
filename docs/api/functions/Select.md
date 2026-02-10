[**tinky-select**](../README.md)

---

[tinky-select](../globals.md) / Select

# Function: Select()

> **Select**(`props`): `Element`

A highly customizable Select component for Tinky-based CLIs.

## Parameters

### props

[`SelectProps`](../interfaces/SelectProps.md)

The properties for the Select component.

## Returns

`Element`

A JSX element representing the rendered select list.

## Remarks

This component handles rendering a list of options with support for:

- Keyboard navigation (Up/Down Arrows)
- Selection (Enter/Return)
- Automatic scrolling for large lists
- Text highlighting
- Themable indicators and labels

## Example

```tsx
import { Select } from "tinky-select";

const MyComponent = () => (
  <Select
    options={[
      { label: "Red", value: "red" },
      { label: "Green", value: "green" },
      { label: "Blue", value: "blue" },
    ]}
    onChange={(value) => console.log("Selected color:", value)}
    visibleOptionCount={3}
  />
);
```

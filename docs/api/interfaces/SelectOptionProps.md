[**tinky-select**](../README.md)

---

[tinky-select](../globals.md) / SelectOptionProps

# Interface: SelectOptionProps

**`Internal`**

Properties for the [SelectOption](../functions/SelectOption.md) component.

## Properties

### children

> `readonly` **children**: `ReactNode`

The content to be rendered as the option's label.
Can be a string or a React node (e.g., for highlighted text).

---

### isFocused

> `readonly` **isFocused**: `boolean`

Indicates if the option is the current target of keyboard navigation.
Typically rendered with a focus indicator (e.g., a cursor prefix).

---

### isSelected

> `readonly` **isSelected**: `boolean`

Indicates if the option is the currently chosen value in the select component.
Typically rendered with a selection indicator (e.g., a checkmark suffix).

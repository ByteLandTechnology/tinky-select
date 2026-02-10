[**tinky-select**](../README.md)

---

[tinky-select](../globals.md) / useSelect

# Function: useSelect()

> **useSelect**(`options`): `void`

A custom hook that attaches keyboard event listeners for Select component navigation.

## Parameters

### options

[`UseSelectOptions`](../interfaces/UseSelectOptions.md)

Configuration for input handling and state interaction.

## Returns

`void`

## Remarks

This hook uses Tinky's `useInput` to listen for:

- `DownArrow`: Moves focus to the next option.
- `UpArrow`: Moves focus to the previous option.
- `Return/Enter`: Selects the currently focused option.

Keyboard listeners are only active when `isDisabled` is false.

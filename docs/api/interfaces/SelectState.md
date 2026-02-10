[**tinky-select**](../README.md)

---

[tinky-select](../globals.md) / SelectState

# Interface: SelectState

The state object returned by the [useSelectState](../functions/useSelectState.md) hook.
Contains both current state values and methods to manipulate that state.

## Properties

### focusedValue

> `readonly` **focusedValue**: `string`

The value of the option that currently has focus (hovered/selected by cursor).

---

### focusNextOption()

> `readonly` **focusNextOption**: () => `void`

A function to move focus to the next available option in the list.
Does nothing if the end of the list is reached.

#### Returns

`void`

---

### focusPreviousOption()

> `readonly` **focusPreviousOption**: () => `void`

A function to move focus to the previous available option in the list.
Does nothing if the start of the list is reached.

#### Returns

`void`

---

### selectFocusedOption()

> `readonly` **selectFocusedOption**: () => `void`

A function that sets the currently focused value as the selected value.
Triggers the `onChange` callback if provided.

#### Returns

`void`

---

### value

> `readonly` **value**: `string`

The value of the currently selected option.

---

### visibleOptions

> `readonly` **visibleOptions**: readonly [`Option`](Option.md)[]

A subset of the original options list, windowed around the currently focused option.
This should be used for rendering the visible portion of the select list.

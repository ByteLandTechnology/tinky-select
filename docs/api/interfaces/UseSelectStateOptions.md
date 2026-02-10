[**tinky-select**](../README.md)

---

[tinky-select](../globals.md) / UseSelectStateOptions

# Interface: UseSelectStateOptions

Configuration options for the [useSelectState](../functions/useSelectState.md) hook.

## Properties

### defaultValue?

> `optional` **defaultValue**: `string`

The value that should be selected by default on initial render.

---

### onChange()?

> `optional` **onChange**: (`value`) => `void`

A callback function invoked when a new option is selected.

#### Parameters

##### value

`string`

The value of the selected option.

#### Returns

`void`

---

### options

> **options**: readonly [`Option`](Option.md)[]

The source array of options to be managed.

---

### visibleOptionCount

> **visibleOptionCount**: `number`

The maximum number of options to be included in `visibleOptions`.

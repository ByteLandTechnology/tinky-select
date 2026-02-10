[**tinky-select**](../README.md)

---

[tinky-select](../globals.md) / SelectProps

# Interface: SelectProps

Properties for the [Select](../functions/Select.md) component.

## Properties

### defaultValue?

> `readonly` `optional` **defaultValue**: `string`

The initially selected value. Must match the `value` property of one of the `options`.

---

### highlightText?

> `readonly` `optional` **highlightText**: `string`

A string to search for within each option's label. Matches will be
visually highlighted using the theme's `highlightedText` style.

---

### isDisabled?

> `readonly` `optional` **isDisabled**: `boolean`

Indicates whether the select component is interactive.
When true, keyboard navigation and selection are disabled.

#### Default Value

`false`

---

### onChange()?

> `readonly` `optional` **onChange**: (`value`) => `void`

Event handler triggered when a user selects an option.

#### Parameters

##### value

`string`

The value of the newly selected option.

#### Returns

`void`

---

### options

> `readonly` **options**: [`Option`](Option.md)[]

The complete list of options available for selection.

---

### visibleOptionCount?

> `readonly` `optional` **visibleOptionCount**: `number`

The number of options to display simultaneously in the viewport.
If the total number of options exceeds this value, the list will scroll.

#### Default Value

`5`

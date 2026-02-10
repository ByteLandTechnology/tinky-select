[**tinky-select**](../README.md)

---

[tinky-select](../globals.md) / defaultSelectTheme

# Variable: defaultSelectTheme

> `const` **defaultSelectTheme**: `object`

The default theme definition for the [Select](../functions/Select.md) component.

## Type Declaration

### styles

> **styles**: `object`

#### styles.container()

> **container**: () => `BoxProps`

##### Returns

`BoxProps`

#### styles.focusIndicator()

> **focusIndicator**: () => `TextProps`

##### Returns

`TextProps`

#### styles.highlightedText()

> **highlightedText**: () => `TextProps`

##### Returns

`TextProps`

#### styles.option()

> **option**: (`__namedParameters`) => `BoxProps`

##### Parameters

###### \_\_namedParameters

[`SelectThemeProps`](../interfaces/SelectThemeProps.md)

##### Returns

`BoxProps`

#### styles.selectedIndicator()

> **selectedIndicator**: () => `TextProps`

##### Returns

`TextProps`

#### styles.label()

> **label**(`__namedParameters`): `TextProps`

##### Parameters

###### \_\_namedParameters

[`SelectThemeProps`](../interfaces/SelectThemeProps.md)

##### Returns

`TextProps`

## Remarks

This theme defines styles for:

- `container`: The outer wrapper of the select list.
- `option`: Individual option rows.
- `selectedIndicator`: The icon/text shown for selected options.
- `focusIndicator`: The cursor/prefix shown for the focused option.
- `label`: The text content of the option.
- `highlightedText`: Styling for text matches when searching/highlighting.

**tinky-select**

---

# tinky-select

[![npm version](https://img.shields.io/npm/v/tinky-select.svg)](https://www.npmjs.com/package/tinky-select)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A highly flexible and customizable **Select** component for [Tinky](https://github.com/ByteLandTechnology/tinky). Built with React and designed specifically for modern, high-performance command-line interfaces.

## 🌟 Features

- 🎹 **Keyboard Navigation**: Full support for Up/Down arrow keys and Enter/Return.
- 📜 **Automatic Scrolling**: Smoothly handles long lists by windowing visible options.
- 🎨 **Fully Themable**: Integrated with `tinky-theme` for deep visual customization.
- 🔍 **Text Highlighting**: Built-in support for highlighting search terms within labels.
- 🛠️ **Headless Hooks**: Exported `useSelectState` and `useSelect` for building custom selection UI.
- 📦 **TypeScript First**: Written in TypeScript with exhaustive TSDoc documentation.

## 🚀 Installation

```bash
npm install tinky-select
```

## 📖 Usage

### Basic Example

```tsx
import React from "react";
import { render } from "tinky";
import { Select } from "tinky-select";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
  { label: "Option 5", value: "5" },
  { label: "Option 6", value: "6" },
];

const App = () => (
  <Select
    options={options}
    onChange={(value) => console.log("Selected:", value)}
    visibleOptionCount={4}
  />
);

render(<App />);
```

### With Highlighting

Useful for filtering or search scenarios.

```tsx
<Select options={options} highlightText="Option 2" />
```

## 🔧 API Reference

### `Select` Component

| Prop                 | Type                      | Default      | Description                        |
| :------------------- | :------------------------ | :----------- | :--------------------------------- |
| `options`            | `Option[]`                | **Required** | The list of choices to display.    |
| `onChange`           | `(value: string) => void` | -            | Callback triggered on selection.   |
| `defaultValue`       | `string`                  | -            | Initially selected value.          |
| `visibleOptionCount` | `number`                  | `5`          | How many items to show at once.    |
| `isDisabled`         | `boolean`                 | `false`      | Disables user interaction.         |
| `highlightText`      | `string`                  | -            | Text to bold within option labels. |

### `Option` Type

```ts
interface Option {
  label: string; // Display text
  value: string; // Unique identifier
}
```

## 🎨 Theming

tinky-select uses `tinky-theme`. You can wrap your app in a `ThemeProvider` and override the `Select` styles:

```ts
const myTheme = {
  Select: {
    styles: {
      label: ({ isFocused, isSelected }) => ({
        color: isSelected ? "cyan" : isFocused ? "magenta" : "white",
      }),
      focusIndicator: () => ({
        color: "magenta",
      }),
    },
  },
};
```

## 🛠️ Advanced: Headless Hooks

If you want to build your own Select component but keep the logic, use our hooks:

1. `useSelectState`: Manages the index, focus, and visible window of options.
2. `useSelect`: Attaches keyboard listeners to the state.

## 📄 License

MIT © [ByteLand Technology Limited](https://github.com/ByteLandTechnology)

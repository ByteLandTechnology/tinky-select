[**tinky-select**](../README.md)

---

[tinky-select](../globals.md) / useSelectState

# Function: useSelectState()

> **useSelectState**(`options`): [`SelectState`](../interfaces/SelectState.md)

A custom hook that manages the internal state of a Select component.

## Parameters

### options

[`UseSelectStateOptions`](../interfaces/UseSelectStateOptions.md)

Configuration including options list and initial values.

## Returns

[`SelectState`](../interfaces/SelectState.md)

An object containing the current [SelectState](../interfaces/SelectState.md).

## Remarks

This hook handles focus tracking, selection state, and viewport windowing
(calculating which options should be visible). It uses a reducer for complex
state transitions.

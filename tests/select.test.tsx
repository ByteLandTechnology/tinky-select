import { test, expect, vi } from "vitest";
import { render } from "tinky-test";
import delay from "delay";
import chalk from "ansis";
import { Select } from "../src/index.js";
import { OptionMap } from "../src/hooks/use-select-state.js";
import * as index from "../src/index.js";

const figures = {
  pointer: "❯",
  tick: "✔",
};

const options = [
  {
    label: "Red",
    value: "red",
  },
  {
    label: "Green",
    value: "green",
  },
  {
    label: "Yellow",
    value: "yellow",
  },
  {
    label: "Blue",
    value: "blue",
  },
  {
    label: "Magenta",
    value: "magenta",
  },
  {
    label: "Cyan",
    value: "cyan",
  },
  {
    label: "White",
    value: "white",
  },
];

const arrowDown = "\u001B[B";
const arrowUp = "\u001B[A";
const enter = "\r";

test("limit number of visible options", () => {
  const { lastFrame } = render(
    <Select visibleOptionCount={6} options={options} />,
  );

  expect(lastFrame()).toBe(
    [
      `${chalk.blue(figures.pointer)} ${chalk.blue("Red")}`,
      "  Green",
      "  Yellow",
      "  Blue",
      "  Magenta",
      "  Cyan",
    ].join("\n"),
  );
});

test("focus next option", async () => {
  const { lastFrame, stdin } = render(<Select options={options} />);

  await delay(50);
  stdin.emit("data", arrowDown);
  await delay(50);

  expect(lastFrame()).toBe(
    [
      "  Red",
      `${chalk.blue(figures.pointer)} ${chalk.blue("Green")}`,
      "  Yellow",
      "  Blue",
      "  Magenta",
    ].join("\n"),
  );
});

test("focus next option and scroll down", async () => {
  const { lastFrame, stdin } = render(<Select options={options} />);

  for (let press = 0; press < 6; press++) {
    await delay(50);
    stdin.emit("data", arrowDown);
    await delay(50);
  }

  expect(lastFrame()).toBe(
    [
      "  Yellow",
      "  Blue",
      "  Magenta",
      "  Cyan",
      `${chalk.blue(figures.pointer)} ${chalk.blue("White")}`,
    ].join("\n"),
  );
});

test("don't scroll down when focused option is the last one", async () => {
  const { lastFrame, stdin } = render(<Select options={options} />);

  for (let press = 0; press < 7; press++) {
    await delay(50);
    stdin.emit("data", arrowDown);
    await delay(50);
  }

  expect(lastFrame()).toBe(
    [
      "  Yellow",
      "  Blue",
      "  Magenta",
      "  Cyan",
      `${chalk.blue(figures.pointer)} ${chalk.blue("White")}`,
    ].join("\n"),
  );
});

test("focus previous option", async () => {
  const { lastFrame, stdin } = render(<Select options={options} />);

  await delay(50);
  stdin.emit("data", arrowDown);
  await delay(50);

  expect(lastFrame()).toBe(
    [
      "  Red",
      `${chalk.blue(figures.pointer)} ${chalk.blue("Green")}`,
      "  Yellow",
      "  Blue",
      "  Magenta",
    ].join("\n"),
  );

  await delay(50);
  stdin.emit("data", arrowUp);
  await delay(50);

  expect(lastFrame()).toBe(
    [
      `${chalk.blue(figures.pointer)} ${chalk.blue("Red")}`,
      "  Green",
      "  Yellow",
      "  Blue",
      "  Magenta",
    ].join("\n"),
  );
});

test("focus previous option and scroll up", async () => {
  const { lastFrame, stdin } = render(<Select options={options} />);

  for (let press = 0; press < 6; press++) {
    await delay(50);
    stdin.emit("data", arrowDown);
    await delay(50);
  }

  expect(lastFrame()).toBe(
    [
      "  Yellow",
      "  Blue",
      "  Magenta",
      "  Cyan",
      `${chalk.blue(figures.pointer)} ${chalk.blue("White")}`,
    ].join("\n"),
  );

  for (let press = 0; press < 6; press++) {
    await delay(50);
    stdin.emit("data", arrowUp);
    await delay(50);
  }

  expect(lastFrame()).toBe(
    [
      `${chalk.blue(figures.pointer)} ${chalk.blue("Red")}`,
      "  Green",
      "  Yellow",
      "  Blue",
      "  Magenta",
    ].join("\n"),
  );
});

test("don't scroll up when focused option is the first one", async () => {
  const { lastFrame, stdin } = render(<Select options={options} />);

  for (let press = 0; press < 6; press++) {
    await delay(50);
    stdin.emit("data", arrowDown);
    await delay(50);
  }

  expect(lastFrame()).toBe(
    [
      "  Yellow",
      "  Blue",
      "  Magenta",
      "  Cyan",
      `${chalk.blue(figures.pointer)} ${chalk.blue("White")}`,
    ].join("\n"),
  );

  for (let press = 0; press < 7; press++) {
    await delay(50);
    stdin.emit("data", arrowUp);
    await delay(50);
  }

  expect(lastFrame()).toBe(
    [
      `${chalk.blue(figures.pointer)} ${chalk.blue("Red")}`,
      "  Green",
      "  Yellow",
      "  Blue",
      "  Magenta",
    ].join("\n"),
  );
});

test("ignore input when disabled", async () => {
  let value: string | undefined;

  const { lastFrame, stdin } = render(
    <Select
      isDisabled
      options={options}
      onChange={(newValue) => {
        value = newValue;
      }}
    />,
  );

  expect(lastFrame()).toBe(
    ["  Red", "  Green", "  Yellow", "  Blue", "  Magenta"].join("\n"),
  );

  expect(value).toBeUndefined();

  await delay(50);
  stdin.emit("data", arrowDown);
  await delay(50);

  expect(lastFrame()).toBe(
    ["  Red", "  Green", "  Yellow", "  Blue", "  Magenta"].join("\n"),
  );

  expect(value).toBeUndefined();

  await delay(50);
  stdin.emit("data", arrowUp);
  await delay(50);

  expect(lastFrame()).toBe(
    ["  Red", "  Green", "  Yellow", "  Blue", "  Magenta"].join("\n"),
  );

  expect(value).toBeUndefined();

  await delay(50);
  stdin.emit("data", enter);
  await delay(50);

  expect(lastFrame()).toBe(
    ["  Red", "  Green", "  Yellow", "  Blue", "  Magenta"].join("\n"),
  );

  expect(value).toBeUndefined();
});

test("select focused option", async () => {
  let value: string | undefined;

  const { lastFrame, stdin } = render(
    <Select
      options={options}
      onChange={(newValue) => {
        value = newValue;
      }}
    />,
  );

  expect(lastFrame()).toBe(
    [
      `${chalk.blue(figures.pointer)} ${chalk.blue("Red")}`,
      "  Green",
      "  Yellow",
      "  Blue",
      "  Magenta",
    ].join("\n"),
  );

  expect(value).toBeUndefined();

  await delay(50);
  stdin.emit("data", enter);
  await delay(50);

  expect(lastFrame()).toBe(
    [
      `${chalk.blue(figures.pointer)} ${chalk.blue("Red")} ${chalk.green(
        figures.tick,
      )}`,
      "  Green",
      "  Yellow",
      "  Blue",
      "  Magenta",
    ].join("\n"),
  );

  expect(value).toBe("red");

  await delay(50);
  stdin.emit("data", arrowDown);
  await delay(50);

  expect(lastFrame()).toBe(
    [
      `  ${chalk.green("Red")} ${chalk.green(figures.tick)}`,
      `${chalk.blue(figures.pointer)} ${chalk.blue("Green")}`,
      "  Yellow",
      "  Blue",
      "  Magenta",
    ].join("\n"),
  );
});

test("selected option by default", () => {
  const { lastFrame } = render(
    <Select defaultValue="green" options={options} />,
  );

  expect(lastFrame()).toBe(
    [
      `${chalk.blue(figures.pointer)} ${chalk.blue("Red")}`,
      `  ${chalk.green("Green")} ${chalk.green(figures.tick)}`,
      "  Yellow",
      "  Blue",
      "  Magenta",
    ].join("\n"),
  );
});

test("highlight text in options", () => {
  const { lastFrame } = render(<Select highlightText="l" options={options} />);

  expect(lastFrame()).toBe(
    [
      `${chalk.blue(figures.pointer)} ${chalk.blue("Red")}`,
      "  Green",
      `  Ye${chalk.bold("l")}low`,
      `  B${chalk.bold("l")}ue`,
      "  Magenta",
    ].join("\n"),
  );
});

test("OptionMap.at with out of bounds index", () => {
  const options = [{ label: "Red", value: "red" }];
  const map = new OptionMap(options);
  expect(map.at(1)).toBeUndefined();
  expect(map.at(-1)).toBeUndefined();
});

test("select already selected option", async () => {
  const onChange = vi.fn();
  const options = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
  ];
  const { stdin } = render(
    <Select options={options} defaultValue="red" onChange={onChange} />,
  );

  await delay(50);
  stdin.emit("data", enter);
  await delay(50);

  expect(onChange).not.toHaveBeenCalled();
});

test("useSelect - handle other keys", async () => {
  const onChange = vi.fn();
  const options = [{ label: "Red", value: "red" }];
  const { stdin } = render(<Select options={options} onChange={onChange} />);

  await delay(50);
  stdin.emit("data", "a");
  await delay(50);

  expect(onChange).not.toHaveBeenCalled();
});

test("getIndex with non-existent value", () => {
  const options = [{ label: "Red", value: "red" }];
  const map = new OptionMap(options);
  expect(map.getIndex("blue")).toBe(-1);
});

test("useSelectState with duplicate values", async () => {
  const { lastFrame } = render(
    <Select
      options={[
        { label: "A", value: "1" },
        { label: "B", value: "1" },
      ]}
    />,
  );
  await delay(50);
  expect(lastFrame()).toBe("");
});

test("index.ts exports", () => {
  expect(index.Select).toBeDefined();
  expect(index.SelectOption).toBeDefined();
  expect(index.useSelect).toBeDefined();
  expect(index.useSelectState).toBeDefined();

  const TestComponent = () => {
    const s = index.useSelectState({ options: [], visibleOptionCount: 5 });
    index.useSelect({ isDisabled: false, state: s });
    return <index.Select options={[]} />;
  };
  render(<TestComponent />);
});

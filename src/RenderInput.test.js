import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RenderInput from "./RenderInput";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<RenderInput />);

    expect(screen.getAllByRole("button")).toBeTruthy();

    /* inputタグのplaceholderでinputタグを取得 */
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
  });
});

describe("Input form onChange event", () => {
  it("Should update input value correctly", async () => {
    render(<RenderInput />);

    const inputValue = screen.getByPlaceholderText("Enter");

    /* userEventのtypeでタイピング出来るかテスト */
    await userEvent.type(inputValue, "test");
    expect(inputValue.value).toBe("test");
  });
});

describe("Console button conditionally triggered", () => {
  it("Should not trigger output function", async () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);

    await userEvent.click(screen.getByRole("button"));
    /* ボタンがクリックされた時に関数が実行されたかどうかをテスト */
    expect(outputConsole).not.toHaveBeenCalled();
  });

  it("Should trigger output function", async () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole} />);

    /* インプットに先ずはテキストを入力している */
    const inputValue = screen.getByPlaceholderText("Enter");
    userEvent.type(inputValue, "test");

    /* インプットを入力した後に関数が1回だけ読みだされているか？ */
    await userEvent.click(screen.getByRole("button"));
    expect(outputConsole).toHaveBeenCalledTimes(1);
  });
});

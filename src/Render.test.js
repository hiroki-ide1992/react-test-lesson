import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

/* describeでテストのタイトルを付けている */
describe("Rendering", () => {
  /* it関数でテストの内容を具体的に記述 */
  /* 下記の例は全ての要素がレンダリングされてること、と言う意味 */
  it("Should render all the elements correctly", () => {
    /* render()でコンポーネントの内容(HTMLの構造)を取得している*/
    render(<Render />);
    /* render()で取得した内容を出力する記述 */
    //screen.debug();

    /* 要素ごとにレンダリングされているか確認している */
    //screen.debug(screen.getByRole("heading"));

    /* expect()関数を使い、要素は存在するかを確認している */
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeTruthy();
    expect(screen.getAllByRole("button")[0]).toBeTruthy(); //[0]で一つ目のボタンを取得している
    expect(screen.getAllByRole("button")[1]).toBeTruthy();

    /* 指定したテキストが存在するか確認している */
    expect(screen.getByText("Udemy")).toBeTruthy();
    /* 指定したテキストが無いことを確認している */
    expect(screen.queryByText("Udeeeeemy")).toBeNull();
    expect(screen.getByTestId("copyright")).toBeTruthy();
  });
});

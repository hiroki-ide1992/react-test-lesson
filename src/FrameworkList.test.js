import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FrameworkList from "./FrameworkList";

afterEach(() => cleanup());

describe("Rendering the list with props", () => {
  it("Should render No data ! when no data propped", async () => {
    render(<FrameworkList />);

    /* HTMLの構造の中に 'No data!' が含まれているかどうか？ */
    expect(screen.getByText("No data!")).toBeInTheDocument();
  });

  it("Should render list item correctly", () => {
    const dummyData = [
      {
        id: 1,
        item: "React Dummy",
      },
      {
        id: 2,
        item: "Angular Dummy",
      },
      {
        id: 3,
        item: "Vue Dummy",
      },
    ];

    render(<FrameworkList frameworks={dummyData} />);
    /* 配列からテキストのみを抽出している */
    const frameworkItems = screen
      .getAllByRole("listitem")
      .map((ele) => ele.textContent);

    /* ダミーデータからitemだけを格納している */
    const dummyItems = dummyData.map((ele) => ele.item);

    /* リストのテキストと配列データの内容が一致しているから確認 */
    expect(frameworkItems).toEqual(dummyItems);
    /* 'No data!'がドキュメントないに表示されていないか確認 */
    expect(screen.queryByText("No data !")).toBeNull();
  });
});

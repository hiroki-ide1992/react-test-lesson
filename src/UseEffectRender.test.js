import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UseEffectRender from "./UseEffectRender";

describe("useEffect rendering", () => {
  it("Should render only after async function resolved", async () => {
    render(<UseEffectRender />);

    /* 同期前が行われる前にI amの文字列が無いことを確認 */
    expect(screen.queryByText(/I am/)).toBeNull();

    /* findBy~で非同期処理が終わるまで待ってくれる */
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});

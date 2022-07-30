import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "./MockServer";

const server = setupServer(
  /* 疑似的なサーバーを作り出して、その中にテスト用のAPIダミーを制作している */
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    /* res(レスポンス)で返す内容を定義している */
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

/* beforeAllはこのテストファイルにおいて最初に1回だけ実行される処理 */
/* server.listen()でダミーAPIのサーバー起動 */
beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
});

/* afterAllはこのテストファイルにおいて最後に1回だけ実行される処理 */
afterAll(() => server.close());

describe("Mocking API", () => {
  it("[Fetch success]Should display fetched data correctly and button disable", async () => {
    render(<MockServer />);
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByRole("heading")).toHaveTextContent("Bred dummy");
    /* toHaveAttribute(属性) で指定した属性が存在するか確認している */
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });

  it("[Fetch failure] Should display error msg, no render heading and button abled", async () => {
    /* useを使いitのスコープ内だけで有効なサーバーの設定を適応している */
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          /* 404を指定し、あえてエラーを吐かせている */
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed !"
    );
    /* サーバー通信に失敗しているはずなのでh3要素が無いことをテストしている */
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});

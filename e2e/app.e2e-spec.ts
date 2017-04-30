import { EplProjectPage } from "./app.po";

describe("epl-project App", () => {
  let page: EplProjectPage;

  beforeEach(() => {
    page = new EplProjectPage();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("app works!");
  });
});

describe("package-declaration", () => {
  test("unchanged", () =>
    expect("package com.github.thing.app").toMatchFormat());

  test("double spaced", () =>
    expect("package  com.github.thing.app").toChangeFormat(
      "package com.github.thing.app"
    ));

  test("differing cases", () =>
    expect("package COM.gitHub.thing.APP").toChangeFormat(
      "package COM.gitHub.thing.APP"
    ));
});

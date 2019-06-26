describe("package-declaration", () => {
  test("unchanged", () =>
    expect("package com.github.thing.app").toMatchFormat());

  test("double spaced", () =>
    expect("package  com.github.thing.app").toChangeFormat(
      "package com.github.thing.app"
    ));

  test("uppercase", () =>
    expect("package COM.github.thing.APP").toChangeFormat(
      "package com.github.thing.app"
    ));
});

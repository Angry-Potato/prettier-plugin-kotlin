describe("package-declaration", () => {
  test("unchanged", () =>
    expect("package com.github.thing.app\n").toMatchFormat());

  test("without line spacer", () =>
    expect("package com.github.thing.app").toChangeFormat(
      "package com.github.thing.app\n"
    ));

  test("double spaced", () =>
    expect("package  com.github.thing.app").toChangeFormat(
      "package com.github.thing.app\n"
    ));

  test("uppercase", () =>
    expect("package COM.github.thing.APP").toChangeFormat(
      "package com.github.thing.app\n"
    ));
});

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

  test("differing cases", () =>
    expect("package COM.gitHub.thing.APP").toChangeFormat(
      "package COM.gitHub.thing.APP\n"
    ));
});

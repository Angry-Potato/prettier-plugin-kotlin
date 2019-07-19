const determineNodePrinter = (node, nodePrinters) => {
  if (!node) {
    throw new Error(`Undefined node encountered`);
  }

  const printers = nodePrinters.filter(printer => printer.canPrint(node));

  switch (printers.length) {
    case 0:
      throw new Error(
        `Unsupported node encountered: ${JSON.stringify(node, null, 2)}`
      );
    case 1:
      // console.log(`using printer ${printers[0].name}`);

      return printers[0];

    default:
      throw new Error(
        `Unable to determine appropriate printer out of:
${JSON.stringify(printers.map(({ name }) => name), null, 1)}
for node:
${JSON.stringify(node, null, 2)}`
      );
  }
};

module.exports = {
  determineNodePrinter
};

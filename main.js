const fs = require("fs");

function decodeValue(value, base) {
  return parseInt(value, base);
}

function lagrangeConstTerm(points) {
  let result = 0;
  const pointCount = points.length;

  for (let i = 0; i < pointCount; i++) {
    const [xi, yi] = points[i];

    let li = 1;
    for (let j = 0; j < pointCount; j++) {
      if (i !== j) {
        const xj = points[j][0];
        li *= -xj / (xi - xj);
      }
    }

    result += yi * li;
  }

  return result;
}

function main() {
  const inputData = JSON.parse(fs.readFileSync("input.json", "utf8"));

  const n = inputData.keys.n;
  const k = inputData.keys.k;

  if (n < k) {
    console.log("Not enough roots to determine the polynomial.");
    return;
  }

  const points = [];
  for (const key in inputData) {
    if (key !== "keys") {
      const x = parseInt(key);
      const base = parseInt(inputData[key].base);
      const value = inputData[key].value;
      const y = decodeValue(value, base);
      points.push([x, y]);
    }
  }

  const constantTerm = lagrangeConstTerm(points);

  console.log("The constant term (c) of the polynomial is:", constantTerm);
}

main();
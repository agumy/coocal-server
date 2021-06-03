import https from "https";
import { JSDOM } from "jsdom";

const url = process.argv[2];

console.log(url);

https.get(url, (res) => {
  let html = "";
  res.on("data", (line) => (html += line));
  res.on("end", () => {
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const h1 = document.querySelector("h1");
    const ingredientList = document.querySelector(".ingredient-list");
    console.log(h1?.textContent);

    console.dir(ingredientList?.textContent);
  });
});

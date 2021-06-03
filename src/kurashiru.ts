import https from "https";
import jsdom from "jsdom";

const url = process.argv[2];

console.log(url);

https.get(url, (res) => {
  let html = "";
  res.on("data", (line) => (html += line));
  res.on("end", () => {
    const dom = new jsdom.JSDOM(html);
    const { document } = dom.window;
    const title = document
      .querySelector("h1")
      ?.textContent?.replace("レシピ・作り方", "")
      .trim();

    console.log({ title });

    const ingredientList = Array.from(
      document.querySelector(".ingredient-list")?.children || []
    );

    const jsonIngredientList = ingredientList.map((e) => {
      const ingredient = e.children;
      return {
        name: ingredient[0].textContent?.trim(),
        amount: ingredient[1].textContent?.trim(),
      };
    });

    console.log(jsonIngredientList);
  });
});

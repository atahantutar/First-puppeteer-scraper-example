import puppeteer from "puppeteer";

const getQuotes = async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto("http://quotes.toscrape.com/");

  const quotes = await page.$$eval(".quote", (elements) => {
    const list = [];

    elements.forEach((element) => {
      const text = element.querySelector(".text").textContent;
      const byEdit = element.querySelector(".author").textContent;
      const tags = Array.from(element.querySelectorAll(".tag")).map(
        (tag) => tag.textContent
      );

      list.push({ text, byEdit, tags });
    });

    return list;
  });

  console.log(quotes[0]);

  await browser.close();
};

getQuotes();

export function createMarkup(text: string) {
  const paragraphs = text.split("\n\n");
  return {
    __html: paragraphs
      .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
      .join(""),
  };
}

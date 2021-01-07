export function cleanText(e) {
  const clean = e.replace(/<\/?[^>]+(>|$)/g, "");
  return clean;
}

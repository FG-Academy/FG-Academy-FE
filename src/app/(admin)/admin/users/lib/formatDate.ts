export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
}

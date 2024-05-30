export function dateFormat(date: Date) {
  let dateFormat2 =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 9
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());
  return dateFormat2;
}

export function dateAgoFormat(dateInput: string): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new TypeError("Invalid date");
  }

  const now = new Date();
  const diffTime = now.getTime() - date.getTime();

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays}일 전`;
  } else if (diffHours > 0) {
    return `${diffHours}시간 전`;
  } else {
    return `${diffMinutes}분 전`;
  }
}

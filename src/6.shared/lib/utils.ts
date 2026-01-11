import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function dateFormat(date: Date) {
  const dateFormat2 =
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

export function transformDate(cleanInput: string) {
  let formattedInput;

  if (cleanInput.length <= 4) {
    // 연도 입력 중
    formattedInput = cleanInput;
  } else if (cleanInput.length <= 6) {
    // 월 입력 중
    formattedInput = `${cleanInput.slice(0, 4)}-${cleanInput.slice(4)}`;
  } else {
    // 일 입력 중
    formattedInput = `${cleanInput.slice(0, 4)}-${cleanInput.slice(
      4,
      6
    )}-${cleanInput.slice(6, 8)}`;
  }
  return formattedInput;
  // field.onChange(formattedInput); // 업데이트된 값을 form 필드에 설정
}

export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;

  // 서버: SERVER_API_URL 환경변수, 클라이언트: 자기 자신의 도메인 (빈 문자열)
  const baseUrl =
    typeof window === "undefined" ? process.env.SERVER_API_URL || "" : "";
  return `${baseUrl}${imagePath}`;
}

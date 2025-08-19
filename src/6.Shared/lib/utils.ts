import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
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

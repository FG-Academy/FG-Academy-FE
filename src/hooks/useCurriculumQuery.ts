import { useQuery } from "@tanstack/react-query";
import { getAllCurriculums } from "./lib/getAllCurriculums";

interface CurriculumResponse {
  data: string[];
}

export const useCurriculumQuery = (
  accessToken: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<CurriculumResponse>({
    queryKey: ["curriculums"],
    queryFn: () => getAllCurriculums(accessToken),
  });
};

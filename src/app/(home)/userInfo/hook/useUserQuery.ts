import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../lib/getUserProfile";
import { IUser } from "@/model/user";

/** [회원정보 수정화면] 내 회원 정보 가져오기 */
export const useFetchUserProfileQuery = (
  accessToken: string,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<IUser>({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(accessToken),
    enabled: !!accessToken,
  });
};

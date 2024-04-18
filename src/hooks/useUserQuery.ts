import { auth } from "@/auth";
import { User, UserProfile } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./lib/getAllUsers";
import { getUserProfile } from "./lib/getUserProfile";
import { getOneUser } from "./lib/getOneUser";
import {
  TChurchName,
  TDepartment,
  TPosition,
} from "@/app/(home)/userInfo/types/type";
import { IEnrollment } from "@/model/enrollment";

export interface UserProfileResponse {
  userId: number;
  birthDate: string;
  name: string;
  email: string;
  phoneNumber: string;
  churchName: TChurchName;
  departmentName: TDepartment;
  position: TPosition;
  yearsOfService: number;
  level: string;
  nameBirthId: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export const useFetchAllUserListQuery = (
  accessToken: string,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<User>({
    queryKey: ["users"],
    queryFn: () => getAllUsers(accessToken),
    enabled: !!accessToken,
  });
};

export const useFetchUserProfileQuery = (
  accessToken: string,
  options?: {
    enabled?: boolean;
  }
) => {
  // const session = await auth();
  // const accessToken = session?.accessToken as string;

  return useQuery<UserProfileResponse>({
    queryKey: ["users", accessToken],
    queryFn: () => getUserProfile(accessToken),
    enabled: !!accessToken,
  });
};

export const useFetchUserProfileByIdQuery = (
  accessToken: string,
  userId: number,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<UserProfile>({
    queryKey: ["users", userId],
    queryFn: () => getOneUser(accessToken, userId),
    enabled: !!accessToken,
  });
};

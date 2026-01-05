import { EUserRole } from "@/enum/userRoleEnum";
import { getUserRole } from "./getUserRole";

export const idRecruiter = async () => {
  const result = (await getUserRole()) === EUserRole.RECRUITER;
  return result;
};

export const isEmployee = async () => {
  const result = (await getUserRole()) === EUserRole.EMPLOYEE;
  return result;
};

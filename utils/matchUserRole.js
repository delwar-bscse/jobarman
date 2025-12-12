import { getUserRole } from "./getUserRole";

// RECRUITER | EMPLOYEE
export const EUserRole = {
  EMPLOYEE: "EMPLOYEE",
  RECRUITER: "RECRUITER"
}


export const idRecruiter = async() => {
  const result = await getUserRole() === EUserRole.RECRUITER;
  return result;
}


export const isEmployee = async() => {
  
  const result = getUserRole() === EUserRole.EMPLOYEE;
  return result;
}
"use client";

import { getCookie } from "cookies-next";

export const EUserRole = {
  EMPLOYEE: "EMPLOYEE",
  RECRUITER: "RECRUITER",
} as const;

export type UserRole = (typeof EUserRole)[keyof typeof EUserRole];

export const getUserRole = (): UserRole | null => {
  const role = getCookie("role");

  if (!role) return null;

  if (role === EUserRole.EMPLOYEE || role === EUserRole.RECRUITER) {
    return role;
  }

  return null;
};

export const isEmployee = (): boolean => {
  return getUserRole() === EUserRole.EMPLOYEE;
};

export const isRecruiter = (): boolean => {
  return getUserRole() === EUserRole.RECRUITER;
};

export const hasRole = (role: UserRole): boolean => {
  return getUserRole() === role;
};

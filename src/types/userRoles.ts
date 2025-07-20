export type UserRole = "owner" | "advisor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type Role = "visitor" | "user";

export interface Profile {
  name?: string;
  role: Role;
}

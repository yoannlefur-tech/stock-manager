export type User = {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
};

export type UserName = {
  firstName?: string | null;
  lastName?: string | null;
};

export type UserAuthContext = {
  isLoggedIn: boolean;
  email: string | null;
  name: string | null;
};

export type User = {
  email: string;
  password: string;
};

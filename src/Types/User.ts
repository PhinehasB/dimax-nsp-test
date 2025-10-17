export type UserAuthContext = {
  isLoggedIn: boolean;
  email: string | null;
  name: string | null;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

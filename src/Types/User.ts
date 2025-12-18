export type UserAuthContext = {
  isLoggedIn: boolean;
  email: string | undefined;
  name: string | undefined;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

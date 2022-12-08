export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};
export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
};
export type CreatePostParam = {
  title: string;
  description: string;
};

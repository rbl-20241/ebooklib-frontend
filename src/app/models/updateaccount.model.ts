export interface UpdateAccount {
  id: string,
  username: string;
  oldPassword: string;
  password: string;
  role: 'ADMIN' | 'USER';
}

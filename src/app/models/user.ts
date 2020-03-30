import { Account } from './account';

export class User{
  id: number;
  name: string;
  email: string;
  password: string;
  account_id: number;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
  account: Account;
}

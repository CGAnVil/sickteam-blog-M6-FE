import {Role} from '../service/auth/auth.service';
import {UserStatus} from './user-status';

export interface User {
  id: number;
  userName: string;
  password: string;
  email: string;
  fullName: string;
  address: string;
  phone: string;
  avatar: string;
  status?: UserStatus;
  role: Role[];
}

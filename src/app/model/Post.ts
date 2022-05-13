import {Status} from './Status';
import {User} from './user';

export interface Post {
  id: number;
  dateCreate: any;
  title: string;
  content: string;
  description: string;
  avatarPost: string;
  status: Status;
  User: User;
}


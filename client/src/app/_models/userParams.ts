import { User } from './user';

export class UserParams {
  constructor(user: User) {
    this.gender = user.gender == 'male' ? 'female' : 'male';
  }
  gender: string;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'lastActive';
}

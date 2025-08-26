import {IStudent} from './student.model';
import {IUser} from './user.model';
import {ISchool} from './school.model';

export interface IClass {
  id: number;
  name: string;
  finishing_year: number;
  school_id: number;
  user_id: number;

  School?: ISchool;
  User?: IUser;
  Student?: IStudent[];
}

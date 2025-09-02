import {SchoolModel} from './school.model';
import {UserModel} from './user.model';
import {StudentModel} from './student.model';

export interface ClassModel {
  id: number;
  name: string;
  finishing_year: number;

  School?: SchoolModel;
  User?: UserModel;
  Student?: StudentModel[];
}

export interface ClassStatisticsDto {
  countStudentsInClass: number;
}

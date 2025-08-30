import {SchoolDto} from './school.dto';
import {UserDto} from './user.dto';
import {Students} from '../../features/dashboard/students/students';

export interface ClassDto {
  id: number;
  name: string;
  finishing_year: number;

  School?: SchoolDto;
  User?: UserDto;
  Student?: Students[];
}

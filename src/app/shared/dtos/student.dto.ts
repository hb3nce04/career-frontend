import {ClassDto} from './class.dto';

export interface StudentDto {
  id: number;
  name: string;
  day_shift: boolean;
  Class: ClassDto;
  // TODO: Sector, Profession
}

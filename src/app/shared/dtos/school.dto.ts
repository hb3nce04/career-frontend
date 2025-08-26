import {ClassDto} from './class.dto';

export interface SchoolDto {
  id: number;
  name: string;
  Class?: ClassDto[];
}

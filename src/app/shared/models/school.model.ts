import {IClass} from './class.model';

export interface ISchool {
  id: number;
  name: string;
  Class?: IClass[];
}

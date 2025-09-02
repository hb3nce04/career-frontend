import {ClassModel} from './class.model';

export interface SchoolModel {
  id: number;
  name: string;
  Class?: ClassModel[];
}

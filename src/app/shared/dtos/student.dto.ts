import {ClassDto} from './class.dto';
import {SectorDto} from './sector.dto';
import {ProfessionDto} from './profession.dto';
import {FieldDto} from './field.dto';

export interface StudentDto {
  id: number;
  name: string;
  day_shift: boolean;
  Class: ClassDto;
  Sector: SectorDto;
  Profession: ProfessionDto;
  Field: FieldDto;
}

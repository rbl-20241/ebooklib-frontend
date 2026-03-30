import {Role} from './role.model';

export interface About {
  user: string;
  role: Role;
  version: string;
  operatingSystem: string;
  copyright: string;
}

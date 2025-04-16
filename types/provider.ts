import type { IFile } from './file';

export interface IProvider {
  id: number;
  name: string;
  files: IFile[];
  notes: string;
}
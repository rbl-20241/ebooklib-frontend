import {Author} from './author.model';

export interface Metadata {
  id: string;
  ebookId: string;
  title: string;
  authors: Author[];
  isbn: string;
  language: string;
  publisher: string;
  date: string;
  subjects: string[];
  format: string;
  description: string;
  filePath: string;
}

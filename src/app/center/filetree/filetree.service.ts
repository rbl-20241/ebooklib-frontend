import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Injectable({providedIn: 'root'})
export class FiletreeService {

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<any>('http://localhost:8080/getbooks')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }
}

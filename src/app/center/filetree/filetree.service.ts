import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Injectable({providedIn: 'root'})
export class FiletreeService {

  constructor(private http: HttpClient) { }

  getFiles() {
    return this.http.get<any>('ebooks.json')
      //.forEach(res => <TreeNode[]>res.data);
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }

  getBooks() {
    let tree =  this.http.get<any>('http://localhost:8080/getbooks')
      .toPromise()
      .then(res => <TreeNode[]>res.data);

    console.log(tree);
    return tree;
  }
}

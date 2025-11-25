import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TreeNode } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FiletreeService {

  constructor(private http: HttpClient) { }

  async getBooktree(): Promise<TreeNode[]> {
    const res = await firstValueFrom(
      this.http.get<any>('http://localhost:8080/booktree')
    );

    return res.data as TreeNode[];
  }

  public getBookInfo() {

  }
}

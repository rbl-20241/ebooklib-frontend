import {Component, inject, OnInit} from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FiletreeService } from './filetree.service';
import {Tree} from 'primeng/tree';

@Component({
  selector: 'app-filetree',
  templateUrl: './filetree.component.html',
  styleUrls: ['./filetree.component.css'],
  imports: [ Tree ],
  providers: [ FiletreeComponent ]
})
export class FiletreeComponent implements OnInit {
    files!: TreeNode[];
    selectedFile!: TreeNode;
    private filetreeService = inject(FiletreeService);


    ngOnInit() {

        this.filetreeService.getFiles().then((data) => this.files = data);
    }}

import {Component, OnInit} from '@angular/core';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-settingsdialog',
  imports: [
    Dialog
  ],
  templateUrl: './settings.dialog.html',
  styleUrl: './settings.dialog.css'
})
export class SettingsDialog implements OnInit{
  public displaySettingsDialog = true;

  ngOnInit(): void {
    console.log("SettingsDialog");
  }


}

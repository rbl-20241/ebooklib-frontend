import {Component} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {Panel} from 'primeng/panel';
import {MenuComponent} from './menu/menu.component';
import {AboutDialog} from '../popup/aboutdialog/about.dialog';
import {LoginDialog} from '../popup/logindialog/login.dialog';

@Component({
  selector: 'app-top',
  imports: [
    HeaderComponent,
    Panel,
    MenuComponent,
    AboutDialog,
    LoginDialog
  ],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {

}

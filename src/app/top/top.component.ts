import {Component} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {Panel} from 'primeng/panel';
import {MenuComponent} from './menu/menu.component';
import {AboutDialog} from '../popup/aboutdialog/about.dialog';
import {LoginDialog} from '../popup/logindialog/login.dialog';
import {MainsettingsDialog} from '../popup/mainsettingsdialog/mainsettings.dialog';
import {UsersettingsDialog} from '../popup/usersettingsdialog/usersettings.dialog';
import {ProfileDialog} from '../popup/profile/profile.dialog';

@Component({
  selector: 'app-top',
  imports: [
    HeaderComponent,
    Panel,
    MenuComponent,
    AboutDialog,
    LoginDialog,
    ProfileDialog,
    MainsettingsDialog,
    UsersettingsDialog
  ],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {

}

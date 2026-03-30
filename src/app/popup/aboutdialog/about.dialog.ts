import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {Image} from 'primeng/image';
import {HttpClient} from '@angular/common/http';
import {About} from '../../models/about.model';
import {AccountService} from '../../services/account.service';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-aboutdialog',
  imports: [
    Dialog,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    Ripple,
    TableModule,
    Image
  ],
  templateUrl: './about.dialog.html',
  styleUrl: './about.dialog.css',
})
export class AboutDialog {
  menuService = inject(MenuService);
  accountService = inject(AccountService);
  private http = inject(HttpClient);
  user: string | undefined;
  version: string | undefined;
  operatingSystem: string | undefined;
  copyright: string | undefined;

  visible = this.menuService.showAboutDialog;

  getActiveUser() {
    return this.accountService.getActiveAccount().username;
  }

  onShowDialog() {
    this.http.get<About>('http://localhost:8080/about')
      .subscribe({
        next: about => {
          this.user = this.getActiveUser();
          this.version = about.version;
          this.operatingSystem = about.operatingSystem;
          this.copyright = about.copyright;
        },
        error: () => {
          this.user = "Nobody";
          this.operatingSystem = "Unknown";
          this.version = "0.0.0";
          this.copyright = "&copy";
        }
      });
  }

  cancel() {
    this.visible.set(false);
  }
}

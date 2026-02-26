import {Component, inject, OnInit} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {AboutService} from '../../services/about.service';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {Image} from 'primeng/image';
import {HttpClient} from '@angular/common/http';
import {About} from '../../data/about.model';

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
export class AboutDialog implements OnInit {
  aboutService = inject(AboutService);
  private http = inject(HttpClient);
  user: string | undefined;
  version: string | undefined;
  operatingSystem: string | undefined;
  copyright: string | undefined;

  displayAboutDialog = this.aboutService.showAbout;

  ngOnInit() {
    this.http.get<About>('http://localhost:8080/about')
      .subscribe({
        next: about => {
          this.user = about.user;
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
    this.displayAboutDialog.set(false);
  }
}

import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {AboutService} from '../../services/about.service';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {Image} from 'primeng/image';

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
  aboutService = inject(AboutService);

  displayAboutDialog = this.aboutService.showAbout;

  cancel() {
    this.displayAboutDialog.set(false);
  }
}

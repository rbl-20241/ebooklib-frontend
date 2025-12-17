import {Component, inject} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {SettingService} from '../top/settings/settings.service';
import {Panel} from 'primeng/panel';

@Component({
    selector: 'app-bottom',
    templateUrl: './bottom.component.html',
  imports: [
    ButtonDirective,
    Ripple,
    Panel
  ],
    styleUrl: './bottom.component.css'
})
export class BottomComponent {

  private settingsService = inject(SettingService);

  saveBooksToDatabase() {
    this.settingsService.showYesNoDatabaseDialog();
  }
}

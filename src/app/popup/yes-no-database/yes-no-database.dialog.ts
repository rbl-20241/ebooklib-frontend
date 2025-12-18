import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {HttpClient} from '@angular/common/http';
import {SettingService} from '../../services/settings.service';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-yes-no-database',
  imports: [
    Dialog,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './yes-no-database.dialog.html',
  styleUrl: './yes-no-database.dialog.css',
})
export class YesNoDatabaseDialog {
  private http = inject(HttpClient);
  private settingsService = inject(SettingService);
  displayYesNoDbDialog = this.settingsService.showYesNoDbSettings;
  changeColor = true;

  cancel() {
    this.displayYesNoDbDialog.set(false);
  }

  async save() {
    await firstValueFrom(
      this.http.get<any>('http://localhost:8080/save-booktree')
    );
    this.displayYesNoDbDialog.set(false);
  }

}

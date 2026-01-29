import {Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {HttpClient} from '@angular/common/http';
import {SettingService} from '../../services/settings.service';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {firstValueFrom} from 'rxjs';
import {Genre} from '../../data/genre.model';

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
  genres: Genre[] = [];

  cancel() {
    this.displayYesNoDbDialog.set(false);
  }

  async save() {
    let genres = await firstValueFrom(
      this.http.get<Genre[]>('http://localhost:8080/refresh-booktree')
    );
    console.log("data opgehaald")
    console.log(genres);
    this.displayYesNoDbDialog.set(false);
  }

}

import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private showDialog = signal<boolean>(false);
  showSearch = this.showDialog;

  showSearchDialog() {
    this.showDialog.update((value) => !value);
  }

}

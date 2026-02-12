import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyService {
  private showDialog = signal<boolean>(false);
  showCopy = this.showDialog;

  showCopyDialog() {
    this.showDialog.set(true);
  }

}

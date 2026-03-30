import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonsService {
  showCopyDialog = signal<boolean>(false);
  showMailDialog = signal<boolean>(false);
  showSearchDialog = signal<boolean>(false);
}

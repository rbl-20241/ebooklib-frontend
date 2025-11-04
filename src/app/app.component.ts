import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FiletreeComponent } from './filetree/filetree.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FiletreeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}

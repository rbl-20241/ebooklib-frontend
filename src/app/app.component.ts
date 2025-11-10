import { Component } from '@angular/core';
import { TopComponent } from './top/top.component';
import { CenterComponent } from './center/center.component';
import { BottomComponent } from './bottom/bottom.component';

@Component({
  selector: 'app-root',
  imports: [
    TopComponent,
    CenterComponent,
    BottomComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}

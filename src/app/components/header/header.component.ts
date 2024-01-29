import { Component, INJECTOR, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() title!: string | "AppIonic";
  @Input() type: any;
  @Input() label!: string;

  constructor() { }

}

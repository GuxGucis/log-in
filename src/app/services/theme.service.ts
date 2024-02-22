import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkMode = new BehaviorSubject(false)

  constructor() { }

  async setInitialTheme(){
    const checkDarkMode = await Preferences.get({ key: 'darkModeActivated' });
    this.darkMode.next(checkDarkMode.value === 'true');
    this.updateTheme(this.darkMode.value);
  }

  setTheme(darkMode: boolean){
    this.darkMode.next(darkMode); // Update BehaviorSubject value
    this.updateTheme(darkMode);
  }

  private updateTheme(darkMode: boolean){
    document.body.classList.toggle('dark', darkMode);
    Preferences.set({
      key: "darkModeActivated",
      value: darkMode.toString()
    });
  }

}

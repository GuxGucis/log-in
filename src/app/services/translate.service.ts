import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations = new BehaviorSubject<{[key: string]: string}>({});
  private currentLang = new BehaviorSubject<string>('es');
  
  constructor(private http: HttpClient) {}

  setLanguage(lang: string): Observable<void> {
    const path = `assets/i18n/${lang}.json`;
    return this.http.get<{[key: string]: string}>(path).pipe(
      map(translations => {
        this.translations.next(translations);
        this.currentLang.next(lang); 
      })
    );
  }

  translate(key: string): Observable<string> {
    return this.translations.asObservable().pipe(
      map(translations => translations[key] || key)
    );
  }

  getCurrentLang(): string {
    return this.currentLang.getValue();
  }
}

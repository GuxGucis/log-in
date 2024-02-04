import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translate.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(key: string): Observable<string> {
    return this.translationService.translate(key);
  }
}

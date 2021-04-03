import { TranslateService } from './../services/translate.service';
import { Pipe, PipeTransform } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) { }

  transform(key: any[]): any {
    if (!this.translateService.data) {
      return '';
    }
      return this.getTranslationData(key, this.translateService.data);
  }

  getTranslationData(data, translations) {
    const allkeys = Object.keys(data);
    let cachedEl = null;
      allkeys.forEach(element => {
        if (!cachedEl) {
          cachedEl = translations[data[element]];
        } else {
          cachedEl = cachedEl[data[element]];
        }
      });
      return cachedEl;
  }
}


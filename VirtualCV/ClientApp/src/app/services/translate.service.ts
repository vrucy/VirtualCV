import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  data: any;
  constructor(private http: HttpClient) { }

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPat = `assets/localization/${lang}.json`;
      this.http.get<{}>(langPat).subscribe(
        translation => {
         this.data =  Object.assign({}, translation || {});
          resolve(this.data);
        },
        error => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }

  getSpecificWord(key: any): string {
    if (typeof key === 'string') {
      return this.data[key];
    }
    if (key.length > 2) {
      return this.data[key[0]][key[1]][key[2]];
    }
    return this.data[key[0]][key[1]];
  }
}


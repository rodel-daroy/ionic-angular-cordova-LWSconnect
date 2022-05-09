import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
/**
 * Generated class for the HtmlbypasPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'htmlbypas',
})
export class HtmlbypasPipe implements PipeTransform {
  constructor(protected _sanitizer: DomSanitizer) {
  }

  /**
   * Takes a value and makes it lowercase.
   */
  // transform(value: string, ...args) {
  //   console.log('PIKABU',value)
  //   return value.toLowerCase();
  // }

  //  transform(value: string, ...args) {  
  //   console.log('value==',value)     
  //   return this._sanitizer.bypassSecurityTrustHtml(value);
  // }
   
  public transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {     
      case 'html':
        return this._sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this._sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this._sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this._sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Unable to bypass security for invalid type: ${type}`);  
    }
  }

}

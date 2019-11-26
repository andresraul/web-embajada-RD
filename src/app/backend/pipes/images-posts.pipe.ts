import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagesPosts'
})
export class ImagesPostsPipe implements PipeTransform {


  constructor(private domSanitizer: DomSanitizer) {}
  transform(image: string, type: string): any {
const url = `${environment.homeUrl}/images/posts/${type}/`;


return this.domSanitizer.bypassSecurityTrustResourceUrl(url + image);
  }

}
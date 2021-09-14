import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphenateUri',
})
export class HyphenateUriPipe implements PipeTransform {
  transform = (uri: string) => uri.replace(/ /g, '-');
}

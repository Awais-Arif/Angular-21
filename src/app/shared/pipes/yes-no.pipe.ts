import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'yesNo',
    
})
export class YesNoPipe implements PipeTransform {
  constructor() {}
  transform(input: boolean): string {
    if (input === true) {
      return 'Yes';
    }
    return 'No';
  }
}

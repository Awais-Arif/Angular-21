import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dateTime',
    
})
export class DateTimePipe implements PipeTransform {
  transform(value: Date): string {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }
}

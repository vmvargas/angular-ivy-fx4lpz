import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customLongDateTimePipe',
})
export class CustomLongDateTimePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, `EEEE MMMM d, y h:mm a`);
  }
}

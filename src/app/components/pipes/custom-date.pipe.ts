import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string): string {
    const arr = value.split(' ');
    const date = new Date(arr[0]);
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const days = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const year = date.getFullYear();
    const hours = (date.getHours() + (+arr[1].split(':')[0])) < 10 ?
     '0' + (date.getHours() + (+arr[1].split(':')[0])) : (date.getHours() + (+arr[1].split(':')[0]));
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return `${month}-${days}-${year} ${hours}-${minutes}`;
  }
}

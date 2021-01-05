import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFiltering'
})
export class DataFilteringPipe implements PipeTransform {
//   transform(opt: any, sel?: any,searchText?:any): any {
//     //console.log('sel', opt,searchText);
//     return (opt || opt === '0') ? opt.filter(sal => { return sal.shift == sel }) : opt;
// }
transform(items: any, filter: any, defaultFilter: boolean): any {
  if (!filter){
    return items;
  }

  if (!Array.isArray(items)){
    return items;
  }

  if (filter && Array.isArray(items)) {
    let filterKeys = Object.keys(filter);

    if (defaultFilter) {
      return items.filter(item =>
          filterKeys.reduce((x, keyName) =>
              (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
    }
    else {
      return items.filter(item => {
        return filterKeys.some((keyName) => {
          return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
        });
      });
    }
  }
}
}



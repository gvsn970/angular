import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTwoDigitDecimaNumber]'
})
export class TwoDigitDecimaNumberDirective {
  // Allow decimal numbers and negative values
 
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  @Input("allowedDecimal") alloNumber: number;

  
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {
   
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    //console.log(this.el.nativeElement.value);
     let pattern = this.alloNumber == 1 ? (/^\d*\.?\d{0,1}$/g) : (/^\d*\.?\d{0,2}$/g);
     let regex: RegExp = new RegExp(pattern);
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(regex)) {
      event.preventDefault();
    }
  }

//   @HostListener('focusout', ['$event'])
//   focusout(event: KeyboardEvent) {
//     let pattern = this.alloNumber == 1 ? (/^\d*\.?\d{0,1}$/g) : (/^\d*\.?\d{0,2}$/g);
//     let regex: RegExp = new RegExp(pattern);
//     let current: string = this.el.nativeElement.value;
//     let post = current.split(".");
//     let newVal = current;
//     if(post[1] && post[1].length == 1 && this.alloNumber == 2) {
//        newVal = post[0] + `.${post[1]}0`;
      
//     }else if(post.length != 2 && this.alloNumber == 1){
//        newVal = post[0] + `.0`;
      
//     }else if(post.length != 2 && this.alloNumber == 2){
//        newVal = post[0] + `.00`;
      
//     }
//     //console.log(newVal);
//     this.el.nativeElement.value = newVal;

//     const position = this.el.nativeElement.selectionStart;
//     const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
//     if (next && !String(next).match(regex)) {
//       event.preventDefault();
//     }
//   }
}
import { style } from '@angular/animations';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[addAttributeOn]',
})
export class BackgroundFadeInDirective {
  constructor(private element: ElementRef) {}

  @Input() myClassToAdd: string;
  @Input('addAttributeOn') elementIdToReach: string;

  @HostListener('window:scroll', [])
  newWindowScroll() {
    const checkpoint = 400;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= checkpoint) {
        var newOpacity = Number(
          document.getElementById('scrollFade').style.opacity
        );

        newOpacity = 1 - currentScroll / checkpoint;
      } else {
        newOpacity = 0;
      }
      document.getElementById(
        'scrollFade'
      ).style.opacity = newOpacity.toString();
    });
  }
}

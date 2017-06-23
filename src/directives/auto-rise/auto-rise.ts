import { Directive, HostListener, ElementRef } from "@angular/core";
/**
 * Generated class for the AutoRiseDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: 'ion-textarea[auto-rise]' // Attribute selector
})
export class AutoRiseDirective {

  @HostListener("input", ["$event.target"])
  onInput (textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
  constructor(public element: ElementRef) {
  }
  ngOnInit (): void {
    this.adjust();
  }
  adjust (): void {
    let ta = this.element.nativeElement.querySelector("textarea");

    if (ta) {
      ta.style.overflow = "hidden";
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  }

}

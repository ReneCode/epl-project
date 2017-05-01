import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[epl-svg-transform-group]",
  exportAs: "epl-svg-transform-group"
})
export class SvgTransformGroupDirective {

  constructor(private element: ElementRef) { }

  public updateTransform(transform: any) {
    const transformString: string = `translate(${transform.tx},${transform.ty})scale(${transform.sc})`;
    this.element.nativeElement.setAttribute("transform", transformString);
  }

}

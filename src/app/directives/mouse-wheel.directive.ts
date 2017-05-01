import { Directive, Output, EventEmitter, ElementRef } from "@angular/core";

@Directive({
  selector: "[epl-mouse-wheel]"
})
export class MouseWheelDirective {
  @Output() public mouseWheelUp: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() private mouseWheelDown: EventEmitter<Event> = new EventEmitter<Event>();

  private wheelFunc: Function;
  private eventName: string;

  constructor(private elementRef: ElementRef) { }

  public ngOnInit() {
    this.wheelFunc = (ev) => {
      this.mouseWheelFunc(ev);
    };

    // https://developer.mozilla.org/en-US/docs/Web/Events/wheel
    this.eventName = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
      document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
        "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    // console.log("### Support", this.eventName);

    this.elementRef.nativeElement.addEventListener(this.eventName, this.wheelFunc, false);
  }

  public ngOnDestroy() {
    this.elementRef.nativeElement.removeEventListener(this.eventName, this.wheelFunc);
  }

  private mouseWheelFunc(ev: any) {
    const event = window.event || ev; // old IE support
    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if (delta > 0) {
      this.mouseWheelDown.emit(event);
    } else if (delta < 0) {
      this.mouseWheelUp.emit(event);
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }
  }
}

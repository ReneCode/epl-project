import { Component, OnInit, Output, Input, ElementRef, EventEmitter } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  selector: "epl-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  @Input() public title: string;
  @Input() public value: string;
  @Input() public delay: number = 500;
  @Output() public onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {
    const eventStream = Observable.fromEvent(elementRef.nativeElement, "keyup")
      .map( () => this.value)
      .debounceTime(this.delay)
      .distinctUntilChanged();

    eventStream.subscribe(input => this.onSearch.emit(input));
   }

  public ngOnInit() {
  }

  public onClear() {
    this.value = "";
    this.onSearch.emit(this.value);
  }
}

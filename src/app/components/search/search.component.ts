import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "epl-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  @Input() public title: string;
  @Input() public value: string;

  constructor() { }

  ngOnInit() {
  }

}

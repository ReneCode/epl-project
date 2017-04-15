import { Pipe, PipeTransform } from "@angular/core";

import { Page } from "../models/page";
@Pipe({
  name: "pageFilter"
})
export class PageFilterPipe implements PipeTransform {

  public transform(pages: Page[], args?: string): any {
    // if (pages && args) {
    //   const upperFilter = args.toUpperCase();
    //   return pages.filter(page => page.name.toUpperCase().includes(upperFilter));

    // }
    return pages;
  }

}

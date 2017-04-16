import { PropertyUser } from "./property-user"; 

export class Page extends PropertyUser{

  public static createFromJson(json: any): Page {
    const page = new Page(
      json.projectId,
      json.id,
      json.sortId,
      json.tblObjectId,
      json.properties
    );
    return page;
  }
  constructor(
    public projectId: string,
    public id: string,
    public sortId: number,
    public tblObjectId: number,
    properties: any
  ) {
    super(properties);
  }

  public getName(): string {
    return this.getProperty(11011);
  }


}

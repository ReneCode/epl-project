export class Page {

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
    public properties: any
  ) {}

  public getName(): string {
    return this.getProperty(11011);
  }

  private getProperty(property: number) : string {
    if (this.properties  &&  this.properties instanceof Array) {
      let prop = this.properties.find(p => p.id == property);
      if (prop) {
        return prop.val;
      }
    }
    return null;
  }
}

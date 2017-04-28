
export class Redlining {

  public static createFromJson(json: any): Redlining {
    const redlining = new Redlining(
      json.projectId,
      json.id,
      json.pageTblObjectId,
      json.type,
      json.status,
	  json.userCreate,
	  json.userLastChange,
	  JSON.parse(json.graphic)
    );
    return redlining;
  }
  constructor(
    public projectId: string,
    public id: string,
    public pageTblObjectId: number,
    public type: string,
    public status: string,
    public userCreate: string,
    public userLastChange: string,
	public graphic: any
  ) {
  }

}

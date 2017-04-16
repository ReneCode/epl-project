
export class PropertyUser {
	properties: any;

	constructor(properties: any) {
		this.properties = properties;
	}

	public getProperty(property: number): string {
		if (this.properties && this.properties instanceof Array) {
			let prop = this.properties.find(p => p.id == property);
			if (prop) {
				return prop.val;
			}
		}
		return null;
	}
}
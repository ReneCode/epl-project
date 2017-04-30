export class Project {

    public static createFromJson(json: any): Project {
        const project: Project = new Project(
            json.uniqueId,
            json.id,
            json.version,
            json.name,
            json.dateOfUpload,
            json.description,
            json.completed,
            json.pageStructure,
            json.functionStructure,
            false,
            0,
            0);
        return project;
    }

    constructor(
        public uniqueId: string,
        public id: string,
        public version: string,
        public name: string,
        public dateOfUpload: Date,
        public description: string,
        public completed: boolean,
        public pageStructure: any,
        public functionStructure: any,

        public selected: boolean,
        public countNewRedlinings: number,
        public uploadProgress: number
    ) {
    }
}

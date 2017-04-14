export class Project {
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

/* eslint-disable @typescript-eslint/naming-convention */
export class User {

    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public eduLevel: string,
        public city: string,
        public sector_id: string,
        public experience: string,
        public jobPosition: string,
        public lastJobTasks: string,
        public languages: Array<string>,
        public tipo: string
    ) {}
}

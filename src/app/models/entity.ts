export class Entity {

    constructor(
        public id: number,
        public entityName: string,
        public sector: string,
        public city: string,
        public valores: Array<string>
    ) {}
}

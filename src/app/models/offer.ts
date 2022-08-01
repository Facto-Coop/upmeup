/* eslint-disable @typescript-eslint/naming-convention */
export class Offer {

    constructor(
        public _id: string,
        public userId: string,
        public title: string,
        public eduLevel: string,
        public city: string,
        public jornada: string,
        public rangoSalarial: string,
        public remoto: string,
        public enrolled: number,
        public tipoContrato: string,
        public description: string,
        public createdDate: string,
        public competencies: Array<string>

        /*public id: number,
        public companyName: string,
        public jobTitle: string,
        public city: string,
        public address: string,
        public email: string,
        public phone: string,
        public salary: string,
        public valuesType: string,
        public enrolled: number,
        public contractType: string,
        public workingday: string,
        public workingType: string,
        public createdDate: string,*/
    ) { }

}

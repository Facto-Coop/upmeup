/* eslint-disable @typescript-eslint/naming-convention */
export class Offer {
        _id: string;
        userId: string;
        title: string;
        eduLevel: string;
        city: string;
        jornada: string;
        rangoSalarial: string;
        remoto: string;
        enrolled: number;
        tipoContrato: string;
        description: string;
        createdDate: string;
        competencies: Array<string>;

    /*constructor(
        public id: number,
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
        public createdDate: string,
    ) { }*/

}

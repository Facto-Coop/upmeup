export class Offer {

    constructor(
        /*_id: string,
        user_id: string,
        title: string,
        city: string,
        jornada: string,
        rangoSalarial: string,
        remoto: string,
        enrolled: string,
        TipoContrato: string,
        date: string*/

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
    ) { }

}

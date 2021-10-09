import { environment } from "src/environments/environment"

const base_url = environment.base_url;

interface _HospitalUser{
    id: string,
    nombre: string,
    img: string
}

export class Hospital {

    constructor(
        
        public nombre: boolean,
        public id?: string,
        public img: string = '',
        public usuario?: _HospitalUser
        
    ){}

}
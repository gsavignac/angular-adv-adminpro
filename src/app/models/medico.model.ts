import { environment } from "src/environments/environment"
import { Hospital } from "./hospital.model";

const base_url = environment.base_url;

interface _MedicoUser{
    id: string,
    nombre: string,
    img: string
}

export class Medico {

    constructor(
        public nombre: string,
        public usuario: _MedicoUser,
        public hospital?: Hospital,
        public img?: string,
        public id?: string
    ){}

}
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Oferta } from "./shared/oferta.model";

import { URL_API } from "./app.api";

import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {

    // private url_api = 'http://localhost:3000/ofertas';

    constructor (private http: Http) {}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}?destaque=true`)
            .toPromise()
            .then((response: any) => response.json())
    }


    public getOfertasPorCategorias(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}?categoria=${categoria}`)
            .toPromise()
            .then((response: any) => response.json())

    }


    public getOfertaPorId(id: number) : Promise<Oferta> {
        return this.http.get(`${URL_API}?id=${id}`)
            .toPromise()
            .then((response: any) => response.json().shift())
    }


}
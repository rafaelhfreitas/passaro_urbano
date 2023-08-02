import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Oferta } from "./shared/oferta.model";

import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {

    constructor (private http: Http) {}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get('localhost:3000/ofertas')
            .toPromise()
            .then((response: any) => response.json())
    }



}
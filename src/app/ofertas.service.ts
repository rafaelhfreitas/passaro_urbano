import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { Oferta } from "./shared/oferta.model";
import { URL_API } from "./app.api";

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'

@Injectable()
export class OfertasService {

    // private url_api = 'http://localhost:3000/ofertas';

    constructor (private http: Http) {}

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((response: Response) => response.json())
    }


    public getOfertasPorCategorias(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((response: Response) => response.json())

    }


    public getOfertaPorId(id: number) : Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((response: Response) => response.json().shift())
    }

    public getComoUsarOfertaPorId(id:number) : Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((response: Response) => {
                return response.json()[0].descricao})
    }


    public getOndeFicaOfertaPorId(id:number) : Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((response: Response) => {
                return response.json()[0].descricao})
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]>{
        console.log()
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .retry(5)
            .map((response: Response) => response.json())
    }


}
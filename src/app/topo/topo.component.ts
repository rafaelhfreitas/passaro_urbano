import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extensions'

import { OfertasService } from 'app/ofertas.service';
import { Oferta } from 'app/shared/oferta.model';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

 
  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {

    this.ofertas = this.subjectPesquisa
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((termo: string) => {
        console.log('requisição   http para api ')
        if (termo.trim() === '') {
          //retornar um observable de array de ofertas vazio
          return Observable.of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termo)
      })
      .catch( (error: any ) => {
        console.log(error)
        return Observable.of<Oferta[]>([])
      })

    // this.ofertas.subscribe((ofertas: Oferta[]) => {
    //   console.log(ofertas);
    //   this.ofertasPesquisadas = ofertas;

    // })
  }


  // public pesquisa(event: Event):void {
  //   console.log((<HTMLInputElement>event.target).value)
  // }

  public pesquisa(termoDaBusca: string): void {

    console.log('keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca);


    // this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
    // // console.log(this.ofertas)

    // this.ofertas.subscribe(
    //   (ofertas: Oferta[]) => console.log(ofertas ),
    //   (erro: any) => console.log('Erro status', erro.status),
    //   () => console.log('Fluxo de eventos completo !!')
    // )
  }  


  public limparPesquisa(): void{
    this.subjectPesquisa.next('')
  }

}

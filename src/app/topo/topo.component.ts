import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OfertasService } from 'app/ofertas.service';
import { Oferta } from 'app/shared/oferta.model';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {


  public ofertas: Observable<Oferta[]>

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
  }


  // public pesquisa(event: Event):void {
  //   console.log((<HTMLInputElement>event.target).value)
  // }

  public pesquisa(termoDaBusca: string): void {
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
    // console.log(this.ofertas)

    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas ),
      (erro: any) => console.log('Erro status', erro.status),
      () => console.log('Fluxo de eventos completo !!')
    )
  }  

}

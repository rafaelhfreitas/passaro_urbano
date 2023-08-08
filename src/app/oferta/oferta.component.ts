import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { OfertasService } from '../ofertas.service';
import { CarrinhoService } from 'app/carrinho.service';


import { Oferta } from '../shared/oferta.model';

  // import { Observable } from 'rxjs/Observable';
  // import { Observer } from 'rxjs/Observer';
  // import { Subscription } from 'rxjs/Subscription';

import 'rxjs/Rx'



@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  // private timeObservableSubscription: Subscription
  // private myObservableSubscription: Subscription


  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService) 
  {}

  ngOnInit() {

    console.log('Itens do carrinho via oferta comp:' ,this.carrinhoService.exibirItens());


    // console.log('id recuperado da rota via snapshot', this.route.snapshot.params['id'])
    
    this.route.params.subscribe((params: Params) => {
      this.ofertasService.getOfertaPorId(params.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta;
      })
    })



    /*
    this.route.params.subscribe(
      (param : any ) => { console.log(param) },
      (erro : any ) => console.log(erro),
      () => console.log('processamento classificado como concluído')
    )
    */



    // let time = Observable.interval(2000)

    // this.timeObservableSubscription = time.subscribe(( interval: number) => {
    //   console.log(interval);
    // })



    // // observable (obserbavel)
    // let myObservable = Observable.create(
    //   (observer: Observer<number>) => {
    //     observer.next(1)
    //     observer.next(3)
    //     //observer.error('Algum erro foi encontrado no stream de evento')
    //     observer.complete()
    //     observer.next(3)
    // })



    // // observable (observador)
    // this.myObservableSubscription = myObservable.subscribe(
    //   (param: number) =>  console.log(param + 10),
    //   (erro: string) => { console.log(erro)},
    //   () => console.log('Stream de eventos foi finalizada')
    // )

  }


  ngOnDestroy(){

    // this.myObservableSubscription.unsubscribe();
    // this.timeObservableSubscription.unsubscribe();

  }


  // ngOnInit já recebe o object oferta, que é passado para o template, por não é necessário envia-lo de volta
  // public adicionarItemCarrinho(oferta: Oferta): void {

  //   console.log(oferta);
    
  // }


  public adicionarItemCarrinho(): void {

    this.carrinhoService.incluirItem(this.oferta);
    console.log(this.carrinhoService.exibirItens());
    
  }





}

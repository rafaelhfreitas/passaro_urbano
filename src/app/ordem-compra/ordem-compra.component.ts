import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { OrdemCompraService } from '../ordem-compra.service';
import { CarrinhoService } from '../carrinho.service';

import { Pedido } from '../shared/pedido.model';
import { ItemCarrinho } from 'app/shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {
  
  public idPedidoCompra : number;
  public itensCarrinho: ItemCarrinho[] = [];
  
  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  });

  constructor(
      private ordemCompraService: OrdemCompraService,
      private carrinhoService: CarrinhoService) { }

  ngOnInit() {

    // console.log('Itens carrinho: ', this.carrinhoService.exibirItens());
    this.itensCarrinho =   this.carrinhoService.exibirItens();
    console.log(this.itensCarrinho);
    
  }

  public confirmarCompra(): void {
    if (this.formulario.status === "INVALID") {

      console.log(this.formulario.status);
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();
    
    } else {

      if(this.carrinhoService.exibirItens().length === 0) {
        
        alert('Você não selecionou nenhum item');

      } else {

        console.log('formulário está válido ')
        let pedido = new Pedido(
            
            // this.formulario.get('endereco').value,
            // this.formulario.get('numero').value,
            // this.formulario.get('complemento').value,
            // this.formulario.get('formaPagamento').value
  
            this.formulario.value.endereco,
            this.formulario.value.numero,
            this.formulario.value.complemento,
            this.formulario.value.formaPagamento,
            this.carrinhoService.exibirItens()
        );


        this.ordemCompraService.efetivarCompra(pedido).subscribe(
          (idPedidoCompra: number) => {
            // console.log(idPedidoCompra);
            this.idPedidoCompra = idPedidoCompra;
            this.carrinhoService.limparCarrinho();
  
          });
      }


    }
  }

  public adicionar(item: ItemCarrinho):void {
    this.carrinhoService.adicionarQuantidade(item);

  }

  public diminuir(item: ItemCarrinho):void {
    this.carrinhoService.diminuirQuantidade(item);

  }


}

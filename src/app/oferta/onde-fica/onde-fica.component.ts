import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService) 
  { }

  ngOnInit() {

    this.route.parent.params.subscribe((params: Params) => {
      this.ofertasService.getOndeFicaOfertaPorId(params.id)
        .then((response: string) => {
          this.ondeFica = response
        })
    })
    //console.log(this.route.parent.snapshot.params['id'])
  }

}

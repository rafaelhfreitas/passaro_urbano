import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css']
})
export class ComoUsarComponent implements OnInit {


  public comoUsar: string = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService) { }

  ngOnInit() {

    this.route.parent.params.subscribe((params: Params) =>{
      this.ofertasService.getComoUsarOfertaPorId(params.id)
        .then((response: string) => {
          this.comoUsar = response
        })

    })

    //console.log(this.route.parent.snapshot.params['id'])
  }

}

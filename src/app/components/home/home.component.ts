import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }

  
  constructor(private router: Router){}

  public onSearch() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "firstname": "Nic",
        "lastname": "Raboy"
      }
    };
    this.router.navigate(["/pesquisar"], navigationExtras);
  }

  product = [
    {
      name: "Apple Watch",
      price: "50,00",
      image: "https://i.imgur.com/V3fhXFo.jpg"
    },
    {
      name: "Xiaomi Redmi Note 9 64GB 3GB RAM - Versão Global - Midnight Grey",
      price: "50,00",
      image: "https://i.imgur.com/Mcnl6KW.jpg"
    },
    {
      name: "Playstation 5",
      price: "1200,00",
      image: "https://i.imgur.com/4w9vIOO.jpg"
    },
    {
      name: "Samsung Smart TV QLED 8K Q950TS 85, Sem bordas, Processador com IA, Única Conexão e Suporte No-Gap, Alexa built in, Som em Movimento, Modo Ambiente",
      price: "980,00",
      image: "https://i.imgur.com/iHnY6LL.jpg"
    },
    {
      name: "Furadeira Impacto BlackDecker 560w TM500 110V + Kit ferramentas 129 peças - Black Decker",
      price: "40,00",
      image: "https://i.pinimg.com/474x/3a/fd/cd/3afdcd444310202ba0337ed4ec8328c2.jpg"
    },
    {
      name: "Fone de Ouvido JBL",
      price: "5,00",
      image: "https://www.extra-imagens.com.br/acessorioseinovacoes/FonesdeOuvido/12531641/895071928/fone-de-ouvido-sem-fio-jbl-t110bt-preto-12531641.jpg"
    },
    {
      name: "Mouse Gamer Dpi 2400 Preto/Laranja Multilaser - MO270",
      price: "20,00",
      image: "https://images-na.ssl-images-amazon.com/images/I/613bhsrtc4L._AC_SX466_.jpg"
    },
    {
      name: "Fogão 4 bocas",
      price: "50,00",
      image: "https://images.colombo.com.br/produtos/778232/778232_fogao_atlas_fastcook_4bc_0_z.jpg?ims=450x450"
    }
  ]

}

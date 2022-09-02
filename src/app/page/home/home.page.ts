import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contatos } from '../../models/contatos';
import { ContatosService } from '../../services/contatos.service';
//controle da pagina , base para o html funcionar

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   contatos: Contatos[];

   //get em contatos
  constructor(private route: Router, private contatoService : ContatosService) {
    this.contatos= this.contatoService.contatos;
  }

  irParaCadastrar(){
    this.route.navigate(["/cadastrar"]);
  }

  irParaDetalhar(contato:Contatos){
    //passa o estado do objeto inteiro de contato,
    this.route.navigateByUrl("/detalhar",{state:{objeto:contato}});
  }

}

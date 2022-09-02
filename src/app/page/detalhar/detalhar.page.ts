import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contatos } from 'src/app/models/contatos';
import { ContatosService } from 'src/app/services/contatos.service';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  contato:Contatos;
  nome:string;
  telefone:number;
  genero: string;
  data_nacimento: string;
  data: string;
  edicao: boolean = true;

  constructor(private alertController: AlertController,
    private router: Router,
    private contatoService: ContatosService) { }

  ngOnInit() {
    this.data = new Date().toISOString();
    const nav = this.router.getCurrentNavigation();
    this.contato=nav.extras.state.objeto;
    this.nome = this.contato.nome;
    this.telefone = this.contato.telefone;
    this.genero = this.contato.genero;
    this.data_nacimento = this.contato.data_nacimento;
        
  }
  async presentA(cabecalho : string, subcabecalho: string,mensagem : string) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: mensagem,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentAlert(cabecalho : string, subcabecalho: string,mensagem : string) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: mensagem,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentAlertConfirm(cabecalho : string, subcabecalho: string,mensagem : string) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: mensagem,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.excluirContato();
          },
        },
      ],
    });

    await alert.present();
  }

  alterarEdicao(){
    if(this.edicao == true){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  private validar(campo: any): boolean{
    if(!campo){
      return false;
    }
    return true;
  }

  editar(){
    this.data_nacimento = this.data_nacimento.split('T')[0];
    if((this.validar(this.nome)) && this.validar(this.telefone) &&
    this.validar(this.genero) && this.validar(this.data_nacimento)){
      if(this.contatoService.editar(this.contato,
        this.nome, this.telefone, this.genero, this.data_nacimento)){
          this.presentAlert("Agenda", "Sucesso", "Edição efetuado com Sucesso!");
          this.router.navigate(["/home"]);
      }else{
        this.presentAlert("Agenda", "Error", "Contato não encontrado!");
      }
    }
    else{
      this.presentAlert("Agenda", "Error", "Todos os campos são obrigatórios!");
    }
  }
  excluir(){
    this.presentAlertConfirm("Agenda","Excluir Contato",
    "Você realmente deseja excluir o contato?");
  }

  private excluirContato(){
    if(this.contatoService.excluir(this.contato)){
      this.presentAlert("Agenda","Excluir","Exclusão realizada!");
      this.router.navigate(["/home"]);
    }
    else{
      this.presentAlert("Agenda","Excluir","Contato não encontrado!");
    }
  }

  irParaHome(){
    this.router.navigate(["/home"]);
  }

  

}

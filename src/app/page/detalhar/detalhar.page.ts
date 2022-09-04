import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  data: string;
  edicao: boolean = true;
  form_detalhar: FormGroup;
  isSubmitted: boolean = false;

  constructor(private alertController: AlertController,
    private router: Router,
    private contatoService: ContatosService,
    private FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.data = new Date().toISOString();
    const nav = this.router.getCurrentNavigation();
    this.contato=nav.extras.state.objeto;
    this.form_detalhar= this.FormBuilder.group({
    nome:["this.contato.nome",[Validators.required]],
    telefone:["this.contato.telefone",[Validators.required,Validators.minLength(10)]],//2 validador
    genero:["this.contato.genero",[Validators.required]],
    data_nacimento:["this.contato.data_nacimento",[Validators.required]]
    }); 
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


  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.form_detalhar.valid){//se nega se é valido, conteudo nao conrrespondido
      this.presentAlert("Agenda","Erro","Contato não encontrado");
      return false;
    }else{//caso deu certo
      this.editar();
    }
  }
  editar(){
    this.presentAlert("Agenda", "Sucesso", "Edição efetuado com Sucesso!");
    this.router.navigate(["/home"]);
  }

  excluir(){
    this.presentAlertConfirm("Agenda","Excluir Contato",
    "Você realmente deseja excluir o contato?");
  }

  private excluirContato(){
    if(this.contatoService.excluir(this.form_detalhar.value)){
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

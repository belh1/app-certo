import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contatos } from '../../models/contatos';
import { ContatosService } from '../../services/contatos.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  data: string;
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;
  
  constructor(private alertController: AlertController, 
    private router:Router, 
    private contatoService: ContatosService,
    private FormBuilder: FormBuilder) { }

//metodo chamado toda vez que inicia a pagina
  ngOnInit() {
    //inicializar o form/campo de array,primeira parte inicializacao,2 validador
    this.form_cadastrar = this.FormBuilder.group({
      nome:["",[Validators.required]],
      telefone:["",[Validators.required,Validators.minLength(10)]],//2 validador
      genero:["",[Validators.required]],
      data_nacimento:["",[Validators.required]]
    });
    this.data = new Date().toISOString();
  }
  get errorControl(){
    return this.form_cadastrar.controls;//retornar os erros
  }

  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){//se nega se é valido, conteudo nao conrrespondido
      this.presentAlert("Agenda","Erro","Todos os campos são obrigatorios");
      return false;
    }else{//caso deu certo
      this.cadastrar();
    }
  }


  //cadastra contatos
  private cadastrar(): void{
      this.contatoService.inserir(this.form_cadastrar.value);//inserir espera o contato e o campos de form
      this.presentAlert("Agenda","Sucesso","Cadastro realizado");//msg de sucesso dps de preencher todos os dados
      this.router.navigate(["/home"]);//volta para home
    }
  


 
  //vai executar ate que seja exibido a mensagem,(diparar o await)
  //funcao generica 
  async presentAlert(header : string,  subHeader: string,message : string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader:  subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  irParaHome(){
    this.router.navigate(["/home"]);
  }
  

}

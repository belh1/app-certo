import { Injectable } from '@angular/core';
import { Contatos } from '../models/contatos';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {
  //armazenar uma array de contatos,inicializando com vazio
  private _contatos:Contatos[]= []

  constructor() {
    let contato = new Contatos("Teste", 123,"masculino","2022-08-10");
    this.inserir(contato);
   }

  public get contatos(): Contatos[]{
    return this._contatos
  }
  //
  public inserir(contato: Contatos): void{
    this._contatos.push(contato);
  }

  public editar(contato: Contatos, nome:string, telefone: number, genero: string, data_nacimento:string): boolean{
    for(let i=0; i<this._contatos.length; i++){
      if(this._contatos[i].id == contato.id){
        this._contatos[i].nome = nome;
        this._contatos[i].telefone = telefone;
        this._contatos[i].genero = genero;
        this._contatos[i].data_nacimento = data_nacimento;
        return true;
      }
    }
    return false;
  }

  public excluir(contato: Contatos): boolean{
    for(let i=0; i<this._contatos.length; i++){
      if(this._contatos[i].id == contato.id){
        this._contatos.splice(i, 1);
        return true;
      }
    }
    return false;
  }

}

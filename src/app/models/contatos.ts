//classe para contatos/estrutura modela o contato
export class Contatos {
    private _id: any;
    private _nome: string;
    private _telefone :number;
    private _genero: string;
    private _data_nacimento: string;


    constructor(nome: string, telefone:  number, genero: string, data_nacimento: string){
        let chave = new Date;
        this._id = chave.getTime();

        this._nome= nome;
        this._telefone= telefone;
        this._genero = genero;
        this._data_nacimento = data_nacimento;
    }
    public get id(): any{
        return this._id;
      }
      
    public set nome(nome: string){
        this._nome= nome;
    }
    public get nome(): string{
        return this._nome;
    }
    public set telefone(telefone: number){
        this._telefone= telefone;
    }
    public get telefone(): number{
        return this._telefone;
    }
    public set genero(genero: string){
        this._genero= genero;
    }
    public get genero(): string{
        return this._genero;
    }
    public set data_nacimento(data_nacimento: string){
        this._data_nacimento= data_nacimento;
    }
    public get data_nacimento(): string{
        return this._data_nacimento;
    }

}

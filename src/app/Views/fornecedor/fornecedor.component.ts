import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Provider } from 'src/app/Models/Provider';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  fornecedores:any;
  cnpj:any;
  nome:any;
  fone:any;
  email:any;
  nomeEmpresa:any;
  provider!:Provider;
  botaoAdd !: boolean;
  botaoUpdate !: boolean;
  @ViewChild('providerForm') form !: NgForm;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getFornecedores();
  }

  postFornecedores() {
    var provider = {name:this.nome,cnpj:this.cnpj,phone:this.fone,email:this.email,nameCompany:this.nomeEmpresa} ;

      this.http.post(`${environment.apibaseURL}api/Provider`, provider)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.getFornecedores();
         
          let ref = document.getElementById('closer')
          ref?.click();
          
        },
        erro => {
          if(erro.status == 400) {
            console.log(erro);
          }
        }
      );
    
  }

  getFornecedores(){
    this.http.get(`${environment.apibaseURL}api/Provider`)
    .subscribe(response => {
      this.fornecedores = response
      console.log(this.fornecedores)

    });
  }

  excluir(provider:Provider,template:any){
    console.log(provider);
    this.provider=provider;
    
}

excluirFornecedor(template:any){
  this.http.delete(`${environment.apibaseURL}api/Provider/${this.provider.id}`)
            .subscribe(
              () => {
                this.getFornecedores();
                let ref = document.getElementById('cancel')
                ref?.click();
                
              },
              erro => {
                if(erro.status == 404) {
                  console.log('Fornecedor não localizado.');
                }
              }
            );
}

editarFornecedor(provider:Provider,template:any){
  this.botaoAdd = false;
  this.botaoUpdate = true;
  console.log(provider);
  this.provider=provider;

}

editarFornecedorUpdate(template:any){
  var provider = {id:this.provider.id,name:this.nome,cnpj:this.cnpj,phone:this.fone,email:this.email,nameCompany:this.nomeEmpresa} ;
  this.http.put(`${environment.apibaseURL}api/Provider/${provider.id}`, provider)
  .subscribe(
    resultado => {
      console.log(resultado);
      this.getFornecedores();
      this.form.reset();
      let ref = document.getElementById('closer');
      ref?.click();
      
    },
    erro => {
      if(erro.status == 400) {
        console.log(erro);
      }
    }
  );
}

escondeBotao(){
  this.botaoAdd = true;
  this.botaoUpdate = false;
}

}

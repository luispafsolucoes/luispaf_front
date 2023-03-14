import { LoginService } from './../../login/login.service';
import { Cidade } from '../../../model/Cidade';
import { Router, ActivatedRoute } from '@angular/router';
import { CidadeService } from './../cidade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cidade-update',
  templateUrl: './cidade-update.component.html',
  styleUrls: ['./cidade-update.component.css']
})
export class CidadeUpdateComponent implements OnInit {

  cidade: Cidade =  new Cidade(null,null,null);
  idParaAlterar: number;

  constructor(
    private cidadeService: CidadeService, 
    private router: Router, 
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.usuarioLogado();
    this.idParaAlterar = Number( this.route.snapshot.paramMap.get('id'));
    this.getById(this.idParaAlterar);
  }

  getById(id: number) {
    this.cidadeService.buscar(new Cidade(id, null, null)).then((listagem: any)  => {
      if (listagem && listagem.length > 0) {
        this.cidade = listagem[0];
      }
    }).catch(erro => {
      console.log("Erro ao buscar por ID");
    });
  }

  cancelar() {
    this.router.navigate(['/cidade']);
  }

  atualizar() {
    if (this.cidadeService.validaCampos(this.cidade)) {
      this.cidadeService.salvar(this.cidade).then(resposta => {  
        this.router.navigate(['/cidade']);
      this.cidadeService.showMessage("Registro alterado com sucesso!");      
      }).catch(error => {
        this.cidadeService.showMessage("Erro ao alterar registro: " + error);
      });
    }
  }

  uperCaseAndTrim_nome(value: string) {
    this.cidade.nome = value.trim().toUpperCase();
  }

  uperCaseAndTrim_uf(value: string) {
    this.cidade.uf = value.trim().toUpperCase();
  }
}

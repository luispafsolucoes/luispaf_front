import { LoginService } from './../../login/login.service';
import { CidadeService } from './../cidade.service';
import { Cidade } from '../../../model/Cidade';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cidade-create',
  templateUrl: './cidade-create.component.html',
  styleUrls: ['./cidade-create.component.css']
})
export class CidadeCreateComponent  implements OnInit {

  cidade: Cidade = new Cidade(null,null,null);

  constructor(
    private cidadeService: CidadeService, 
    private router: Router, 
    private route: ActivatedRoute,
    private loginService: LoginService) {}

    ngOnInit(): void { 
      this.loginService.usuarioLogado(); 
     }

  criarCidade(): void {
    if (this.cidadeService.validaCampos(this.cidade)) {
      this.cidadeService.salvar(this.cidade).then(resposta => {  
      this.cidade = new Cidade(null,null,null);
      this.cidadeService.showMessage("Registro salvo com sucesso!");      
    }).catch(error => {
      this.cidadeService.showMessage("Erro ao salvar registro: " + error);
    });
    }
  }

  public cancelar(): void {
    this.router.navigate(['/cidade']);
  }

  uperCaseAndTrim_nome(value: string) {
    this.cidade.nome = value.trim().toUpperCase();
  }

  uperCaseAndTrim_uf(value: string) {
    this.cidade.uf = value.trim().toUpperCase();
  }
}

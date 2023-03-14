import { LoginService } from './../../login/login.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CidadeService } from './../cidade.service';
import { Component, OnInit } from '@angular/core';
import { Cidade } from '../../../model/Cidade';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cidade-delete',
  templateUrl: './cidade-delete.component.html',
  styleUrls: ['./cidade-delete.component.css']
})
export class CidadeDeleteComponent implements OnInit {

  cidade: Cidade =  new Cidade(null,null,null);
  idParaDeletar: number;

  constructor(
    private cidadeService: CidadeService, 
    private router: Router, 
    private route: ActivatedRoute,
    private loginService: LoginService) {}

    ngOnInit(): void {
      this.loginService.usuarioLogado();
      this.idParaDeletar = Number( this.route.snapshot.paramMap.get('id'));
      this.getById(this.idParaDeletar);
    }

  deletar() {
    this.cidadeService.deletar(this.idParaDeletar).then(resposta => {
      this.cidadeService.showMessage('Registro deletado com sucesso!');
      this.router.navigate(['/cidade']);
    }).catch(erro => {
      this.cidadeService.showMessage('Erro ao excluir registro: ' + erro);
    });
  }


  cancelar() {
    this.router.navigate(['/cidade']);
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
}

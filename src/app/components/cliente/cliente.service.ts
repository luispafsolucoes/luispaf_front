import { QueryBuilder } from './../_util/pagination';
import { environment } from './../../../environments/environment';
import { Cliente } from './../../model/Cliente';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { ValidationUtils } from '../_util/ValidationUtils.util';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly PATH: string = 'cliente/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  salvar(cliente: Cliente) {
    debugger;
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "salvar", cliente, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  atualizar(cliente: Cliente) {
    debugger;
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "atualizar", cliente, {}).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  listar(queryBuilser: QueryBuilder) {
    debugger;
    const url = this.getUrl(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);

    return new Promise((retorno, erro) => {
      this.http.get(url).subscribe(
        (listagem: any) => {
          debugger;
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error)
        });
    })   
  }

  filtrarPage(queryBuilser: QueryBuilder, entity: Cliente) {
    debugger;
    const url = this.getUrlFiltroPage(queryBuilser.pageQuery.pageNumber, 
                            queryBuilser.pageQuery.pageSize, 
                            queryBuilser.sortQuery.property);
    return new Promise((retorno, erro) => {
      this.http.post(url, entity, {}).subscribe(
        (listagem: any) => {
          debugger;
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  getUrlFiltroPage(page: number, size: number, sortValue: string): string {
    return environment.baseUrl + this.PATH + `filtrarPage?page=${page}&size=${size}&sort=${sortValue}`
  }

  getUrl(page: number, size: number, sortValue: string): string {
    return environment.baseUrl + this.PATH + `todos?page=${page}&size=${size}&sort=${sortValue}`
  }

  buscar(cliente: Cliente) {
    debugger;
    return new Promise((retorno, erro) => {
      this.http.post(environment.baseUrl + this.PATH + "filtrar", cliente, {}).subscribe(
        (listagem: any) => {
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  public deletar(id: number) {
    debugger;
    return new Promise((retorno, erro) => {
      this.http.delete( environment.baseUrl + this.PATH + id).subscribe(
        ret => {
          retorno(ret);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }

  validarCampos(cliente: Cliente) {
    debugger;
    if (!cliente.nome) {
      this.showMessage("Nome é obrigatório!");
      return false;
    }

    if (cliente.email) {
      if (cliente.email.indexOf('@') < 0) {
        this.showMessage("E-mail invalido!");
        return false;
      }      
    }

    if (!cliente.endereco) {
      this.showMessage("Endereço é obrigatório!");
      return false;
    }

    if (!cliente.codigoCidade) {
      this.showMessage("Cidade é obrigatório!");
      return false;
    }

    if (!cliente.telefone1) {
      this.showMessage("Telefone-1 é obrigatório!");
      return false;
    }

    if (!cliente.cpf) {
      this.showMessage("CPF é obrigatório!");
      return false;
    }

    if (!ValidationUtils.isValidCpf(cliente.cpf)) {
      this.showMessage("CPF inválido!");
      return false;
    }  
   
    return true;
  }

   /*todos sem paginação usado para os select fields*/
   public listarTodos() {
    debugger;
    return new Promise((retorno, erro) => {
      this.http.get(environment.baseUrl + this.PATH + "listar").subscribe(
        (listagem: any) => {
          retorno(listagem);
        },
        (error: any) => {
          erro(error.error);
        }
      );
    });
  }
}

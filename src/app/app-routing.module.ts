import { AgendamentoReadComponent } from './components/agendamentos/agendamento-read/agendamento-read.component';
import { AgendamentoComponent } from './components/agendamentos/agendamento/agendamento.component';
import { LogoutComponent } from './components/logout/logout/logout.component';
import { RelatorioReadComponent } from './components/relatorio/relatorio-read/relatorio-read.component';
import { CaixaCreateComponent } from './components/caixa/caixa-create/caixa-create.component';
import { VpacoteItensComponent } from './components/vpacote/vpacote-itens/vpacote-itens.component';
import { VpacoteCreateComponent } from './components/vpacote/vpacote-create/vpacote-create.component';
import { VprodutoUpdateComponent } from './components/vproduto/vproduto-update/vproduto-update.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadeCreateComponent } from './components/cidade/cidade-create/cidade-create.component';
import { CidadeDeleteComponent } from './components/cidade/cidade-delete/cidade-delete.component';
import { CidadeReadComponent } from './components/cidade/cidade-read/cidade-read.component';
import { CidadeUpdateComponent } from './components/cidade/cidade-update/cidade-update.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { ClienteUpdadeComponent } from './components/cliente/cliente-updade/cliente-updade.component';
import { LoginComponent } from './components/login/login/login.component';
import { PacoteCreateComponent } from './components/pacote/pacote-create/pacote-create.component';
import { PacoteReadComponent } from './components/pacote/pacote-read/pacote-read.component';
import { PacoteUpdateComponent } from './components/pacote/pacote-update/pacote-update.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ProdutoReadComponent } from './components/produto/produto-read/produto-read.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { VprodutoCreateComponent } from './components/vproduto/vproduto-create/vproduto-create.component';
import { VprodutoReadComponent } from './components/vproduto/vproduto-read/vproduto-read.component';

import { HomeComponent } from './views/home/home.component';
import { VpacoteComponent } from './components/vpacote/vpacote-read/vpacote.component';

const routes: Routes = [
  {
    path: "telaPrincipal",
    component: HomeComponent
  },
  {
    path: "cidade",
    component: CidadeReadComponent
  },
  {
    path: "cidade/create",
    component: CidadeCreateComponent
  },
  {
    path: "cidade/delete/:id",
    component: CidadeDeleteComponent
  },
  {
    path: "cidade/update/:id",
    component: CidadeUpdateComponent
  },
  {
    path: "cliente",
    component: ClienteReadComponent
  },
  {
    path: "cliente/create",
    component: ClienteCreateComponent
  },
  {
    path: "cliente/delete/:id",
    component: ClienteDeleteComponent
  },
  {
    path: "cliente/update/:id",
    component: ClienteUpdadeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "produto",
    component: ProdutoReadComponent
  },
  {
    path: "produto/create",
    component: ProdutoCreateComponent
  },
  {
    path: "produto/update/:id",
    component: ProdutoUpdateComponent
  },
  {
    path: "pacote",
    component: PacoteReadComponent
  },
  {
    path: "pacote/create",
    component: PacoteCreateComponent
  },
  {
    path: "pacote/update/:id",
    component: PacoteUpdateComponent
  },
  {
    path: "vproduto/create",
    component: VprodutoCreateComponent
  },
  {
    path: "vproduto",
    component: VprodutoReadComponent
  },
  {
    path: "vproduto/update/:id",
    component: VprodutoUpdateComponent
  },
  {
    path: "vpacote",
    component: VpacoteComponent
  },
  {
    path: "vpacote/create",
    component: VpacoteCreateComponent
  },
  {
    path: "vpacote/itens/:id",
    component: VpacoteItensComponent
  },
  {
    path: "caixa",
    component: CaixaCreateComponent
  },
  {
    path: "relatorio",
    component: RelatorioReadComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: "agendamento",
    component: AgendamentoComponent
  },
  {
    path: "agendamentoRead",
    component: AgendamentoReadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBoardComponent } from './add-board/add-board.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { AddListComponent } from './add-list/add-list.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { AddCardComponent } from './add-card/add-card.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: BoardDetailsComponent },
  { path: 'listdetail/:id', component: ListDetailsComponent },
  { path: 'addboard', component: AddBoardComponent },
  { path: 'addList/:id', component: AddListComponent },
  { path: 'addCard/:id', component: AddCardComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

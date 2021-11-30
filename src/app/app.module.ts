import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms'; 
import {MatDividerModule} from '@angular/material/divider';
import { AddBoardComponent } from './add-board/add-board.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { AddListComponent } from './add-list/add-list.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { AddCardComponent } from './add-card/add-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateBoardComponent } from './update-board/update-board.component';
import { UpdateListComponent } from './update-list/update-list.component';
import { UpdateCardComponent } from './update-card/update-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddBoardComponent,
    BoardDetailsComponent,
    AddListComponent,
    ListDetailsComponent,
    AddCardComponent,
    UpdateBoardComponent,
    UpdateListComponent,
    UpdateCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

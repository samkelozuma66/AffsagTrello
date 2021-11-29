import { Component, OnInit , Input , Inject} from '@angular/core';
import { BoardService } from '../board.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { board } from '../board';
import { TrelloService } from '../trello.service';
import { list } from '../list';
import { Router } from '@angular/router';
import { card } from '../card';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {


  id:string = String(this.route.snapshot.paramMap.get('id'));
  @Input() list?: list;
  @Input() cards: card[] = [];

  resp:Object = "";

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private location: Location,
    private trelloService: TrelloService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(){
    this.trelloService.getCards(this.id).subscribe(cards => this.cards = cards,
                                                   error => {this.router.navigateByUrl('/');});
  }
  deleteCard(cardId:string,index:number){
    this.trelloService.deleteCard(cardId).subscribe(resp  => {this.resp = resp; this.getCards();},
                                                    error => {this.router.navigateByUrl('/');});

  }
  goBack(): void {
    this.location.back();
  }
 
}


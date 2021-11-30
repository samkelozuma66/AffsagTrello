import { Component, OnInit , Input} from '@angular/core';
import { BoardService } from '../board.service';
import { board } from '../board';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TrelloService } from '../trello.service';
import { ActivatedRoute } from '@angular/router';
import { card } from '../card';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.css']
})
export class UpdateCardComponent implements OnInit {

  id:string = String(this.route.snapshot.paramMap.get('id'));
  @Input() card?: card; 
  resp:Object = "";
  @Input() error:string = "";

  constructor(private route: ActivatedRoute,
              private boardService: BoardService,
              private router: Router,
              private location: Location,
              private trelloService: TrelloService) { }

  ngOnInit(): void {
    this.getCard();
  }
  goBack(): void {
    this.location.back();
  }
  getCard(){
    this.boardService.getCard(this.id).subscribe(card => {this.card = card},
                                                 error => {this.goBack();});
  }
  updateCard(){
    if(this.card)
    this.boardService.upadateCard(this.id,this.card.name,this.card.closed).subscribe(repson => {this.resp = repson; this.goBack();},
                                                                                     error  => {this.goBack();});
    
  }
  closeCard(){
    if(this.card){
      if(this.card.name == ""){
      this.error = "BOARD NAME IS REQUIRED";
        return;
      }  
      this.boardService.upadateCard(this.id,this.card.name,true).subscribe(repson => {this.resp = repson; this.goBack();},
                                                                         error  => {this.goBack();});
    }
    
  }
}

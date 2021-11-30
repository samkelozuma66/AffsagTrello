import { Component, OnInit , Input} from '@angular/core';
import { BoardService } from '../board.service';
import { board } from '../board';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TrelloService } from '../trello.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  id:string = String(this.route.snapshot.paramMap.get('id'));
  @Input() name: string = ""; 
  resp:Object = "";
  @Input() error:string = "";

  constructor(private route: ActivatedRoute,
              private boardService: BoardService,
              private router: Router,
              private location: Location,
              private trelloService: TrelloService) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  createCard(){
    if(this.name == ""){
      this.error = "CARD NAME IS REQUIRED";
      return;
    } 
    this.boardService.createCard(this.id,this.name).subscribe(repson => {this.resp = repson; this.goBack();});
    
  }
}

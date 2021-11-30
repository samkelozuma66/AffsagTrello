import { Component, OnInit , Input} from '@angular/core';
import { BoardService } from '../board.service';
import { board } from '../board';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TrelloService } from '../trello.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {

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

  createList(){
    if(this.name == ""){
      this.error = "LIST NAME IS REQUIRED";
      return;
    } 
    this.boardService.createList(this.id,this.name).subscribe(repson => {this.resp = repson;this.goBack()});
  }
}

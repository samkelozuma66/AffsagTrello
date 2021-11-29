import { Component, OnInit , Input } from '@angular/core';
import { BoardService } from '../board.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { board } from '../board';
import { TrelloService } from '../trello.service';
import { list } from '../list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {

  id:string = String(this.route.snapshot.paramMap.get('id'));
  @Input() board?: board;
  @Input() lists: list[] = [];

  resp:Object = "";

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private location: Location,
    private trelloService: TrelloService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBoard();
    this.getList();
  }
  getBoard(): void {
    
    this.boardService.getBoard(this.id)
      .subscribe(board => {this.board = board; this.boardCheck()},
                 error => {this.router.navigateByUrl('/');});
  }
  getList(){
    this.trelloService.getList(this.id).subscribe(lists => this.lists = lists,
                                                  error => {this.router.navigateByUrl('/');});
  }
  achiveList(listId:string,index:number){
    this.boardService.achiveList(listId).subscribe(repson => {this.resp = repson;this.getList()},
                                                   error  => {this.router.navigateByUrl('/');});
   
  }
  boardCheck(){
    if(!this.board){
      
      this.router.navigateByUrl('/');
    }
  }
  goBack(): void {
    this.location.back();
  }
}

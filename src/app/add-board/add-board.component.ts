import { Component, OnInit ,Input} from '@angular/core';
import { BoardService } from '../board.service';
import { board } from '../board';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.css']
})
export class AddBoardComponent implements OnInit {

  @Input() name: string = ""; 
  @Input() description: string = ""; 
  resp:Object = "";

  boards:board[] = [] ;
  constructor(private boardService: BoardService,private router: Router,private location: Location) { }

  ngOnInit(): void {
    this.boards = this.boardService.boards;
  }
  goBack(): void {
    this.location.back();
  }
  createBoard(){
    this.boardService.createBoard(this.name,this.description).subscribe(repson => {this.resp = repson;this.goBack()}) ;
  }

}

import { Component, OnInit , Input} from '@angular/core';
import { BoardService } from '../board.service';
import { board } from '../board';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-board',
  templateUrl: './update-board.component.html',
  styleUrls: ['./update-board.component.css']
})
export class UpdateBoardComponent implements OnInit {

  id:string = String(this.route.snapshot.paramMap.get('id'));
  @Input() name: string = ""; 
  @Input() description: string = ""; 
  resp:Object = "";

  @Input() board?: board ;

  constructor(private route: ActivatedRoute,private boardService: BoardService,private router: Router,private location: Location) { }

  ngOnInit(): void {
    this.getBoard();
  }
  goBack(): void {
    this.location.back();
  }
  getBoard(){
    this.boardService.getBoard(this.id).subscribe(board => {this.board = board; this.updateInput();},
                                                  error => {});
  }
  updateInput(){

  }
  upadateBoard(){
    if(this.board)
    this.boardService.upadateBoard(this.id,this.board.name,this.board.desc).subscribe(resp => {this.resp = resp; this.goBack();},
                                                  error => {});
  }
}

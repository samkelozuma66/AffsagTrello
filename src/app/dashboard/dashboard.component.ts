import { Component, OnInit , Input} from '@angular/core';
import { BoardService } from '../board.service';
import { board } from '../board';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  localBoards: board[] = [];
  @Input() boards: board[] = [];

  constructor(private boardService: BoardService,private router: Router) { }

  @Input() key: string = ""; 

  ngOnInit(): void {
    this.getBoards();
    
  }

  deleteBoard(boardId:string,index:number){
    this.boardService.deleteBoard(boardId);
    this.boards.splice(index,1);
  }
  getBoards(){
    this.boardService.getBoardsCom().subscribe(boards => {this.boards = boards;this.boardService.updateBoad(this.boards)},
                                               error  => {this.router.navigateByUrl('/');});
  }


}

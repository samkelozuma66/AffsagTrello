import { Component , Input} from '@angular/core';
import { TrelloService } from './trello.service';
import { BoardService } from './board.service';
import { Router } from '@angular/router';
import { board } from './board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'affsagTrello';

  @Input() key: string = ""; 
  @Input() token: string = ""; 
  boards:board[] = [] ;
  @Input() error:string = "";
  constructor(private trelloService: TrelloService, private boardService: BoardService,private router: Router) { }

  getBoards(): void{
    this.trelloService.getBoards(this.key,this.token)
      .subscribe(boards => {this.boards = boards;this.update();this.error="";},error => {this.error = error.error;this.router.navigateByUrl('/');}) ;

    

  }
  update(){
    console.log(this.boards);
    this.boardService.updateBoad(this.boards);
    this.router.navigateByUrl('/dashboard');
  }
}


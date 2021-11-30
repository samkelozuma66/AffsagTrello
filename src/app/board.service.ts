import { Injectable } from '@angular/core';
import { board } from './board';
import { TrelloService } from './trello.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { list } from './list';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boards:board[] = [] ;
  resp:Object = "";
  constructor(private trelloService: TrelloService,private router: Router) { }
  updateBoad(boards:board[] ){
    this.boards = boards;
    console.log("this.boards");
    console.log(this.boards);
  }
  deleteBoard(boardId:string){
    
    this.trelloService.deleteBoard(boardId).subscribe(repson => {this.resp = repson;this.updateResponse()}) ;

  }
  achiveList(listId:string): Observable<Object> {
    
    //this.trelloService.achiveList(listId).subscribe(repson => {this.resp = repson;this.updateResponse()}) ;
    return this.trelloService.achiveList(listId);
  }
  createBoard(boardName:string,boardDesc:string): Observable<Object> {
    
    return this.trelloService.createBoard(boardName,boardDesc);

  }
  upadateBoard(boardId:string,boardName:string,boardDesc:string): Observable<Object> {
    
    return this.trelloService.upadateBoard(boardId,boardName,boardDesc);

  }
  upadateList(listId:string,listName:string,listClosed:boolean): Observable<Object> {
    
    return this.trelloService.upadateList(listId,listName,listClosed);

  }
  upadateCard(cardId:string,cardName:string,cardClosed:boolean): Observable<Object> {
    
    return this.trelloService.upadateCard(cardId,cardName,cardClosed);

  }
  createList(boardId:string,listName: string): Observable<Object>{
    return this.trelloService.createList(boardId,listName) ;
  }
  createCard(listId:string,cardName: string) : Observable<Object>{
    return this.trelloService.createCard(listId,cardName) ;
  }
  getBoards(): void{
    this.trelloService.getBoards(this.trelloService.apiKey,this.trelloService.apiToken)
      .subscribe(boards => {this.boards = boards;this.updateBoad(boards)}) ;
  }
  getList(listId:string): Observable<list>{
    return this.trelloService.getLists(listId)
      ;
  }  
  getBoardsCom():  Observable<board[]>{
    return this.trelloService.getBoards(this.trelloService.apiKey,this.trelloService.apiToken)
      ;
  }
  getBoard(id: string): Observable<board> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const board = this.boards.find(h => h.id === id)!;
    //this.log(`HeroService: fetched hero id=${id}`);
    return of(board);
  }
  updateResponse(){
    console.log(this.resp.hasOwnProperty("_value"));
    console.log(this.resp);
    if(this.resp.hasOwnProperty("_value")){
      
      this.getBoards();
    }
    else{
      this.getBoards();
      //this.router.navigateByUrl('/dashboard');
    }
    //if(typeof this.resp )}

  }
}

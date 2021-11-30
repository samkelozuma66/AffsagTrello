import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { board } from './board';
import { list } from './list';
import { card } from './card';

@Injectable({
  providedIn: 'root'
})
export class TrelloService {

  private trelloUrl = 'https://api.trello.com/1/members/me/boards?';  // URL to web api
  apiKey:string = "";
  apiToken:string = "";
  constructor(private http: HttpClient) { }

  getCards(listId:string): Observable<card[]>{
    const cardsUrl = "https://api.trello.com/1/lists/" + listId + "/cards" + "?key=" + this.apiKey + "&token=" + this.apiToken;
    return this.http.get<card[]>(cardsUrl);
  }
  getList(boardId:string): Observable<list[]>{
    const listUrl = "https://api.trello.com/1/boards/" + boardId + "/lists" + "?fields=all&key=" + this.apiKey + "&token=" + this.apiToken;
    return this.http.get<list[]>(listUrl);
  }
  getCard(cardId:string): Observable<card>{
    const listUrl = "https://api.trello.com/1/cards/" + cardId + "?key=" + this.apiKey + "&token=" + this.apiToken;
    return this.http.get<card>(listUrl);
  }
  getBoards(key: string , token: string): Observable<board[]>{
    const fullUrl = this.trelloUrl + "key=" + key + "&token=" + token; 
    this.apiKey   = key;
    this.apiToken = token;
    const resp = this.http.get<board[]>(fullUrl);
   
    return resp;
  }

  deleteBoard(boardId:string): Observable<object>{

    const delUrl = "https://api.trello.com/1/boards/"+ boardId + "?key=" + this.apiKey + "&token=" + this.apiToken;
    const resp = this.http.delete(delUrl).pipe(
      catchError(this.handleError<board[]>('deleteBoard', []))
    );
    return resp;
  }

  deleteCard(cardId:string): Observable<object>{

    const delUrl = "https://api.trello.com/1/cards/"+ cardId + "?key=" + this.apiKey + "&token=" + this.apiToken;
    const resp = this.http.delete(delUrl).pipe(
      catchError(this.handleError<object>('deleteCard', Object))
    );

    return resp;
  }

  achiveList(listId:string): Observable<object>{

    const delUrl = "https://api.trello.com/1/lists/"+ listId + "/closed?value=true" + "&key=" + this.apiKey + "&token=" + this.apiToken;
    const resp = this.http.put(delUrl,null).pipe(
      catchError(this.handleError<Object>('achiveList', []))
    );

    return resp;
  }

  createCard(listId:string,cardName: string): Observable<Object>{
    const creUrl = "https://api.trello.com/1/cards?idList=" + listId + "&name="+ cardName + "&pos=bottom" + "&key=" + this.apiKey + "&token=" + this.apiToken;
    const resp = this.http.post(creUrl,null).pipe(
      catchError(this.handleError<Object[]>('createCard', []))
    );


    return resp;
  }

  createList(boardId:string,listName: string): Observable<Object>{
    const creUrl = "https://api.trello.com/1/boards/" + boardId + "/lists?name="+ listName + "&pos=bottom" + "&key=" + this.apiKey + "&token=" + this.apiToken;
    const resp = this.http.post(creUrl,null).pipe(
      catchError(this.handleError<Object[]>('createList', []))
    );


    return resp;
  }

  createBoard(boardName:string,boardDesc:string): Observable<Object>{
    const creUrl = "https://api.trello.com/1/boards/?name="+ boardName + "&desc=" + boardDesc + "&key=" + this.apiKey + "&token=" + this.apiToken;
    const resp = this.http.post(creUrl,null).pipe(
      catchError(this.handleError<Object[]>('createBoard', []))
    );


    return resp;
  }

  upadateBoard(boardId:string,boardName:string,boardDesc:string): Observable<Object>{
    const creUrl = "https://api.trello.com/1/boards/" + boardId + "?name="+ boardName + "&desc=" + boardDesc + "&key=" + this.apiKey + "&token=" + this.apiToken;
    const resp = this.http.put(creUrl,null);


    return resp;
  }
  upadateList(listId:string,listName:string,listClosed:boolean): Observable<Object>{
    const creUrl = "https://api.trello.com/1/lists/" + listId + "?name="+ listName + "&closed=" + listClosed + "&key=" + this.apiKey + "&token=" + this.apiToken;
    const resp = this.http.put(creUrl,null);


    return resp;
  }
  getLists(listId:string): Observable<list>{
    const creUrl = "https://api.trello.com/1/lists/" + listId + "?fields=all" + "&key=" + this.apiKey + "&token=" + this.apiToken;
    const resp = this.http.get<list>(creUrl);


    return resp;
  }
  upadateCard(cardId:string,cardName:string,cardClosed:boolean): Observable<Object>{
    const creUrl = "https://api.trello.com/1/cards/" + cardId + "?name="+ cardName + "&closed=" + cardClosed + "&key=" + this.apiKey + "&token=" + this.apiToken;
    const resp = this.http.put(creUrl,null);


    return resp;
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error.status); // log to console instead
      if(Number(error.status) == 400){
        console.log("invalid Key");
        //result = "invalid Key";
      }
      else if(Number(error.status) == 401){
        console.log("invalid Token");
        //result = "invalid Token";
      }
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
      //1d9fb201fbd3349e6549e776f210d9fc
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

import { Component, OnInit , Input} from '@angular/core';
import { BoardService } from '../board.service';
import { board } from '../board';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { list } from '../list';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css']
})
export class UpdateListComponent implements OnInit {
  id:string = String(this.route.snapshot.paramMap.get('id'));
  constructor(private route: ActivatedRoute,private boardService: BoardService,private router: Router,private location: Location) { }
  @Input() list?: list;
  resp:Object = "";
  @Input() error:string = "";
  
  ngOnInit(): void {
    this.getList();
  }

  goBack(): void {
    this.location.back();
  }
  upadateList(){
    if(this.list)
    this.boardService.upadateList(this.id,this.list.name,this.list.closed).subscribe(resp => {this.resp = resp; this.goBack();},
                                                  error => {});
  }
  getList(){
    this.boardService.getList(this.id).subscribe(list => {this.list = list},
                                           error => {});
  }
  closeList(){
    if(this.list){
      if(this.list.name == ""){
      this.error = "BOARD NAME IS REQUIRED";
        return;
      } 
      this.boardService.upadateList(this.id,this.list.name,true).subscribe(resp => {this.resp = resp; this.goBack();},
                                                  error => {});
    }
  }
}

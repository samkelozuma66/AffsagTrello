export interface board {
  id: string;
  name: string;
  desc: string;
  closed:boolean;
  prefs:{
    backgroundImage:string;
    backgroundTopColor: string;
  };
}
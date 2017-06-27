import { ToDoListData } from './../../data/todolistData';
import { TimeLinedata } from './../../data/tiemlineData';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

/*
  Generated class for the JsonDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class JsonDataProvider {
  getTimeLineData(){
    return TimeLinedata
  }
  getToDoListData(){
    return ToDoListData
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { word } from '../models/word';
import { PointUser } from '../models/point-user';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  http = inject(HttpClient);
  constructor() { }

  gameApi = 'https://671fe287e7a5792f052fdf93.mockapi.io';

  getWords() : Observable<word[]>{
    return this.http.get<word[]>(this.gameApi + "/words");
  }

  savePoints(pointUser : PointUser) : Observable<PointUser>{
    return this.http.post<PointUser>(this.gameApi + "/scores", pointUser);
  }

  getScoresForPlayer(userName : string) : Observable<PointUser[]>{
    return this.http.get<PointUser[]>(this.gameApi + "/scores?playerName="+ userName);
  }

  getAllScores() : Observable<PointUser[]>{
    return this.http.get<PointUser[]>(this.gameApi + "/scores");
  }
}

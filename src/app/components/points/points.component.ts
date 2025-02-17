import { Component, OnInit, inject } from '@angular/core';
import { GameService } from '../../service/game.service';
import { AuthService } from '../../service/auth.service';
import { PointUser } from '../../models/point-user';

@Component({
  selector: 'app-points',
  imports: [],
  templateUrl: './points.component.html',
  styleUrl: './points.component.css'
})
export class PointsComponent implements OnInit {
  
  scores : PointUser[] = [];
  ngOnInit(): void {
    if(this.authService.isAdmin()){
      this.gameService.getAllScores().subscribe({
        next : (data) => {
          this.scores = data;
        }
      });
    }else{
      this.gameService.getScoresForPlayer(this.authService.getUserName()).subscribe({
        next : (data) => {
          this.scores = data;
        }
      });
    }



  }

  authService = inject(AuthService);
  gameService = inject(GameService);

}

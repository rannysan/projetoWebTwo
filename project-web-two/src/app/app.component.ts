import { Component } from '@angular/core';
import { TimelineService } from './timeline.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'project-web-two';

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
  ) { }

  cancel() {
    this.timelineService.logout();
    this.snackBar.open('Deslogado com sucesso!!', null, { duration: 2000 });
  }
}

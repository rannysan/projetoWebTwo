import { Component, OnInit } from '@angular/core';
import { TimelineService } from './../timeline.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  users = [];

  constructor(private timelineService: TimelineService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.timelineService.getUsers()
      .subscribe((data) => {
        this.users = data.users;
      });
  }

  follow(fId: string) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.timelineService.putUsers(currentUser.user._id, fId)
    .subscribe((data) => {
      this.snackBar.open('Seguindo novo usuário!', null, { duration: 2000 });
    });
  }

}

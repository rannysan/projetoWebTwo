import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private router: Router, private timelineService: TimelineService) { }

  username: string;
  password: string;

  ngOnInit() { }

  login(): void {

    if (this.username && this.password) {

      this.timelineService.login(this.username, this.password)
        .subscribe(
          (data) => {
            console.log(data);
            console.log('User is logged in');
            this.router.navigateByUrl('/timeline');
          }, (err) => {
            console.log(err);
          }
        );
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TimelineService } from '../timeline.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private router: Router,
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
  ) { }

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
            this.snackBar.open('Login efetuado com sucesso!', null, { duration: 2000 });
          }, (err) => {
            this.snackBar.open(err.error.error, null, { duration: 2000 });
          }
        );
    }
  }

}

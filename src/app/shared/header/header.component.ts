import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User;
  constructor(private userService: UserService,
    private router: Router) {
    this.user = userService.user;
    console.log(this.user);

  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }

  search(term: string) {
    if (term.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/search/${term}`);
  }

}

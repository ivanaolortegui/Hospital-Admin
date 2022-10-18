import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
  public desde: number = 1;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public loading: boolean = true;
  public imgSubs: any = null;

  constructor(private userService: UserService,
    private searchService: SearchService,
    private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImagenService.newImage
      .pipe(delay(100))
      .subscribe(img => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.desde)
      //  .subscribe( ({ total, usuarios }) => {
      .subscribe(({ users }) => {
        console.log(users);
        if (users.length === 0) {
          this.users = this.usersTemp;
        } else {
          this.users = users;
          this.usersTemp = users;
          this.loading = false;
        }
      })
  }

  search(termino: string): any {
    if (termino.length === 0) {
      return this.users = this.users;
    }
    this.searchService.search('usuarios', termino)
    /*  .subscribe( resp => {
       this.users = resp;
     }); */
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return;
    }
    this.userService.deleteUser(user)
      .subscribe(resp => {
        this.loadUsers();
      });

  }
  changePage(valor: number) {
    this.desde += valor;
    if (this.desde < 1) {
      this.desde = 1;
    } else if (this.desde >= this.users.length) {
      this.desde -= valor;
    }
    /*  if (this.desde < 0) {
       this.desde = 0;
     } else if (this.desde >= this.users.length) {
       this.desde -= valor;
     } */
    this.loadUsers();
  }

  changeRole(user: User) {
    this.userService.saveUser(user)
      .subscribe(resp => {
        console.log(resp);
      })
  }

  openModal(user: User) {
    this.modalImagenService.openModal('usuarios', user.uid, user.img);
  }

}

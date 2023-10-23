import {Component, effect, EventEmitter, inject, Injector, Input, OnInit, Output, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from "../../models/user.interface";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  userService = inject(UserService);
  users = this.userService.users$;


  onDelete(index: number, user: User) {
    const u: User = {
      id: index,
      name: user.name,
      brand: user.brand
    }
    this.userService.removeUser(u);
  }

  onSelect(i: number) {
    this.userService.selectUser(i);
  }
}

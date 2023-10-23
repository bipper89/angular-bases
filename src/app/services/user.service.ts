import {computed, effect, Injectable, Injector, OnInit, signal} from '@angular/core';
import {User} from "../models/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  private users = signal<User[]>([]);
  public users$ = computed(() => this.users());

  private user = signal<User | undefined>(undefined);
  public user$ = computed(() => this.user());


  addUser(user: User) {
    return this.users.update(users => [...users, user]);
  }

  updateUser(user: User) {
    this.users.mutate(users => {
      users[user.id!] = {...user};
    });
    this.user.set(undefined);
  }

  selectUser(index: number) {
    const user = this.users()[index];
    user.id =  index;
    this.user.set(user);
  }

  removeUser(user: User) {
    const index = Number(user.id);
    return this.users.update(
      users => [...users.slice(0, index), ...users.slice(index + 1)]);

  }
}

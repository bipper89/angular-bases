import {Component, effect, inject, Injector, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  fb = inject(FormBuilder);
  userService = inject(UserService);
  userForm = this.fb.group({
    name: ['', [Validators.required]],
    brand: ['', [Validators.required]],
  });
  user = this.userService.user$;

  constructor(private injector: Injector) {}

  get imgUrl() {
    if (
      this.userForm.value.brand === null ||
      this.userForm.value.brand === undefined ||
      this.userForm.value.brand === '') {
      return 'assets/logos/angular.svg';
    }
    return `assets/logos/${this.userForm.value.brand}.svg`;
  }

  onSubmit() {
    const {name, brand} = this.userForm.value;
    if (!name || !brand) {
      return;
    }
    this.userService.addUser({name, brand});
    this.userForm.reset();
  }


  ngOnInit() {
    effect( () => {
      if (this.user() !== undefined) {
        this.userForm.patchValue({
          name: this.user()!.name,
          brand: this.user()!.brand
        })
      }
    }, {injector: this.injector});
  }

  onEdit() {
    const {name, brand} = this.userForm.value;
    if (!name || !brand) {
      return
    }
    this.userService.updateUser({
      id: this.user()!.id,
      name,
      brand,
    });
    this.userForm.reset();
  }

}

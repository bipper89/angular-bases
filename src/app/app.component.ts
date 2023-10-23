import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormComponent} from "./components/";
import {UserListComponent} from "./components/";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularApp';
}

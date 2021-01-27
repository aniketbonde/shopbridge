import { Component } from '@angular/core';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dynamicComponent: any;

  constructor(private router : Router) {}

  ngOnInit(): void {
    this.dynamicComponent = ItemListComponent;
    this.disableGoBackBtn();
  }

  assignComponent(component) {
    if (component === 'add') {
      this.router.navigate(['/add']);
    } else if (component === 'list') {
      this.router.navigate(['/list']);
    }else if (component === 'detail') {
      this.router.navigate(['/detail']);
    } else {
      this.router.navigate([`/list`]);
    }
    this.disableGoBackBtn();
  }

  onGoBackClick() {
    this.assignComponent('list');
  }
  disableGoBackBtn(): any {
    if (this.router.url === '/list') {
      return true;
    } else {
      return false;
    }
  }
}

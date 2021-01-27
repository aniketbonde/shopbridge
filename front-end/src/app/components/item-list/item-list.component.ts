import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ItemService } from '../../services/item.service';
import { SharedService } from '../../services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  dataSource: Observable<any>;
  displayedColumns: string[] = ['name', 'price','actions'];

  constructor(private itemService: ItemService, private sharedService : SharedService, private router : Router,private sanitizer:DomSanitizer) {
    this.reloadData();
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.itemService.getItemList().subscribe((resp) => {
      if (resp) {
        this.dataSource = resp;
      }
    });
  }

  delete(element) {
    this.itemService
    .deleteItem(element.id)
    .subscribe((_response) => {
      if (_response) console.log(_response);
      this.dataSource = _response;
      this.router.navigate([`/add`]);
    });
  }

  showDetails(element) {
    if (typeof(element.id) != 'undefined'){
      this.itemService.getItemById(element.id).subscribe((resp) => {
        if (resp) {
          element = resp;
        }
      });
      element.base64Str = this.transform(element.base64Str);
     }
    this.sharedService.setData(element);
    console.log(element);
    this.router.navigate([`/detail`]);
  }
  transform(base64Str : any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Str);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { DomSanitizer ,SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  myForm: FormGroup;
  dataSource: any[] = [];
  selectedValue: any;
  searchedValue: any;
  displayedColumns: string[] = ['id','name','description','price','image'];
  constructor(private sharedService : SharedService,private sanitizer:DomSanitizer) {
    this.myForm = new FormGroup({
      selectedValue: new FormControl(),
      searchedValue: new FormControl(),
    });
   }

  ngOnInit(): void {
    this.injectData();
  }

  injectData(){
     let tempObj = this.sharedService.getData();
     this.dataSource.push(tempObj);
  }

}

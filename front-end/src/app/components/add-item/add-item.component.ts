import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/entity/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item;
  myAddForm: FormGroup;
  displayedColumns: string[] = ['name', 'description', 'price'];
  dataSource: Observable<any>;
  base64String : String;
  picture;
  constructor(private itemService: ItemService, private router : Router) {}

  ngOnInit(): void {
    this.item = new Item();
    this.myAddForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(),
      price: new FormControl('', [Validators.required]),
    });
  }

  onAddClick() {
    this.item.name = this.myAddForm.get('name').value;
    this.item.description = this.myAddForm.get('description').value;
    this.item.price = this.myAddForm.get('price').value;
    this.item.base64Str = this.picture;
    this.itemService
      .create(this.item)
      .subscribe((_response) => {
        if (_response) console.log(_response);
        this.dataSource = _response;
        this.router.navigate([`/list`]);
      });
  }

  uploadFileEvt(imgFile: any) {
    const file = imgFile.target.files[0];
    console.log(file.size);
    if (!file) {
        return false;
    }
    var promise = this.getBase64(file);
    promise.then((result) => {
        var test_variable = result as string;
        this.picture = test_variable;
    });
  }

  getBase64(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = () => { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

}

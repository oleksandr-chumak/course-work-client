import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadImageComponent} from '../../components/upload-image/upload-image.component';
import {Observable} from "rxjs";
import {FileService} from "../../_service/file.service";
import {GoodsService} from "../../_service/goods.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  file$: Observable<File | null>

  constructor(
    private uploadImage: UploadImageComponent,
    private fileService: FileService,
    private goodsService: GoodsService
  ) {
    this.file$ = fileService.file$;

  }
  public get name() {
    return this.form.get('name');
  }

  public get unit() {
    return this.form.get('unit');
  }

  public get price() {
    return this.form.get('price');
  }

  public get totalAmount() {
    return this.form.get('totalAmount');
  }

  public get image() {
    return this.form.get("image")
  }


  ngOnInit(): void {
    this.file$.subscribe(value => {
      if(!value){
        return;
      }
      this.image.setValue(value);
    })

    this.form = new FormGroup<any>({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(50)
      ]),
      unit: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ]),
      price: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(20000)
      ]),
      totalAmount: new FormControl(0, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(99999)
      ]),
      image: new FormControl(null, [
        Validators.required
      ])
    },);
  }



  handleSubmit() {
    const formData = new FormData();
    formData.append('name', this.name.value);
    formData.append('unit', this.unit.value);
    formData.append('price', this.price.value);
    formData.append('totalAmount', this.totalAmount.value);
    formData.append('image', this.image.value);

    this.goodsService.create(formData).subscribe((value) =>{
      console.log(value)
    })

  }
}

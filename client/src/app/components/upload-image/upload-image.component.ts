import {Component, ElementRef, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {FileService} from "../../_service/file.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {
  @ViewChild("fileInput") fileInput: ElementRef;
  imageUrl: string | null = null;

  constructor(private fileService: FileService) {
  }

  onClick() {
    this.fileInput.nativeElement.click()
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    this.fileService.setFile(file);
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    fileReader.readAsDataURL(file);
  }
}

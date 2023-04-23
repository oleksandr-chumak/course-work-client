import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn:"root"
})
export class FileService{
  private readonly fileSubject:BehaviorSubject<File | null>;
  public readonly file$:Observable<File | null>
  constructor() {
    this.fileSubject = new BehaviorSubject<File | null>(null);
    this.file$ = this.fileSubject.asObservable();
  }
  public get file(){
    return this.fileSubject.value;
  }
  public setFile(file:any):void{
    this.fileSubject.next(file);
  }
}

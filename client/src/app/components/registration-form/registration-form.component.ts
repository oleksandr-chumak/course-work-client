import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../_service/account.service";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit{
  form!: FormGroup;
  submitted = false;
  isPassword = false;
  isRetryPassword = false;
  error:string = '';


  constructor(
    private accountService:AccountService,
    private route: Router

  ) {
  }

  get email() {return this.form.get("email")}

  get username() {return this.form.get("username")}

  get password() {return this.form.get("password")}

  get repeatPassword() {return this.form.get("repeatPassword")}

  get f() {return this.form}

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup<any>({
      email:new FormControl("",[
        Validators.required,
        Validators.email,
        Validators.minLength(12),
        Validators.maxLength(30)
      ]),
      username:new FormControl("",[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ]),
      password:new FormControl("",[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      repeatPassword:new FormControl("",[
        Validators.required,
      ]),
    },{validators:this.passwordMatchValidator})
  }
  showPassword(){
    this.isPassword = !this.isPassword
  }
  showRetryPassword(){
    this.isRetryPassword = !this.isRetryPassword
  }
  async onSubmit(){
    this.submitted = true;

    if(this.f.invalid){
      return;
    }
    const registrationData = {
      email:this.email.value,
      password:this.password.value,
      username:this.username.value
    }
    this.accountService.register(registrationData).pipe(
      catchError(err => {
        this.error = err.error.message;
        return throwError(err);
      })
    ).subscribe(() =>{
        this.route.navigate(["/login"]);
    }
    );
  }
  passwordMatchValidator(form:FormGroup){
    const password = form.get("password").value
    const confirmPassword = form.get("repeatPassword").value
    return password === confirmPassword ? null : {compare:true}
  }




}

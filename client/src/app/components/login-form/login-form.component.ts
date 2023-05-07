import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../_service/account.service";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup
  submitted = false;
  isPassword = false;


  constructor(
    public accountService: AccountService,
    private route: Router
  ) {


  }

  ngOnInit() {
    this.form = new FormGroup<any>({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.minLength(12),
        Validators.maxLength(30)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    })
  }

  showPassword() {
    this.isPassword = !this.isPassword
  }


  get email() {
    return this.form.get("email")
  }

  get password() {
    return this.form.get("password")
  }


  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    this.accountService.login(this.email.value, this.password.value)
  }
}

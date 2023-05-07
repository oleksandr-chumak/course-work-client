import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, defer, EMPTY, map, Observable, skip, switchMap, tap, throwError} from "rxjs";
import {User} from "../_models/user";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AccessToken} from "../_interface/accessToken";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  public loginError: string = "";

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  setUserValue(value: User) {
    this.userSubject.next(value)
  }

  login(email: string, password: string) {
    this.http.post<User>(`${environment.apiUrl}/auth/login`, {email, password})
      .pipe(
        map(user => {
          localStorage.setItem("credentials", JSON.stringify(user))
          return user;
        }),
        catchError((err, caught) =>{
          this.loginError = err
          return EMPTY
        })
      )
      .subscribe(async () =>{
        await this.update()
        await this.router.navigate(["/"])
      })
  }
  update():Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.getMe();
      this.user
        .pipe(
          skip(1)
        )
        .subscribe((value) => {
            resolve();
          }
        )
    })
  }

  register(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/auth/registration`, user);
  }

  getMe() {
    const user$ = defer(() => {
      return this.http.get<User>(`${environment.apiUrl}/auth/me`)
        .pipe(
          catchError((err) => {
            return this.getNewAccessToken()
              .pipe(
                switchMap(() => {
                  return this.http.get<User>(`${environment.apiUrl}/auth/me`);
                }),
                catchError((err) => {
                  this.setUserValue(null);
                  return EMPTY;
                })
              )
          })
        );
    });

    user$.subscribe((value) => {
      this.setUserValue(value);
    }, (error) => {
      this.userSubject.error(error)
    });
  }



  getNewAccessToken() {
    let refreshToken:string | null;
    try {
       refreshToken = JSON.parse(localStorage.getItem("credentials")).refreshToken;
    }catch (e){
      return throwError(() => new Error("Token not found"));
    }
    return this.http.get<AccessToken>(`${environment.apiUrl}/auth/refreshToken/${refreshToken}`)
      .pipe(
        catchError((err) => {
          localStorage.removeItem("credentials")
          return throwError(err);
        }),
        tap((value) => {
          const credentials = JSON.parse(localStorage.getItem("credentials"));
          const newCredentials = JSON.stringify({...credentials, accessToken: value.accessToken});
          localStorage.setItem("credentials", newCredentials);
        })
      )
  }
  isAuthenticated(){
    return !!this.userValue;
  }
}

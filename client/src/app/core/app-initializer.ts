import {AccountService} from "../_service/account.service";
import {Injectable} from "@angular/core";
import {catchError, skip, throwError} from "rxjs";

@Injectable()
export class AppInitializer {
  constructor(private accountService: AccountService) {
  }

  init(): Promise<void> {
    return this.accountService.update()
  }
}

export function AppInitializerFactory(appInitializer: AppInitializer) {
  return () => appInitializer.init();
}

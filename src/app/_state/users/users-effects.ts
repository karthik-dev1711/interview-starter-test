import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserServiceService } from "@app/_shared/user-service.service";
import { of } from "rxjs/internal/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";
import { User, UsersActions } from "./users-store";

@Injectable()
export class UsersEffects {
    actions$ = inject(Actions);
    userService = inject(UserServiceService);

    usersList$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(UsersActions['getUsersList']),
          switchMap(() => {
            return this.userService.getUsersList().pipe(
              map((users: User[]) => UsersActions.saveInitialUsers({ users })),
              catchError((err) => of(UsersActions.userListFailure({ errorMsg: err.message }))
              )
            );
          })
        );
      })

}
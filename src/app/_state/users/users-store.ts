import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createActionGroup, createFeature, createFeatureSelector, createReducer, createSelector, emptyProps, on, props } from "@ngrx/store";

const UsersStoreKey = "users";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    birthDate: string;
}

export interface UsersState extends EntityState<User> {
    selectedUserId: string | null;
}

const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null
});

export const UsersActions = createActionGroup({
    source: UsersStoreKey,
    events: {
        Init: emptyProps(),
        'Save Initial Users': props<{ users: User[] }>(),
        'get Users list': emptyProps(),
        'User list Failure': props<{errorMsg: string}>(),
        'Update User': props<{userInfo: User, selectedUserId: string}>(),
    }
});

export const UsersReducer = createFeature({
    name: UsersStoreKey,
    reducer: createReducer(
        initialState,
        on(UsersActions['saveInitialUsers'], (state, { users }) => {
            return usersAdapter.addMany(users, { ...state, selectedUserId: null });
        }),
        on(UsersActions['getUsersList'], (state) => {
            return {
                ...state
            }
        }),
        on(UsersActions['updateUser'], (state, {selectedUserId, userInfo}) => {
            return usersAdapter.updateOne({ id: selectedUserId, changes: userInfo }, state)
        }),
        on(UsersActions['userListFailure'], (state, {errorMsg}) => {
            return {
                ...state,
                errorMsg: errorMsg
            }
        })
        )
});

export const selectUsersState = createFeatureSelector<UsersState>(UsersStoreKey);

export const selectAllUsers = createSelector(
    selectUsersState,
    usersAdapter.getSelectors().selectAll,
);

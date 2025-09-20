import {User} from "../features/users/entities/user";
import {History} from "../features/history/entities/history";

export const entities = [User, History];
export const migrations = ['src/migrations/*.ts'];
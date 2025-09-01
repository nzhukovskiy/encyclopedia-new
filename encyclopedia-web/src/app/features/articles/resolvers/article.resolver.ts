import { ResolveFn } from '@angular/router';

export const articleResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};

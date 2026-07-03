import { HttpInterceptorFn } from '@angular/common/http';

export const adminAuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window === 'undefined') {
    return next(req);
  }

  const token = localStorage.getItem('admin_token');

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'X-Admin-Token': token,
      },
    })
  );
};

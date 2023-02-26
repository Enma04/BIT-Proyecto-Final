import { TestBed } from '@angular/core/testing';

import { InterceptorLoginUsuariosInterceptor } from './interceptor-login-usuarios.interceptor';

describe('InterceptorLoginUsuariosInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorLoginUsuariosInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorLoginUsuariosInterceptor = TestBed.inject(InterceptorLoginUsuariosInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

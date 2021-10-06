import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: any;

  constructor( private http: HttpClient, private router: Router, private ngZone:NgZone ) { 
    this.googleInit();
  }


  get token(): string{ return localStorage.getItem('token') || ''; }

  get uid(): string{ return this.usuario.uid || ''; }

  googleInit() {
    
    return new Promise( (resolve: any) => {

      gapi.load('auth2', () => {
      
        this.auth2= gapi.auth2.init({
          client_id: '792807565724-g8knph4bfh0i85ucqqspkpsioqq0bcvt.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
  
      });

    });

  }

  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });

  }


  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        // console.log( resp );
        const { nombre, email, role, img = '', google, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        localStorage.setItem('token', resp.Token)

        return true;
      }),
      catchError( error => of(false) )
    )

  }


  crearUsuario( formData: RegisterForm ){
    
    return this.http.post( `${ base_url }/usuarios`, formData )
                    .pipe(
                      tap( (resp: any) => {
                        localStorage.setItem('token', resp.Token)
                      })
                    )
    
  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, {
                headers: {
                  'x-token': this.token
                }
              });

  }

  login( formData: LoginForm ){
    
    return this.http.post( `${ base_url }/login`, formData )
                    .pipe(
                      tap( (resp: any) => {
                        localStorage.setItem('token', resp.Token)
                      })
                    )
    
  }

  loginGoogle( token: any ){
    
    return this.http.post( `${ base_url }/login/google`, { token } )
                    .pipe(
                      tap( (resp: any) => {
                        localStorage.setItem('token', resp.Token)
                      })
                    )
    
  }

}
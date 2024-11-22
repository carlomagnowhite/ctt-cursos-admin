import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  //VAR
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.authStateChange();
  }

  async authLogIn(email: string, password: string) {
    try {
      const {data, error} = await this.supabase.auth.signInWithPassword({email, password});
      if (error) {
        throw new Error("Error: " + error);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getSession():Promise<any>{
    try {
    const {data, error} = await this.supabase.auth.getSession();
      if(error){
        throw error;
      }
      if(data.session){
        this.updateSession(data.session);
      }
      return data.session;
    } catch (error) {
      throw error;
    }
  }

  async authStateChange(){
    try {
      this.supabase.auth.onAuthStateChange((event, session: any) => {
        console.log("Auth event: " + event);
        switch (event) {
          case "INITIAL_SESSION":
            break;
          case "SIGNED_IN":
            if (session){
              //implementar
            }
            break;
          case "SIGNED_OUT":
            localStorage.removeItem('session');
            break;
          case "TOKEN_REFRESHED":
            if(session){
              this.getSession();
              break;
            }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async recoverPassword(email: string){
    try {
      const {data, error} = await this.supabase.auth.resetPasswordForEmail(email, {redirectTo: 'http://localhost:4200/set-password'});
      if(error){
        throw new Error(error.message);
      }
      console.log("Correo enviado" + data);
    } catch (error) {
      console.error(error);
    }
  }

  private updateSession(session: Session | null): void{
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    }else {
      this.signOut();
    }
  }

  async updatePassword(password: string){
    try {
      const{error} = await this.supabase.auth.updateUser({password: password});
      if (error) throw error;
      alert("Contraseña actualizada correctamente");
    } catch (error) {
      throw error;
    }
  }

  async signOut(): Promise<boolean> {
    try {
      const {error} = await this.supabase.auth.signOut();
      if(error) throw error;
      return true;
    } catch (error) {
      throw error;
    }
  }



}



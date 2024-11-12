import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  //VAR
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
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




}

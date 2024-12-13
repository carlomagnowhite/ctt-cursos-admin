import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UtilsService } from '../../utils/utils.service';
import { environment } from '../../../environments/environment';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private supabase: SupabaseClient;
  private spService: SupabaseService = inject(SupabaseService);
  private utils: UtilsService = inject(UtilsService);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.spService.authStateChange();
  }

  async uploadImage(file: File): Promise<string | null> {
    const bucketName = 'docente-img'; // Nombre de tu bucket en Supabase
    const filePath = `profile-pics/${Date.now()}_${file.name}`; // Nombre único para evitar conflictos

    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading image:', error.message);
      return null;
    }

    // Obtener la URL pública del archivo
  const { data: publicUrlData } = this.supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

    if (!publicUrlData) {
      console.error('Error generating public URL');
      return null;
    }
    return publicUrlData.publicUrl;
  }

  async getTeachers(): Promise<any[]> {
    const { data, error } = await this.supabase.from('docentes').select('*');
    if (error) {
      console.error('Error fetching docentes:', error);
      return [];
    }
    return data;
  }

  async addTeacher(teacher: any) {
    const { data, error } = await this.supabase
      .from('docentes')
      .insert([teacher]);

    if (error) {
      console.error('Error adding teacher:', error.message);
    } else {
      console.log('Teacher added:', data);
    }
  }

  async updateTeacher(id: number, updates: any): Promise<void> {
    const { error } = await this.supabase.from('docentes').update(updates).eq('id', id);
    if (error) {
      console.error('Error updating teacher:', error);
    }
  }

  async deleteTeacher(id: number): Promise<void> {
    const { error } = await this.supabase.from('docentes').delete().eq('id', id);
    if (error) {
      console.error('Error deleting teacher:', error);
    }
  }

  async deleteTeachers(ids: string[]): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('docentes')
        .delete()
        .in('id', ids); // Usamos el operador `in` para eliminar múltiples registros

      if (error) throw error;
    } catch (error) {
      console.error('Error eliminando profesores:', error);
      throw error;
    }
  }



}

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Curso } from '../../interfaces/cursos.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  //VAR
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async addCourse(curso: Curso): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.from('cursos').insert(curso);
      if (error) {
        throw new Error('Error al intentar insertar el curso. Error: ' + error.message);
      }
      console.log('curso: ' + data);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getCourse(): Promise<any> {
    try {
      const { data, error } = await this.supabase.from('cursos').select('*');
      if (error) {
        throw new Error(
          'Error al intentar recuperar los cursos. Error: ' + error
        );
      }
      return data as [];
    } catch (error) {
      throw error;
    }
  }

  async getCourseById(id: string): Promise<Curso> {
    try {
      const {data, error} = await this.supabase.from("cursos").select("*").eq("id", id);
      if( error ) throw new Error( 'Ha ocurrido un problema al intentar recuperar el curso seleccionado: Error: ' + error.message);
      return data[0] as Curso;
    } catch (error) {
      throw error;
    }
  }

  async deleteCourse(id: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('cursos')
        .delete()
        .eq('id', id);
      if (error) {
        throw new Error(
          'Ha ocurrido un problema al intentar eliminar el curso seleccionado. Error: ' +
            error
        );
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateCourse(curso: Curso): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('cursos')
        .update(
          {
            nombre: curso.nombre,
            ubicacion: curso.ubicacion,
            img: curso.img,
            descripcion: curso.descripcion,
            objetivo: curso.objetivo,
            horario: curso.horario,
            id_docente_responsable: curso.id_docente_responsable,

          }
        )
        .eq('id', curso.id);
      if( error ) throw new Error( 'Ha ocurrido un problema al intentar actualizar el curso seleccionado: Error: ' + error.message);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getCoursesCount() : Promise<number> {
    const { count, error } = await this.supabase
      .from("cursos")
      .select("*", { count: 'exact' });
    if (error) throw error.message;

    return Number(count);
  }
}

import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { CoursesService } from '../../services/Courses/courses.service';
import { Curso } from '../../interfaces/cursos.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  //VAR
  cursos: any [] = [];
  cursosService: CoursesService = inject(CoursesService);
  isModalOpen: boolean = false;
  isModalUpdateOpen: boolean = false;
  courseData: any = null;
  rowsPerPage: number = 3;
  currentPage: number = 1;
  paginatedCourses: any[] = [];
  Math = Math;

  constructor(){
    this.getCourses();
  }

  openModal(): void{
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.getCourses();
  }

  openUpdateModal(curso: Curso): void{
    console.log('Curso seleccionado:', curso);
    this.courseData = curso;
    this.isModalUpdateOpen = true;
  }

  closeUpdateModal(): void{
    this.isModalUpdateOpen = false;
    this.courseData = null;
    this.getCourses();
  }

  async getCourses(){
    try {
      const response = await this.cursosService.getCourse();
      this.cursos = response;
      console.log(this.cursos);
    } catch (error) {
      throw error;
    }
  }

  async deleteCourse(id: string){
    try {
      const response: boolean = await this.cursosService.deleteCourse(id);
      if(response === true){
        this.getCourses();
      }
      console.log(response);
    } catch (error) {
      throw error;
    }
  }

    // Cambiar el número de filas por página
    changeRowsPerPage(): void {
      this.currentPage = 1; // Reiniciar a la primera página cuando cambian las filas por página
      this.updatePaginatedTeachers();
    }
    updatePaginatedTeachers(): void {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      this.paginatedCourses = this.cursos.slice(startIndex, endIndex);
    }

    changePage(newPage: number): void {
      if (newPage < 1 || newPage > this.totalPages) return; // Limitar el rango de las páginas
      this.currentPage = newPage;
      this.updatePaginatedTeachers(); // Actualizar los datos de la nueva página
    }


      // Obtener el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.cursos.length / this.rowsPerPage);
  }
}

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

  constructor(){
    this.getCourses();
  }

  openModal(): void{
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
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

  async updateCourse(curso: Curso){
    
  }

}

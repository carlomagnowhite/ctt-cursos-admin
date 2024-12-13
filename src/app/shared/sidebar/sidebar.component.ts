import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from '../../teacher/services/teacher.service';
import { CourseService } from '../../course/services/course.service';
import { CoursesService } from '../../services/Courses/courses.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  router: Router = inject(Router);
  teachersService: TeacherService = inject(TeacherService);
  coursesService: CoursesService = inject(CoursesService);
  teachersCount: number = 0;
  coursesCount: number = 0;

  constructor(){
    this.getTeachersCount();
    this.getCoursesCount();
  }

  catchButtonRoute(id: string): void{
    switch(id){
      case "cursos":
        this.router.navigate(["dashboard"]);
        break;
      case "docentes":
        this.router.navigate(["dashboard/teachers"]);
        break;
      case "perfil":
        this.router.navigate(["dashboard/user-profile"]);
        break;
    }
  }

  async getTeachersCount(){
    try {
      const response = await this.teachersService.getTeachersCount();
      this.teachersCount = response;
    } catch (error) {
      throw error;
    }
  }

  async getCoursesCount(){
    try {
      const response = await this.coursesService.getCoursesCount();
      this.coursesCount = response;
    } catch (error) {
      throw error;
    }
  }

}

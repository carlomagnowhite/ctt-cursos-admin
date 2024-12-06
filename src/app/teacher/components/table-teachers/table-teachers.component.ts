import { Component } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-table-teachers',
  templateUrl: './table-teachers.component.html',
  styleUrl: './table-teachers.component.css'
})
export class TableTeachersComponent {
  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  teachers: any[] = [];

  rowsPerPage = 25;

  constructor(private teacherService: TeacherService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchTeachers();
  }

  async fetchTeachers(): Promise<void> {
    this.teachers = await this.teacherService.getTeachers();
  }

  async deleteTeacher(id: number): Promise<void> {
    await this.teacherService.deleteTeacher(id);
    await this.fetchTeachers(); // Refrescar datos después de borrar
  }

  get paginationText(): string {
    const start = 1;
    const end = Math.min(this.rowsPerPage, this.teachers.length);
    return `${start}-${end} of ${this.teachers.length}`;
  }

}

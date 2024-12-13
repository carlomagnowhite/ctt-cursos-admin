import { Component } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-table-teachers',
  templateUrl: './table-teachers.component.html',
  styleUrl: './table-teachers.component.css'
})
export class TableTeachersComponent {
  showModal:boolean = false;
  teachers: any[] = [];
  selectedTeacher: any = null;
  allTeachers: any[] = []; // Copia de la lista completa
  searchTerm: string = ''; // Texto del input de búsqueda
  selectAll: boolean = false;
  showConfirmDeleteModal: boolean = false; // Controla la visibilidad del modal
  selectedCount: number = 0; // Cantidad de elementos seleccionados para eliminar
  selectedIds: string[] = []; // IDs de los elementos seleccionados
  currentPage: number = 1; // Página actual
  rowsPerPage: number = 10; // Filas visibles por página (configurable)
  paginatedTeachers: any[] = []; // Lista de profesores visible en la página actual
  Math = Math;

  openModal(): void {
    this.showModal = true;
  }


  constructor(private teacherService: TeacherService) {
    this.fetchTeachers();
  }

  ngOnInit(): void{
    this.fetchTeachers();
  }

  openAddModal(): Promise<void> {
    return new Promise((resolve) => {
      this.selectedTeacher = null; // Crear un nuevo docente
      this.showModal = true;
      resolve();
    });
  }

  openEditModal(teacher: any): Promise<void> {
    console.log('Docente seleccionado:', teacher);
    return new Promise((resolve) => {
      this.selectedTeacher = { ...teacher }; // Clonar datos del docente seleccionado
      this.showModal = true;
      resolve();
    });
  }

  openConfirmDeleteModal(): void {
    const selectedTeachers = this.teachers.filter(teacher => teacher.selected);
    this.selectedCount = selectedTeachers.length; // Cuenta los elementos seleccionados
    this.selectedIds = selectedTeachers.map(teacher => teacher.id); // Obtén los IDs seleccionados

    if (this.selectedCount > 0) {
      this.showConfirmDeleteModal = true;
    } else {
      alert('Seleccione al menos un elemento para eliminar.');
    }
  }

  closeConfirmDeleteModal(): void {
    this.showConfirmDeleteModal = false;
  }

  closeModal(): Promise<void> {
    return new Promise((resolve) => {
      this.showModal = false;
      this.selectedTeacher = null; // Limpiar el docente seleccionado
      this.fetchTeachers().then(() => resolve());
    });
  }

  async fetchTeachers(): Promise<void> {
    try {
      const data = await this.teacherService.getTeachers();
      this.allTeachers = data; // Almacena todos los registros obtenidos
      this.teachers = [...this.allTeachers]; // Inicialmente, todos los datos se muestran
      this.updatePaginatedTeachers();
    } catch (error) {
      console.error('Error al obtener los profesores:', error);
    }
  }

  filterTeachers(): void {
    const term = this.searchTerm.toLowerCase();
    this.teachers = this.allTeachers.filter(teacher =>
      teacher.nombre.toLowerCase().includes(term) ||
      teacher.apellido.toLowerCase().includes(term) ||
      teacher.titulo.toLowerCase().includes(term) ||
      teacher.cargo.toLowerCase().includes(term) ||
      teacher.correo.toLowerCase().includes(term)
    );
    this.currentPage = 1; // Reinicia a la primera página al filtrar
    this.updatePaginatedTeachers();
  }

  deleteTeacher(id: number): Promise<void> {
    if (confirm('¿Está seguro de que desea eliminar este docente?')) {
      return this.teacherService.deleteTeacher(id).then(() => {
        alert('Docente eliminado exitosamente.');
        return this.fetchTeachers(); // Recargar la tabla
      });
    }
    return Promise.resolve(); // Si no se confirma, devolvemos una promesa resuelta
  }

  get paginationText(): string {
    const start = 1;
    const end = Math.min(this.rowsPerPage, this.teachers.length);
    return `${start}-${end} of ${this.teachers.length}`;
  }

  toggleSelectAll(): void {
    this.paginatedTeachers.forEach(teacher => (teacher.selected = this.selectAll));
  }

  async confirmDelete(): Promise<void> {
    try {
      // Llama al método de eliminación múltiple
      await this.teacherService.deleteTeachers(this.selectedIds);

      // Filtra las filas eliminadas de la tabla y del almacenamiento local
      this.teachers = this.teachers.filter(teacher => !this.selectedIds.includes(teacher.id));
      this.allTeachers = this.allTeachers.filter(teacher => !this.selectedIds.includes(teacher.id));

      // Resetea las variables y cierra el modal
      this.selectedIds = [];
      this.selectedCount = 0;
      this.selectAll = false;
      this.showConfirmDeleteModal = false;

      alert('Elementos eliminados correctamente.');
      this.fetchTeachers(); // Recargar la tabla
    } catch (error) {
      console.error('Error al eliminar los elementos:', error);
      alert('Hubo un error al intentar eliminar los elementos seleccionados.');
    }
  }

  updatePaginatedTeachers(): void {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedTeachers = this.teachers.slice(startIndex, endIndex);
  }

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) return; // Limitar el rango de las páginas
    this.currentPage = newPage;
    this.updatePaginatedTeachers(); // Actualizar los datos de la nueva página
  }

  // Cambiar el número de filas por página
  changeRowsPerPage(): void {
    this.currentPage = 1; // Reiniciar a la primera página cuando cambian las filas por página
    this.updatePaginatedTeachers();
  }

  // Obtener el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.teachers.length / this.rowsPerPage);
  }


}

import { Component } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import * as XLSX from 'xlsx';

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
  rowsPerPage: number = 5; // Filas visibles por página (configurable)
  paginatedTeachers: any[] = []; // Lista de profesores visible en la página actual
  Math = Math;
  fileData: any[] = []; // Datos procesados del archivo
  selectedFile: File | null = null;
  selectedFileName: string | null = null; // Variable para almacenar el nombre del archivo
  modalMessage: string = '';
  showMessage:boolean = false;
  fileName:string = '';

  openModal(): void {
    this.showModal = true;
  }


  constructor(private teacherService: TeacherService) {
    this.fetchTeachers();
  }

  ngOnInit(): void{
    this.fetchTeachers();
  }

  async checkTeacherAssignment(teacherId: number): Promise<string[] | null> {
    const assignedCourses = await this.teacherService.getAssignedCourses(teacherId);

    if (assignedCourses.length > 0) {
      return assignedCourses.map(course => course.nombre); // Devuelve los nombres de los cursos
    }

    return null; // No hay asignaciones
  }




  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }


  processFile(): void {
    if (!this.selectedFile) {
      this.showModalMessage('Por favor, seleccione un archivo primero.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Normalizar datos
      const normalizedData = sheetData.map((row: any) => ({
        nombre: row['nombre']?.trim() || null,
        apellido: row['apellido']?.trim() || null,
        correo: row['correo']?.trim() || null,
        titulo: row['titulo']?.trim() || 'Sin título', // Valor por defecto
        cargo: row['cargo']?.trim() || null,
      }));

      // Validar contenido
      if (!this.validateFile(normalizedData)) {
        return;
      }

      // Contar filas totales excluyendo headers y pasar al siguiente método
      const totalRows = sheetData.length;
      this.insertData(normalizedData, totalRows);
    };

    reader.readAsBinaryString(this.selectedFile);
    this.resetFileInput();
  }

  insertData(data: any[], totalRows: number): void {
    this.teacherService.addTeachers(data)
      .then((result: any) => {
        const insertedRows = result?.length || 0; // Asegúrate de que el servicio retorna las filas insertadas
        this.fetchTeachers(); // Recargar la tabla
        this.showModalMessage(
          `Archivo procesado: ${totalRows} filas detectadas.\n`
        );
        this.resetFileInput(); // Limpiar el estado del archivo y su etiqueta
      })
      .catch((error) => {
        console.error('Error al insertar datos:', error.message);
        this.showModalMessage('Error al insertar datos: ' + error.message);
      });
  }


  resetFileInput(): void {
    this.selectedFile = null; // Resetea el archivo seleccionado
    this.selectedFileName = ''; // Limpia el nombre del archivo mostrado
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Resetea el valor del input de archivo
    }
  }


  validateFile(data: any[]): boolean {
    if (data.length === 0) {
      this.showModalMessage('El archivo está vacío. Por favor, seleccione un archivo con datos.');
      return false;
    }

    const requiredColumns = ['nombre', 'apellido', 'correo', 'titulo', 'cargo'];
    const firstRow = data[0];
    for (const col of requiredColumns) {
      if (!(col in firstRow)) {
        this.showModalMessage(`El archivo debe incluir la columna "${col}".`);
        return false;
      }
    }

    // Validar contenido de cada fila
    const invalidRows = data.filter(row => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos
      const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/; // Expresión regular para validar nombres

      return (
        !row.nombre || !nameRegex.test(row.nombre) || // Valida nombre
        !row.apellido || !nameRegex.test(row.apellido) || // Valida apellido
        !row.correo || !emailRegex.test(row.correo) || // Valida correo
        !row.titulo || // Valida que título no esté vacío
        !row.cargo // Valida que cargo no esté vacío
      );
    });

    if (invalidRows.length > 0) {
      this.showModalMessage('El archivo contiene filas con datos inválidos o incompletos.');
      return false;
    }

    return true;
  }

  showModalMessage(message: string): void {
    this.modalMessage = message;
    this.showMessage = true;
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

  async deleteTeacher(id: number): Promise<void> {
    const teacher = this.teachers.find(t => t.id === id);
    if (!teacher) return;

    const assignedCourses = await this.checkTeacherAssignment(id);

    if (assignedCourses && assignedCourses.length > 0) {
      const courseList = assignedCourses.join(', ');
      this.showModalMessage(
        `${teacher.nombre}  ${teacher.apellido} está asignado a los siguientes cursos: ${courseList}. Por tanto, no puede ser eliminado.`
      );
      return; // Detener el proceso si hay asignaciones
    }

    // Proceder con la eliminación si no hay asignaciones
    if (confirm(`¿Está seguro de que desea eliminar a ${teacher.nombre}?`)) {
      try {
        await this.teacherService.deleteTeacher(id);
        alert('Docente eliminado exitosamente.');
        this.fetchTeachers(); // Recargar la tabla
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error al eliminar docente:', error.message);
        } else {
          console.error('Error al eliminar docente:', error);
        }
        alert('Hubo un error al eliminar el docente.');
      }
    }
  }

  get paginationText(): string {
    const start = 1;
    const end = Math.min(this.rowsPerPage, this.teachers.length);
    return `${start}-${end} of ${this.teachers.length}`;
  }

  toggleSelectAll(): void {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;

    this.teachers.slice(startIndex, endIndex).forEach(teacher => {
      teacher.selected = this.selectAll;
    });

    this.updateSelectedCount();
  }

  updateSelectedCount(): void {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;

    this.selectedCount = this.teachers.slice(startIndex, endIndex).filter(teacher => teacher.selected).length;
  }



  async confirmDelete(): Promise<void> {
    const selectedTeachers = this.teachers.filter(teacher => teacher.selected);
    if (selectedTeachers.length === 0) {
      alert('Seleccione al menos un docente para eliminar.');
      return;
    }

    const assignedTeachers: { teacher: any; courses: string[] }[] = [];
    const unassignedTeacherIds: string[] = [];

    for (const teacher of selectedTeachers) {
      const assignedCourses = await this.checkTeacherAssignment(teacher.id);
      if (assignedCourses && assignedCourses.length > 0) {
        assignedTeachers.push({ teacher, courses: assignedCourses });
      } else {
        unassignedTeacherIds.push(teacher.id);
      }
    }

    // Proceder con la eliminación de los docentes no asignados
    if (unassignedTeacherIds.length > 0) {
      if (confirm(`¿Está seguro de que desea eliminar ${unassignedTeacherIds.length} docentes?`)) {
        try {
          await this.teacherService.deleteTeachers(unassignedTeacherIds);
          alert('Docentes eliminados exitosamente.');
          this.fetchTeachers(); // Recargar la tabla
          this.selectAll = false; // Deseleccionar el checkbox general
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error al eliminar docentes:', error.message);
          } else {
            console.error('Error al eliminar docentes:', error);
          }
          alert('Hubo un error al eliminar los docentes.');
        }
      }
    }

    // Mostrar mensaje de validación para los docentes asignados
    if (assignedTeachers.length > 0) {
      const assignedMessages = assignedTeachers.map(({ teacher, courses }) =>
        `${teacher.nombre}:\nAsignado a los siguientes cursos:\n- ${courses.join('\n- ')}`
      ).join('\n\n-------------------------\n\n');

      this.showModalMessage(`Los siguientes docentes no pueden ser eliminados:\n\n${assignedMessages}`);
    }
  }




  updatePaginatedTeachers(): void {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedTeachers = this.teachers.slice(startIndex, endIndex);
  }

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) return;

    this.currentPage = newPage;
    this.selectAll = false; // Deseleccionar checkbox general
    this.updatePaginatedTeachers(); // Actualizar datos visibles
    this.updateSelectedCount(); // Actualizar el conteo de seleccionados
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

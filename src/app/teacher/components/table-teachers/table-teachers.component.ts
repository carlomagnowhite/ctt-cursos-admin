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

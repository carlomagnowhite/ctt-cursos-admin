import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-modal-add-teacher',
  templateUrl: './modal-add-teacher.component.html',
  styleUrl: './modal-add-teacher.component.css'
})
export class ModalAddTeacherComponent {
  teacherForm: FormGroup;

  @Input() teacherData: any = null; // Datos del docente a editar
  @Output() close = new EventEmitter<void>(); // Para cerrar el modal
  @Output() refreshTable = new EventEmitter<void>(); // Para recargar la tabla

  teacher = {
    nombre: '',
    apellido: '',
    correo: '',
    cargo: '',
    titulo: '',
    img: '', // Aquí guardaremos la URL de la imagen
  };

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private teacherService: TeacherService) {
    this.teacherForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      titulo: ['', Validators.required],
      cargo: ['', Validators.required],
      img: [null],
    });
  }

  ngOnChanges(): void {
    console.log('Datos cargados en el modal:', this.teacherData);
    if (this.teacherData) {
      this.teacherForm.patchValue(this.teacherData); // Precargar datos en el formulario
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Validamos manualmente el campo "img" si el archivo existe
      this.teacherForm.get('img')?.setValue(file.name); // Establece un valor ficticio
      this.teacherForm.get('img')?.updateValueAndValidity(); // Actualiza la validez
    }
  }

  async submitForm(): Promise<void> {
    if (this.teacherForm.valid) {
      try {
        const formData = this.teacherForm.value;

        // Subir la imagen si existe
        if (this.selectedFile) {
          const imageUrl = await this.teacherService.uploadImage(this.selectedFile);
          if (imageUrl) {
            formData.img = imageUrl;
          }
        }

        // Verifica si es agregar o actualizar
        if (formData.id) {
          await this.teacherService.updateTeacher(formData.id, formData);
          alert('Docente actualizado exitosamente.');
        } else {
          delete formData.id; // No enviar `id` en la creación
          await this.teacherService.addTeacher(formData);
          alert('Docente agregado exitosamente.');
        }

        this.refreshTable.emit();
        this.close.emit();
      } catch (error) {
        console.error('Error al guardar el docente:', error);
        alert('Hubo un error al guardar el docente.');
      }
    } else {
      alert('Por favor complete todos los campos correctamente.');
    }
  }

}

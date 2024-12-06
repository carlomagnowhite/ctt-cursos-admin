import { Component, EventEmitter, Output } from '@angular/core';
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

  @Output() close = new EventEmitter<void>();

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
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      titulo: ['', Validators.required],
      cargo: ['', Validators.required],
      img: [null],
    });
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

  async onSubmit() {
    if (this.selectedFile) {
      // Subir imagen a Supabase Storage
      const imageUrl = await this.teacherService.uploadImage(this.selectedFile);
      if (imageUrl) {
        this.teacher.img = imageUrl; // Asignar la URL de la imagen al objeto teacher
      }
    }

    // Guardar los datos del profesor en la base de datos
    await this.teacherService.addTeacher(this.teacher);
  }

  async submitForm(): Promise<void> {
    if (this.teacherForm.valid) {
      try {
        if (this.selectedFile) {
          const imageUrl = await this.teacherService.uploadImage(this.selectedFile);
          if (imageUrl) {
            this.teacher.img = imageUrl;
          }
        }
        const formData = this.teacherForm.value;
        formData.img = this.teacher.img; // Agregar URL de imagen al formulario
        await this.teacherService.addTeacher(formData);

        alert('Profesor agregado exitosamente');
        this.teacherForm.reset();
        this.selectedFile = null;
        this.close.emit();
      } catch (error) {
        console.error('Error al agregar el profesor:', error);
        alert('Hubo un error al agregar el profesor.');
      }
    } else {
      // Detectamos los campos inválidos y mostramos un mensaje
      const invalidFields = Object.keys(this.teacherForm.controls).filter(
        (field) => this.teacherForm.get(field)?.invalid
      );

      const fieldNames = invalidFields.map((field) => {
        switch (field) {
          case 'nombre':
            return 'Nombre';
          case 'apellido':
            return 'Apellido';
          case 'correo':
            return 'Correo';
          case 'titulo':
            return 'Título';
          case 'img':
            return 'Imagen';
          case 'cargo':
            return 'Cargo';
          default:
            return field;
        }
      });

      alert(`Por favor complete los siguientes campos: ${fieldNames.join(', ')}`);
    }
  }

}

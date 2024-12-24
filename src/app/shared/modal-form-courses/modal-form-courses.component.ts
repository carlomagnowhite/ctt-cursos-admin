import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../../services/Courses/courses.service';
import { Curso } from '../../interfaces/cursos.interface';
import { TeacherService } from '../../teacher/services/teacher.service';

@Component({
  selector: 'app-modal-form-courses',
  templateUrl: './modal-form-courses.component.html',
  styleUrl: './modal-form-courses.component.css',
})
export class ModalFormCoursesComponent {
  formCurso: FormGroup;
  loading: boolean = false;
  @Output() isModalOpenChange: EventEmitter<boolean> = new EventEmitter();
  @Input() courseData: any = null;
  submitted: boolean = false;
  cursosService: CoursesService = inject(CoursesService);
  teachersService: TeacherService = inject(TeacherService);
  teachers: any [] = [];

  constructor(private formBuilder: FormBuilder) {
    this.formCurso = this.formBuilder.group(
      {
        id: [''],
        nombre: ['', [Validators.required, Validators.minLength(10)]],
        ubicacion: ['', [Validators.required, Validators.minLength(10)]],
        img: [''],
        descripcion: ['', [Validators.required, Validators.minLength(40)]],
        objetivo: ['', [Validators.required, Validators.minLength(30)]],
        horario: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9] - (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
            ),
          ],
        ],
        id_docente_responsable: ['', [Validators.required]],
        modalidad: ['', [Validators.required]],
        cant_horas: ['', [Validators.required]],
        precio: ['', [Validators.required]],
        inicio_inscripciones: [
          '',
          [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
        ],
        fin_inscripciones: [
          '',
          [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
        ],
        inicio_curso: [
          '',
          [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
        ],
        fin_curso: [
          '',
          [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
        ],
      },
      {
        validators: [
          this.dateRangeValidator('inicio_inscripciones', 'fin_inscripciones'),
          this.dateRangeValidator('inicio_curso', 'fin_curso'),
        ],
      }
    );

    this.getTeachers();
  }

  async getTeachers(){
    try {
      const response = await this.teachersService.getTeachers();
      this.teachers = response;
      console.log(this.teachers);
    } catch (error) {
      throw error;
    }
  }

  closeModal() {
    this.isModalOpenChange.emit(false);
  }

  private dateRangeValidator(
    startField: string,
    endField: string
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const startDate = group.get(startField)?.value;
      const endDate = group.get(endField)?.value;

      if (!startDate || !endDate) {
        return null; // If either date is empty, don't validate here.
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        return { invalidDateRange: true }; // Return the error if the dates are invalid.
      }

      return null; // Dates are valid.
    };
  }

  async onSubmit() {
    const form = this.formCurso.value;
    this.submitted = true;
    try {
      if (this.formCurso.valid) {
        if (form.id) {
          this.updateCourse();
        } else {
          this.loading = true;
          console.log(this.prepareObjectPost());
          const response = await this.cursosService.addCourse(
            this.prepareObjectPost()
          );
          console.log('respuesta ' + response);
          this.closeModal();
        }
      } else {
        throw new Error(
          'Ha ocurrido un error con el formulario. ' + this.formCurso.errors
        );
      }
    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }

  prepareObjectUpdate(): Curso {
    const nuevoCurso: Curso = {
      id: this.formCurso.value.id,
      nombre: this.formCurso.value.nombre,
      ubicacion: this.formCurso.value.ubicacion,
      img: this.formCurso.value.img,
      descripcion: this.formCurso.value.descripcion,
      objetivo: this.formCurso.value.objetivo,
      horario: this.formCurso.value.horario,
      id_docente_responsable: this.formCurso.value.id_docente_responsable,
      modalidad: this.formCurso.value.modalidad,
      cant_horas: Number(this.formCurso.value.cant_horas), // Asegúrate de convertir a número
      precio: Number(this.formCurso.value.precio), // Asegúrate de convertir a número
      inicio_inscripciones: this.formCurso.value.inicio_inscripciones,
      fin_inscripciones: this.formCurso.value.fin_inscripciones,
      inicio_curso: this.formCurso.value.inicio_curso,
      fin_curso: this.formCurso.value.fin_curso,
    };
    return nuevoCurso;
  }

  prepareObjectPost(): Curso {
    const nuevoCurso: Curso = {
      nombre: this.formCurso.value.nombre,
      ubicacion: this.formCurso.value.ubicacion,
      img: this.formCurso.value.img,
      descripcion: this.formCurso.value.descripcion,
      objetivo: this.formCurso.value.objetivo,
      horario: this.formCurso.value.horario,
      id_docente_responsable: this.formCurso.value.id_docente_responsable,
      modalidad: this.formCurso.value.modalidad,
      cant_horas: Number(this.formCurso.value.cant_horas), // Asegúrate de convertir a número
      precio: Number(this.formCurso.value.precio), // Asegúrate de convertir a número
      inicio_inscripciones: this.formCurso.value.inicio_inscripciones,
      fin_inscripciones: this.formCurso.value.fin_inscripciones,
      inicio_curso: this.formCurso.value.inicio_curso,
      fin_curso: this.formCurso.value.fin_curso,
    };
    return nuevoCurso;
  }

  async updateCourse() {
    this.submitted = true;
    try {
      if (this.formCurso.valid) {
        this.loading = true;
        const response = await this.cursosService.updateCourse(
          this.prepareObjectUpdate()
        );
        console.log('Curso actualizado: ' + response);
        this.closeModal();
      }
    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }
}

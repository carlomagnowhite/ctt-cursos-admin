export interface Curso {
  id?: string,
  nombre: string,
  ubicacion: string,
  img: string,
  descripcion: string,
  objetivo: string,
  horario: string,
  id_docente_responsable: string,
  modalidad: string,
  cant_horas: number,
  precio: number,
  inicio_inscripciones: string,
  fin_inscripciones: string,
  inicio_curso: string,
  fin_curso: string,
  id_contenido_curso?: string
}

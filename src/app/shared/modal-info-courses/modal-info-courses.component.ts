import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-info-courses',
  templateUrl: './modal-info-courses.component.html',
  styleUrl: './modal-info-courses.component.css'
})
export class ModalInfoCoursesComponent {
  @Output() isModalOpenChange: EventEmitter<boolean> = new EventEmitter();
  @Input() courseInfo: any = null;


  closeModal(): void {
    this.isModalOpenChange.emit(false);
  }
}

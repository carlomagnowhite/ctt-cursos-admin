import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCustomComponent } from './table-custom.component';

describe('TableCustomComponent', () => {
  let component: TableCustomComponent;
  let fixture: ComponentFixture<TableCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCustomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

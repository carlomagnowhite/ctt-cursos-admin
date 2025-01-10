import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPricesComponent } from './modal-prices.component';

describe('ModalPricesComponent', () => {
  let component: ModalPricesComponent;
  let fixture: ComponentFixture<ModalPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalPricesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

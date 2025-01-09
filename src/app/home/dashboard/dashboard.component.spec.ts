import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { SharedModule } from '../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { TableComponent } from '../../shared/table/table.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockRouter = {
      url: '/dashboard',
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeaderComponent, SidebarComponent, TableComponent],
      providers: [
        { provide: Router, useValue: mockRouter }, // Inyecta el mock del Router
      ],
      imports: [SharedModule, RouterModule.forRoot([])], // Configura rutas vacías
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Renderización del componente correctamente', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Verifica que el componente contenga elementos del template
    expect(compiled.querySelector('router-outlet')).toBeTruthy(); // Asegúrate de que el router-outlet exista
  });

});

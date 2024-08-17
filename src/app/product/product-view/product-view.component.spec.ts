import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioViewComponent } from './product-view.component';

describe('InventarioViewComponent', () => {
  let component: InventarioViewComponent;
  let fixture: ComponentFixture<InventarioViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventarioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCloseConfirmComponent } from './modal-close-confirm.component';

describe('ModalCloseConfirmComponent', () => {
  let component: ModalCloseConfirmComponent;
  let fixture: ComponentFixture<ModalCloseConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCloseConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCloseConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

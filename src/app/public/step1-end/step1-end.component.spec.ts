import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1EndComponent } from './step1-end.component';

describe('Step1EndComponent', () => {
  let component: Step1EndComponent;
  let fixture: ComponentFixture<Step1EndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step1EndComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Step1EndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInvitationComponent } from './card-invitation.component';

describe('CardSubcategoryComponent', () => {
  let component: CardInvitationComponent;
  let fixture: ComponentFixture<CardInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInvitationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

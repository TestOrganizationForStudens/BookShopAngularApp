import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAcountComponent } from './personal-acount.component';

describe('PersonalAcountComponent', () => {
  let component: PersonalAcountComponent;
  let fixture: ComponentFixture<PersonalAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalAcountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

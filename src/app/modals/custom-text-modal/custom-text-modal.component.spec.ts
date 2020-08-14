import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTextModalComponent } from './custom-text-modal.component';

describe('CustomTextModalComponent', () => {
  let component: CustomTextModalComponent;
  let fixture: ComponentFixture<CustomTextModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTextModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

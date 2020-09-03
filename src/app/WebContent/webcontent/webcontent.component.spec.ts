import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcontentComponent } from './webcontent.component';

describe('WebcontentComponent', () => {
  let component: WebcontentComponent;
  let fixture: ComponentFixture<WebcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

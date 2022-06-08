import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DunutsComponent } from './dunuts.component';

describe('DunutsComponent', () => {
  let component: DunutsComponent;
  let fixture: ComponentFixture<DunutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DunutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DunutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

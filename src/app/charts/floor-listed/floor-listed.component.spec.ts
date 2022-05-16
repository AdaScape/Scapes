import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorListedComponent } from './floor-listed.component';

describe('FloorListedComponent', () => {
  let component: FloorListedComponent;
  let fixture: ComponentFixture<FloorListedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorListedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorListedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

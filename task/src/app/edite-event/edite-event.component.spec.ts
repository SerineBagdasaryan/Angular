import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeEventComponent } from './edite-event.component';

describe('EditeEventComponent', () => {
  let component: EditeEventComponent;
  let fixture: ComponentFixture<EditeEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

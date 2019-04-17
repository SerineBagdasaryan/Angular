import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBuilderComponent } from './dashboard.component';

describe('InvoiceBuilderComponent', () => {
  let component: InvoiceBuilderComponent;
  let fixture: ComponentFixture<InvoiceBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceBuilderComponent ]
    })
    .compileComponents();z
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

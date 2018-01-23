import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparePadAreaComponent } from './spare-pad-area.component';

describe('SparePadAreaComponent', () => {
  let component: SparePadAreaComponent;
  let fixture: ComponentFixture<SparePadAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparePadAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparePadAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadesGeneratorComponent } from './shades-generator.component';

describe('ShadesGeneratorComponent', () => {
  let component: ShadesGeneratorComponent;
  let fixture: ComponentFixture<ShadesGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadesGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShadesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

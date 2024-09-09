import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalettesComponent } from './palettes.component';

describe('PalettesComponent', () => {
  let component: PalettesComponent;
  let fixture: ComponentFixture<PalettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalettesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPreviewFile } from './master-preview-file';

describe('MasterPreviewFile', () => {
  let component: MasterPreviewFile;
  let fixture: ComponentFixture<MasterPreviewFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterPreviewFile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterPreviewFile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

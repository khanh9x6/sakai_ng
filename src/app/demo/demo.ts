import { SHARED_IMPORTS } from '@/shared/shared.import';
import { MasterPreviewFile } from './../master/master-preview-file/master-preview-file';
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  imports: [...SHARED_IMPORTS, MasterPreviewFile],
  templateUrl: './demo.html',
  styleUrl: './demo.scss'
})
export class Demo {
  demoFiles = [
    // PDF demo
    'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',

    // Ảnh JPG
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',

    // Ảnh PNG
    'http://localhost:4200/lost-valley.jpg',
    'http://localhost:4200/a.xlsx',
    'http://localhost:4200/data/lost-valley.jpg',

    // Excel (demo)
    'https://github.com/shadsluiter/ExcelExamples/raw/refs/heads/master/Cell%20Phone%20Plans%20compared2.xlsx',

    // File khác (ZIP)
    'https://file-examples.com/storage/fe0cebcf59a5caccb7a0b48/2017/02/zip_2MB.zip'
  ];
}

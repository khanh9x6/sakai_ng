import { MasterPreviewFile } from './../master/master-preview-file/master-preview-file';
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  imports: [],
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
    'https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg',

    // Excel (demo)
    'https://file-examples.com/storage/fe0cebcf59a5caccb7a0b48/2017/02/file_example_XLSX_10.xlsx',

    // File khác (ZIP)
    'https://file-examples.com/storage/fe0cebcf59a5caccb7a0b48/2017/02/zip_2MB.zip'
  ];
}

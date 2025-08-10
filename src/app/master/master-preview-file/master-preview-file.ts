import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-master-preview-file',
  imports: [],
  templateUrl: './master-preview-file.html',
  styleUrl: './master-preview-file.scss'
})
export class MasterPreviewFile {
  @Input() fileUrls: string[] = [];

  currentIndex = 0;
  zoomLevel = 1;

  get currentFile(): string {
    return this.fileUrls[this.currentIndex] || '';
  }

  get fileName(): string {
    try {
      return decodeURIComponent(this.currentFile.split('/').pop() || '');
    } catch {
      return this.currentFile.split('/').pop() || '';
    }
  }

  get fileType(): 'pdf' | 'image' | 'other' {
    const lower = this.currentFile.toLowerCase();
    if (lower.endsWith('.pdf')) return 'pdf';
    if (/\.(jpg|jpeg|png|webp|gif)$/i.test(lower)) return 'image';
    return 'other';
  }

  nextFile() {
    if (this.currentIndex < this.fileUrls.length - 1) {
      this.currentIndex++;
      this.resetZoom();
    }
  }

  prevFile() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.resetZoom();
    }
  }

  zoomIn() {
    this.zoomLevel += 0.2;
  }

  zoomOut() {
    if (this.zoomLevel > 0.4) {
      this.zoomLevel -= 0.2;
    }
  }

  resetZoom() {
    this.zoomLevel = 1;
  }
}
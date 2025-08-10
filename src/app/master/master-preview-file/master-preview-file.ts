import { SHARED_IMPORTS } from '@/shared/shared.import';
import { Component, Input, OnInit, SecurityContext, ElementRef, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-master-preview-file',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './master-preview-file.html',
  styleUrl: './master-preview-file.scss'
})
export class MasterPreviewFile implements OnInit, OnDestroy {
  @ViewChild('imageElement') imageElement?: ElementRef<HTMLImageElement>;

  constructor(private sanitizer: DomSanitizer) {}

  // Additional property to track image loading state
  imageLoading = false;
  imageError = false;
  showKeyboardHelp = false;

  // Touch gesture support
  private touchStartX = 0;
  private touchStartY = 0;
  private minSwipeDistance = 50;

  // Keyboard shortcuts
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.fileUrls || this.fileUrls.length === 0) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prevFile();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextFile();
        break;
      case '+':
      case '=':
        if (event.ctrlKey) {
          event.preventDefault();
          this.zoomIn();
        }
        break;
      case '-':
        if (event.ctrlKey) {
          event.preventDefault();
          this.zoomOut();
        }
        break;
      case '0':
        if (event.ctrlKey) {
          event.preventDefault();
          this.resetZoom();
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.resetZoom();
        break;
    }
  }

  ngOnInit(): void {
    // Initialize component
    this.resetZoom();
    console.log('File URLs:', this.fileUrls);
    this.preloadImages();
  }

  ngOnDestroy(): void {
    // Cleanup caches
    this.clearCaches();
  }

  // Preload images to check validity
  preloadImages() {
    if (this.fileUrls && this.fileUrls.length > 0) {
      this.fileUrls.forEach((url, index) => {
        if (this.getFileType(url) === 'image') {
          const img = new Image();
          img.onload = () => {
            console.log(`Image at index ${index} loaded successfully:`, url);
          };
          img.onerror = () => {
            console.error(`Failed to load image at index ${index}:`, url);
          };
          img.src = url;
        }
      });
    }
  }
  @Input() set fileUrls(urls: string[]) {
    console.log('Setting file URLs:', urls);
    this._fileUrls = urls || [];
    this.currentIndex = 0;
    this.resetZoom();

    // Clear caches when files change
    this.clearCaches();
  }
  get fileUrls(): string[] {
    return this._fileUrls;
  }
  private _fileUrls: string[] = [];

  // Clear all caches
  private clearCaches(): void {
    this._isLocalFileCache.clear();
    this._excelViewerUrlCache.clear();
    this._googleSheetsUrlCache.clear();
  }

  currentIndex = 0;
  zoomLevel = 1;

  get currentFile(): string {
    const file = this.fileUrls[this.currentIndex] || '';
    // Add debug logging to detect loops
    if (file) {
      console.log('Getting current file:', file, 'Index:', this.currentIndex);
    }
    return file;
  }

  get safeImageUrl(): SafeUrl {
    if (!this.currentFile) {
      return 'assets/layout/images/fallback-image.svg';
    }

    try {
      // Try to create a URL object to validate the URL
      new URL(this.currentFile);
      return this.sanitizer.bypassSecurityTrustUrl(this.currentFile);
    } catch (e) {
      console.error('Invalid URL:', this.currentFile, e);
      // If it's not a valid URL, try to treat it as a relative path
      return this.sanitizer.bypassSecurityTrustUrl(this.currentFile);
    }
  }

  // Get Excel viewer URL
  get excelViewerUrl(): SafeUrl {
    const currentFile = this.currentFile;
    if (!currentFile) return '';

    // Check cache first
    if (this._excelViewerUrlCache.has(currentFile)) {
      return this._excelViewerUrlCache.get(currentFile)!;
    }

    let result: SafeUrl = '';

    if (this.getFileType(currentFile) === 'excel') {
      // Check if file is local (not accessible by online viewers)
      if (this.isFileLocal(currentFile)) {
        result = ''; // Don't use online viewers for local files
      } else {
        try {
          // Only use Microsoft Office Online viewer for public files
          const msViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(currentFile)}`;
          result = this.sanitizer.bypassSecurityTrustResourceUrl(msViewerUrl);
        } catch (error) {
          console.error('Error creating Excel viewer URL:', error);
          result = '';
        }
      }
    }

    // Cache the result
    this._excelViewerUrlCache.set(currentFile, result);
    return result;
  }

  // Alternative Excel viewer URLs
  get googleSheetsViewerUrl(): SafeUrl {
    const currentFile = this.currentFile;
    if (!currentFile) return '';

    // Check cache first
    if (this._googleSheetsUrlCache.has(currentFile)) {
      return this._googleSheetsUrlCache.get(currentFile)!;
    }

    let result: SafeUrl = '';

    if (this.getFileType(currentFile) === 'excel' && !this.isFileLocal(currentFile)) {
      try {
        const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(currentFile)}&embedded=true`;
        result = this.sanitizer.bypassSecurityTrustResourceUrl(googleViewerUrl);
      } catch (error) {
        console.error('Error creating Google Sheets viewer URL:', error);
        result = '';
      }
    }

    // Cache the result
    this._googleSheetsUrlCache.set(currentFile, result);
    return result;
  }

  // Check if file is local/private (standalone method to avoid getter loops)
  isFileLocal(url: string): boolean {
    // Check cache first
    if (this._isLocalFileCache.has(url)) {
      return this._isLocalFileCache.get(url)!;
    }

    const lowerUrl = url.toLowerCase();
    const result = lowerUrl.startsWith('http://localhost') ||
           lowerUrl.startsWith('http://127.0.0.1') ||
           lowerUrl.startsWith('file://') ||
           lowerUrl.includes('localhost') ||
           lowerUrl.includes('127.0.0.1') ||
           !lowerUrl.startsWith('http'); // Relative paths are also local

    // Cache the result
    this._isLocalFileCache.set(url, result);
    return result;
  }

  // Check if file is local/private (getter for template)
  get isLocalFile(): boolean {
    return this.isFileLocal(this.currentFile);
  }

  // Check if file is Excel
  get isExcelFile(): boolean {
    return this.fileType === 'excel';
  }

  // Excel loading state
  excelLoading = false;
  excelError = false;
  showFileInfo = false;

  // Cache to prevent infinite loops
  private _isLocalFileCache = new Map<string, boolean>();
  private _excelViewerUrlCache = new Map<string, SafeUrl>();
  private _googleSheetsUrlCache = new Map<string, SafeUrl>();

  // Handle Excel iframe load events
  onExcelIframeLoad() {
    this.excelLoading = false;
    this.excelError = false;
  }

  onExcelIframeError() {
    this.excelLoading = false;
    this.excelError = true;
  }

  // Open Excel file in Office Online (new tab)
  openInOfficeOnline() {
    if (this.isExcelFile) {
      const officeUrl = `https://office.live.com/start/Excel.aspx?omkt=en-US&ui=en-US&rs=US&auth=1&nf=1&fromAR=1&wdPreviousSession=00000000-0000-0000-0000-000000000000&wdOrigin=BROWSELINK&url=${encodeURIComponent(this.currentFile)}`;
      window.open(officeUrl, '_blank');
    }
  }

  // Get Excel file type description
  getExcelTypeDescription(): string {
    const currentFile = this.currentFile;
    if (!currentFile) return 'Excel File';

    const fileName = currentFile.split('/').pop() || '';
    const ext = fileName.toLowerCase().split('.').pop();

    switch (ext) {
      case 'xlsx': return 'Excel Workbook (.xlsx)';
      case 'xls': return 'Excel 97-2003 Workbook (.xls)';
      case 'xlsm': return 'Excel Macro-Enabled Workbook (.xlsm)';
      case 'xlsb': return 'Excel Binary Workbook (.xlsb)';
      case 'csv': return 'Comma Separated Values (.csv)';
      default: return 'Excel File';
    }
  }

  get fileName(): string {
    const currentFile = this.currentFile;
    if (!currentFile) return '';

    try {
      return decodeURIComponent(currentFile.split('/').pop() || '');
    } catch {
      return currentFile.split('/').pop() || '';
    }
  }

  get fileType(): 'pdf' | 'image' | 'excel' | 'other' {
    return this.getFileType(this.currentFile);
  }

  // Helper method to determine file type from URL
  getFileType(url: string): 'pdf' | 'image' | 'excel' | 'other' {
    const lower = url.toLowerCase();
    if (lower.endsWith('.pdf')) return 'pdf';
    if (/\.(jpg|jpeg|png|webp|gif|bmp|svg)$/i.test(lower)) return 'image';
    if (/\.(xlsx|xls|xlsm|xlsb|csv)$/i.test(lower)) return 'excel';
    return 'other';
  }

  nextFile() {
    if (this.currentIndex < this.fileUrls.length - 1) {
      this.currentIndex++;
      this.resetZoom();
      this.imageError = false;
      this.excelError = false;
      this.showFileInfo = false;

      // Clear caches for new file
      this.clearCaches();
    }
  }

  prevFile() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.resetZoom();
      this.imageError = false;
      this.excelError = false;
      this.showFileInfo = false;

      // Clear caches for new file
      this.clearCaches();
    }
  }

  zoomIn() {
    if (this.zoomLevel < 3) {
      this.zoomLevel += 0.2;
      this.zoomLevel = Math.round(this.zoomLevel * 10) / 10; // Round to 1 decimal place
    }
  }

  zoomOut() {
    if (this.zoomLevel > 0.4) {
      this.zoomLevel -= 0.2;
      this.zoomLevel = Math.round(this.zoomLevel * 10) / 10; // Round to 1 decimal place
    }
  }

  resetZoom() {
    this.zoomLevel = 1;
  }

  // Smooth zoom to specific level
  zoomTo(level: number) {
    if (level >= 0.4 && level <= 3) {
      this.zoomLevel = level;
    }
  }

  // Method to handle image loading errors
  handleImageError(event: any) {
    console.error('Image failed to load:', this.currentFile);
    this.imageLoading = false;
    this.imageError = true;

    // Use SVG fallback image which is more reliable than PNG
    event.target.src = 'assets/layout/images/fallback-image.svg';

    // Add a class to the container to show it's a fallback
    if (this.imageElement?.nativeElement) {
      this.imageElement.nativeElement.classList.add('image-fallback');
    }
  }

  // Method to handle successful image load
  handleImageLoad(event: any) {
    this.imageLoading = false;
    this.imageError = false;

    // Remove fallback class if it exists
    if (this.imageElement?.nativeElement) {
      this.imageElement.nativeElement.classList.remove('image-fallback');
    }
  }

  // Method to handle image load start
  handleImageLoadStart(event: any) {
    this.imageLoading = true;
    this.imageError = false;
  }

  // Method to check if an image URL is valid
  loadImage(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  // Method to retry loading the current image
  retryLoadImage() {
    if (this.imageElement?.nativeElement) {
      this.imageLoading = true;
      this.imageError = false;

      // Remove the fallback class
      this.imageElement.nativeElement.classList.remove('image-fallback');

      // Set a new src to force reload
      this.imageElement.nativeElement.src = '';
      setTimeout(() => {
        if (this.imageElement?.nativeElement) {
          this.imageElement.nativeElement.src = this.currentFile;
        }
      }, 100);
    }
  }

  // Get zoom percentage for display
  get zoomPercentage(): number {
    return Math.round(this.zoomLevel * 100);
  }

  // Check if navigation is possible
  get canNavigatePrev(): boolean {
    return this.currentIndex > 0 && this.fileUrls.length > 1;
  }

  get canNavigateNext(): boolean {
    return this.currentIndex < this.fileUrls.length - 1 && this.fileUrls.length > 1;
  }

  // Get file size if available (for future implementation)
  get fileSizeDisplay(): string {
    // This would require additional metadata
    return '';
  }

  // Touch event handlers
  onTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (event.changedTouches.length === 1) {
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - this.touchStartX;
      const deltaY = touchEndY - this.touchStartY;

      // Check if it's a horizontal swipe (not vertical scroll)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
        if (deltaX > 0) {
          // Swipe right - previous file
          this.prevFile();
        } else {
          // Swipe left - next file
          this.nextFile();
        }
      }
    }
  }

  // Double tap to zoom
  onDoubleClick() {
    if (this.fileType === 'image') {
      if (this.zoomLevel === 1) {
        this.zoomTo(2);
      } else {
        this.resetZoom();
      }
    }
  }

  // Download current file
  downloadFile() {
    if (!this.currentFile) return;

    try {
      // Create a download link
      const link = document.createElement('a');
      link.href = this.currentFile;
      link.download = this.fileName || 'download';
      link.target = '_blank';

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Fallback: open in new tab
      window.open(this.currentFile, '_blank');
    }
  }
}

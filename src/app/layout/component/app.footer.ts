import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
       {{ version ? 'Version: ' + version : 'Loading version...' }}
    </div>`
})
export class AppFooter {
    version: string = '';

    constructor(private http: HttpClient) {
        this.http.get<{version: string}>(`assets/app.version.json`).subscribe({
            next: (data) => this.version = data.version,
            error: () => this.version = ''
        });
    }
}

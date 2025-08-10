# Tài liệu Cấu trúc Dự án Sakai NG

## Tổng quan
Sakai NG là một ứng dụng Angular hiện đại được xây dựng với Angular 20, sử dụng PrimeNG UI library và Tailwind CSS. Dự án được thiết kế theo kiến trúc component standalone và feature-based routing.

## Thông tin Dự án
- **Tên dự án**: Sakai NG  
- **Phiên bản**: 20.0.0
- **Framework**: Angular 20
- **UI Library**: PrimeNG 20
- **CSS Framework**: Tailwind CSS 4.1.11
- **Styling**: SCSS + Tailwind CSS

## Cấu trúc Thư mục

### Root Level
```
sakai_ng/
├── angular.json          # Cấu hình Angular CLI
├── package.json          # Dependencies và scripts
├── eslint.config.js      # Cấu hình ESLint
├── tsconfig.json         # Cấu hình TypeScript chính
├── tsconfig.app.json     # Cấu hình TypeScript cho app
├── tsconfig.spec.json    # Cấu hình TypeScript cho testing
├── vercel.json          # Cấu hình deployment Vercel
├── r.bat                # Script batch tùy chỉnh
└── README.md            # Tài liệu dự án
```

### Source Code (`src/`)

#### Core Files
```
src/
├── main.ts              # Entry point của ứng dụng
├── app.component.ts     # Root component
├── app.config.ts        # Cấu hình ứng dụng (providers)
├── app.routes.ts        # Định nghĩa routing chính
└── index.html           # File HTML chính
```

#### Application Structure (`src/app/`)

##### Layout System (`app/layout/`)
Hệ thống layout chính của ứng dụng:

**Components:**
- `app.layout.ts` - Component layout chính
- `app.topbar.ts` - Header/topbar component  
- `app.menu.ts` - Menu chính
- `app.menuitem.ts` - Menu item component
- `app.sidebar.ts` - Sidebar component
- `app.footer.ts` - Footer component
- `app.configurator.ts` - Theme configurator
- `app.floatingconfigurator.ts` - Floating theme configurator

**Services:**
- `layout.service.ts` - Service quản lý layout state

##### Pages (`app/pages/`)
Các trang/modules chính của ứng dụng:

**Authentication (`auth/`)**
- `login.ts` - Trang đăng nhập
- `access.ts` - Trang access control
- `error.ts` - Trang lỗi
- `auth.routes.ts` - Routing cho authentication

**Dashboard (`dashboard/`)**
- `dashboard.ts` - Trang dashboard chính
- **Widgets:**
  - `bestsellingwidget.ts` - Widget sản phẩm bán chạy
  - `notificationswidget.ts` - Widget thông báo
  - `recentsaleswidget.ts` - Widget doanh số gần đây
  - `revenuestreamwidget.ts` - Widget dòng doanh thu
  - `statswidget.ts` - Widget thống kê

**CRUD Operations (`crud/`)**
- `crud.ts` - Trang CRUD operations

**Landing Page (`landing/`)**
- `landing.ts` - Trang landing chính
- **Components:**
  - `featureswidget.ts` - Widget tính năng
  - `footerwidget.ts` - Widget footer
  - `herowidget.ts` - Widget hero section
  - `highlightswidget.ts` - Widget highlights
  - `pricingwidget.ts` - Widget bảng giá
  - `topbarwidget.component.ts` - Widget topbar

**UI Kit Demo (`uikit/`)**
Các component demo cho PrimeNG:
- `buttondemo.ts` - Demo buttons
- `chartdemo.ts` - Demo charts
- `filedemo.ts` - Demo file upload
- `formlayoutdemo.ts` - Demo form layouts
- `inputdemo.ts` - Demo input components
- `listdemo.ts` - Demo list components
- `mediademo.ts` - Demo media components
- `menudemo.ts` - Demo menu components
- `messagesdemo.ts` - Demo message components
- `miscdemo.ts` - Demo miscellaneous components
- `overlaydemo.ts` - Demo overlay components
- `panelsdemo.ts` - Demo panel components
- `tabledemo.ts` - Demo table components
- `timelinedemo.ts` - Demo timeline components
- `treedemo.ts` - Demo tree components
- `uikit.routes.ts` - Routing cho UI Kit

**Other Pages:**
- `documentation/` - Trang tài liệu
- `empty/` - Trang trống (template)
- `notfound/` - Trang 404

##### Services (`app/pages/service/`)
Các service chung:
- `country.service.ts` - Service quản lý quốc gia
- `customer.service.ts` - Service quản lý khách hàng
- `icon.service.ts` - Service quản lý icons
- `node.service.ts` - Service quản lý nodes
- `photo.service.ts` - Service quản lý photos
- `product.service.ts` - Service quản lý sản phẩm

##### Demo Module (`app/demo/`)
- `demo.ts` - Component demo
- `demo.html` - Template demo
- `demo.scss` - Styles demo
- `demo.spec.ts` - Unit tests demo

##### Master Module (`app/master/`)
- `master-preview-file/` - Module preview file master

### Assets (`src/assets/`)

#### Core Assets
- `app.version.json` - File version info
- `styles.scss` - Global styles chính
- `tailwind.css` - Tailwind CSS imports

#### Demo Assets (`demo/`)
- `code.scss` - Styles cho code blocks
- `demo.scss` - Styles cho demo components
- `flags/` - Resources flags

#### Layout Styles (`layout/`)
**Core Styles:**
- `layout.scss` - Layout styles chính
- `_core.scss` - Core fundamental styles
- `_main.scss` - Main content styles
- `_mixins.scss` - SCSS mixins
- `_utils.scss` - Utility classes

**Component Styles:**
- `_footer.scss` - Footer styles
- `_menu.scss` - Menu styles  
- `_topbar.scss` - Topbar styles
- `_typography.scss` - Typography styles

**System Styles:**
- `_preloading.scss` - Loading states
- `_responsive.scss` - Responsive breakpoints

**Theme Variables (`variables/`):**
- `_common.scss` - Common variables
- `_dark.scss` - Dark theme variables
- `_light.scss` - Light theme variables

## Kiến trúc Ứng dụng

### 1. Entry Point
- **File**: `main.ts`
- **Chức năng**: Bootstrap ứng dụng với standalone components

### 2. App Configuration
- **File**: `app.config.ts`
- **Providers**:
  - Router với scroll restoration
  - HTTP Client với fetch
  - PrimeNG với Aura theme
  - Animations

### 3. Routing Strategy
- **Lazy Loading**: Sử dụng cho các feature modules
- **Guards**: Có thể implement cho authentication
- **Preloading**: Có thể cấu hình cho performance

### 4. Component Architecture
- **Standalone Components**: Không sử dụng NgModules
- **Feature-based**: Tổ chức theo features/pages
- **Reusable Widgets**: Components tái sử dụng trong dashboard

### 5. Styling Strategy
- **SCSS**: Preprocessing CSS
- **Tailwind CSS**: Utility-first framework
- **PrimeNG Themes**: Aura preset với dark mode
- **CSS Variables**: Cho theme switching

## Dependencies Chính

### Production Dependencies
- **@angular/\***: Angular framework v20
- **primeng**: UI component library v20
- **@primeuix/themes**: Theme system
- **primeicons**: Icon library
- **chart.js**: Charting library
- **tailwindcss-primeui**: Tailwind integration với PrimeNG
- **ng2-pdf-viewer**: PDF viewing capability

### Development Dependencies
- **@angular/cli**: Angular CLI tools
- **eslint**: Code linting
- **prettier**: Code formatting
- **karma/jasmine**: Testing framework
- **autoprefixer**: CSS prefixing

## Scripts Có sẵn

```bash
npm start          # Chạy dev server
npm run build      # Build production
npm run watch      # Build với watch mode
npm run format     # Format code với Prettier
npm test           # Chạy unit tests
```

## Patterns và Best Practices

### 1. File Naming
- Components: `component-name.ts`
- Services: `service-name.service.ts`
- Routes: `feature.routes.ts`

### 2. Code Organization
- Feature-based folder structure
- Separation of concerns
- Reusable components/widgets

### 3. Styling
- Component-scoped styles
- Global utilities với Tailwind
- Theme variables cho customization

### 4. State Management
- Service-based state (Layout Service)
- Có thể mở rộng với NgRx nếu cần

## Mở rộng Dự án

### Thêm Component Mới

#### 1. Tạo Component Standalone
Dự án sử dụng standalone components, không cần NgModule.

**Cấu trúc file component:**
```typescript
// example-component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import các dependencies cần thiết

@Component({
    selector: 'app-example-component',
    standalone: true,
    imports: [
        CommonModule,
        // Các modules/components khác
    ],
    template: `
        <!-- Template HTML -->
    `,
    styleUrls: ['./example-component.scss'] // Nếu có file SCSS riêng
})
export class ExampleComponent {
    // Component logic
}
```

#### 2. Các Loại Component Thường Dùng

**A. Page Component (Trang chính):**
```typescript
// src/app/pages/new-page/new-page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-new-page',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="card">
            <h1>New Page</h1>
            <p>Content goes here</p>
        </div>
    `
})
export class NewPage {}
```

**B. Widget Component (Dashboard widget):**
```typescript
// src/app/pages/dashboard/components/new-widget.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-new-widget',
    standalone: true,
    imports: [CommonModule, CardModule],
    template: `
        <p-card [header]="title">
            <ng-content></ng-content>
        </p-card>
    `
})
export class NewWidget {
    @Input() title: string = 'Default Title';
}
```

**C. Layout Component:**
```typescript
// src/app/layout/component/app.new-component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-new-component',
    standalone: true,
    imports: [CommonModule],
    template: `
        <!-- Layout component template -->
    `
})
export class AppNewComponent {
    constructor(public layoutService: LayoutService) {}
}
```

#### 3. Sử dụng PrimeNG Components
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-prime-example',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        CardModule,
        TableModule
    ],
    template: `
        <p-card header="PrimeNG Example">
            <input pInputText placeholder="Enter text" />
            <p-button label="Click me" (click)="handleClick()"></p-button>
            <p-table [value]="data" [columns]="columns">
                <!-- Table content -->
            </p-table>
        </p-card>
    `
})
export class PrimeExampleComponent {
    data: any[] = [];
    columns: any[] = [];
    
    handleClick() {
        // Handle button click
    }
}
```

#### 4. Component với Routing
```typescript
// src/app/pages/products/products.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="card">
            <h1>Products Page</h1>
            <button (click)="navigateToDetail(1)">View Product Detail</button>
        </div>
    `
})
export class ProductsComponent {
    constructor(private router: Router) {}
    
    navigateToDetail(id: number) {
        this.router.navigate(['/products', id]);
    }
}

// src/app/pages/products/products.routes.ts
import { Routes } from '@angular/router';
import { ProductsComponent } from './products';
import { ProductDetailComponent } from './product-detail';

export default [
    { path: '', component: ProductsComponent },
    { path: ':id', component: ProductDetailComponent }
] as Routes;
```

#### 5. Component với Service
```typescript
// src/app/pages/service/example.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExampleService {
    constructor(private http: HttpClient) {}
    
    getData(): Observable<any[]> {
        return this.http.get<any[]>('/api/data');
    }
}

// Component sử dụng service
import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../service/example.service';

@Component({
    selector: 'app-data-component',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div *ngFor="let item of data">
            {{ item.name }}
        </div>
    `
})
export class DataComponent implements OnInit {
    data: any[] = [];
    
    constructor(private exampleService: ExampleService) {}
    
    ngOnInit() {
        this.exampleService.getData().subscribe(
            data => this.data = data
        );
    }
}
```

#### 6. Styling Component

**A. Inline Styles với Tailwind:**
```typescript
@Component({
    template: `
        <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Title</h2>
            <p class="text-gray-600">Content</p>
        </div>
    `
})
```

**B. Component SCSS File:**
```scss
// example-component.scss
:host {
    display: block;
    
    .custom-class {
        background: var(--surface-ground);
        padding: 1rem;
        border-radius: var(--border-radius);
        
        h2 {
            color: var(--text-color);
            margin-bottom: 0.5rem;
        }
        
        @media (max-width: 768px) {
            padding: 0.5rem;
        }
    }
}
```

### Thêm Feature Mới
1. Tạo folder trong `src/app/pages/feature-name/`
2. Tạo component chính `feature-name.ts`
3. Tạo routing file `feature-name.routes.ts`
4. Update `app.routes.ts` để include lazy route

### Thêm Widget Mới
1. Tạo component trong `src/app/pages/dashboard/components/`
2. Import và sử dụng trong `dashboard.ts`

### Thêm Service Mới
1. Tạo service trong `src/app/pages/service/`
2. Provide trong `app.config.ts` nếu cần global

### Custom Theme
1. Modify variables trong `src/assets/layout/variables/`
2. Customize PrimeNG theme trong `app.config.ts`

## Quy trình Tạo Component Từng Bước

### Bước 1: Xác định loại component
- **Page Component**: Trang chính có routing
- **Widget Component**: Component tái sử dụng
- **Layout Component**: Component layout
- **Feature Component**: Component cho một tính năng cụ thể

### Bước 2: Tạo file component
```bash
# Tạo thư mục và file (nếu cần)
mkdir src/app/pages/example
touch src/app/pages/example/example.ts
```

### Bước 3: Implement component cơ bản
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="card">
            <h1>Example Component</h1>
        </div>
    `
})
export class ExampleComponent {}
```

### Bước 4: Thêm vào routing (nếu là page component)
```typescript
// Trong app.routes.ts hoặc feature.routes.ts
{ path: 'example', component: ExampleComponent }
```

### Bước 5: Test component
- Chạy `npm start` để kiểm tra
- Navigate đến route của component
- Kiểm tra console errors

## Best Practices cho Components

### 1. Naming Conventions
- **File**: `kebab-case.ts` (vd: `user-profile.ts`)
- **Class**: `PascalCase` (vd: `UserProfileComponent`)
- **Selector**: `app-kebab-case` (vd: `app-user-profile`)

### 2. Component Structure
```typescript
@Component({
    // Metadata
    selector: 'app-example',
    standalone: true,
    imports: [...],
    template: `...`,
    styleUrls: ['...']
})
export class ExampleComponent implements OnInit, OnDestroy {
    // Public properties
    @Input() inputProperty: string = '';
    @Output() outputEvent = new EventEmitter<any>();
    
    // Private properties
    private subscription: Subscription = new Subscription();
    
    // Constructor
    constructor(private service: ExampleService) {}
    
    // Lifecycle hooks
    ngOnInit() {}
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    // Public methods
    public handleClick() {}
    
    // Private methods
    private helperMethod() {}
}
```

### 3. Import Organization
```typescript
// Angular core imports
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Third party imports
import { ButtonModule } from 'primeng/button';

// Application imports
import { ExampleService } from '../service/example.service';
```

### 4. Template Guidelines
```html
<!-- Use semantic HTML -->
<section class="example-section">
    <header>
        <h1>Title</h1>
    </header>
    
    <main>
        <!-- Use *ngIf for conditional rendering -->
        <div *ngIf="showContent; else loading">
            Content
        </div>
        
        <ng-template #loading>
            <p>Loading...</p>
        </ng-template>
        
        <!-- Use trackBy for *ngFor -->
        <ul>
            <li *ngFor="let item of items; trackBy: trackByFn">
                {{ item.name }}
            </li>
        </ul>
    </main>
</section>
```

### 5. Error Handling
```typescript
export class ExampleComponent implements OnInit {
    loading = false;
    error: string | null = null;
    data: any[] = [];
    
    ngOnInit() {
        this.loadData();
    }
    
    private loadData() {
        this.loading = true;
        this.error = null;
        
        this.service.getData().subscribe({
            next: (data) => {
                this.data = data;
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Failed to load data';
                this.loading = false;
                console.error('Error loading data:', error);
            }
        });
    }
}
```

### 6. Performance Tips
- Sử dụng `OnPush` change detection khi có thể
- Implement `trackBy` functions cho `*ngFor`
- Lazy load components khi cần thiết
- Unsubscribe observables trong `ngOnDestroy`

## Testing Components

### 1. Unit Test Template
```typescript
// example.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
    let component: ExampleComponent;
    let fixture: ComponentFixture<ExampleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExampleComponent] // Standalone component
        }).compileComponents();

        fixture = TestBed.createComponent(ExampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render title', () => {
        component.title = 'Test Title';
        fixture.detectChanges();
        
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Test Title');
    });
});
```

### 2. Testing với Services
```typescript
describe('ComponentWithService', () => {
    let component: ComponentWithService;
    let fixture: ComponentFixture<ComponentWithService>;
    let mockService: jasmine.SpyObj<ExampleService>;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('ExampleService', ['getData']);

        await TestBed.configureTestingModule({
            imports: [ComponentWithService],
            providers: [
                { provide: ExampleService, useValue: spy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ComponentWithService);
        component = fixture.componentInstance;
        mockService = TestBed.inject(ExampleService) as jasmine.SpyObj<ExampleService>;
    });
});
```

## Debugging và Troubleshooting

### 1. Common Issues

**A. Standalone Component Import Errors:**
```typescript
// ❌ Sai
@Component({
    imports: [SomeModule] // Thiếu trong imports
})

// ✅ Đúng
@Component({
    imports: [CommonModule, SomeModule]
})
```

**B. Service Injection Issues:**
```typescript
// ❌ Sai - Service chưa được provided
constructor(private service: MyService) {}

// ✅ Đúng - Provide service
@Injectable({
    providedIn: 'root' // hoặc provide trong app.config.ts
})
export class MyService {}
```

**C. Routing Issues:**
```typescript
// ❌ Sai - Missing RouterModule import
@Component({
    template: `<router-outlet></router-outlet>`
})

// ✅ Đúng
@Component({
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
```

### 2. Debug Tools
- **Angular DevTools**: Browser extension để debug
- **Console Logging**: Sử dụng `console.log()` và `console.error()`
- **Breakpoints**: Đặt breakpoints trong browser DevTools
- **Angular CLI**: Sử dụng `ng serve --verbose` để debug build

### 3. Performance Monitoring
```typescript
// Measure component render time
export class ExampleComponent implements OnInit, AfterViewInit {
    ngOnInit() {
        console.time('component-init');
    }
    
    ngAfterViewInit() {
        console.timeEnd('component-init');
    }
}
```

## Component Examples Repository

Tham khảo các component có sẵn trong dự án:

- **Layout Components**: `src/app/layout/component/`
- **Dashboard Widgets**: `src/app/pages/dashboard/components/`
- **UI Kit Demos**: `src/app/pages/uikit/`
- **Authentication Pages**: `src/app/pages/auth/`

Mỗi component này đều là ví dụ tốt về cách implement các pattern khác nhau trong Angular standalone components.

Tài liệu này cung cấp cái nhìn tổng quan về cấu trúc dự án Sakai NG và hướng dẫn để developers có thể hiểu và contribute vào dự án một cách hiệu quả.

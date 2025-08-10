# Hướng dẫn tái sử dụng các Module trong Angular Standalone Components

Dự án Sakai NG sử dụng Angular Standalone Components, cho phép import trực tiếp các module cần thiết vào mỗi component. Khi phát triển ứng dụng, bạn sẽ thấy nhiều components thường xuyên cần import cùng một tập hợp các modules. Tài liệu này cung cấp các phương pháp để tổ chức và tái sử dụng các imports một cách hiệu quả.

## Các phương pháp tái sử dụng Imports

### 1. Tạo Shared Imports File

#### Bước 1: Tạo file shared imports
```typescript
// src/app/shared/shared-imports.ts
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG UI Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// Export tất cả các modules
export const COMMON_IMPORTS = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
];

export const PRIMENG_IMPORTS = [
    ButtonModule,
    InputTextModule,
    CardModule,
    TableModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule
];

// Có thể tạo các export khác theo chức năng
export const FORM_IMPORTS = [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
];

export const TABLE_IMPORTS = [
    TableModule,
    ButtonModule,
    DialogModule
];
```

#### Bước 2: Sử dụng shared imports trong components
```typescript
// src/app/pages/example/example.ts
import { Component } from '@angular/core';
import { COMMON_IMPORTS, PRIMENG_IMPORTS } from '@/shared/shared-imports';

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [...COMMON_IMPORTS, ...PRIMENG_IMPORTS],
    template: `
        <div class="card">
            <h1>Example Component</h1>
            <p-button label="Click me"></p-button>
        </div>
    `
})
export class ExampleComponent {}
```

### 2. Tạo Shared Component Base

Một cách khác là tạo các component cơ sở mà các component khác có thể kế thừa:

```typescript
// src/app/shared/base-component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

@Component({
    template: '',
    standalone: true,
    imports: [CommonModule, ButtonModule, CardModule, DialogModule]
})
export class BaseComponent {
    // Common logic can go here
}
```

```typescript
// src/app/pages/example/example.ts
import { Component } from '@angular/core';
import { BaseComponent } from '@/shared/base-component';

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [...BaseComponent.ɵcmp.imports], // Spread operator để sử dụng imports từ BaseComponent
    template: `
        <div class="card">
            <h1>Example Component</h1>
        </div>
    `
})
export class ExampleComponent extends BaseComponent {}
```

### 3. Tạo Custom Module Function

```typescript
// src/app/shared/module-utils.ts
import { Type } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG UI Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

export function getUIModules(): Type<any>[] {
    return [
        CommonModule,
        ButtonModule,
        InputTextModule,
        CardModule
    ];
}

export function getDataModules(): Type<any>[] {
    return [
        // Data related modules
    ];
}
```

```typescript
// src/app/pages/example/example.ts
import { Component } from '@angular/core';
import { getUIModules } from '@/shared/module-utils';

@Component({
    selector: 'app-example',
    standalone: true,
    imports: [...getUIModules()],
    template: `
        <div class="card">
            <h1>Example Component</h1>
            <p-button label="Click me"></p-button>
        </div>
    `
})
export class ExampleComponent {}
```

## Thực hiện trong dự án Sakai NG

Dựa vào phân tích các components trong dự án, sau đây là một số nhóm imports thường dùng:

### 1. Tạo thư mục shared

```bash
mkdir -p src/app/shared
```

### 2. Tạo file shared-imports.ts

```typescript
// src/app/shared/shared-imports.ts

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Core UI
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

// PrimeNG Data
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

// PrimeNG Form
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

// PrimeNG Media/Misc
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ProgressBarModule } from 'primeng/progressbar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';

// Export nhóm theo chức năng
export const COMMON_IMPORTS = [
    CommonModule,
    RouterModule
];

export const FORM_IMPORTS = [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    InputTextareaModule
];

export const LAYOUT_IMPORTS = [
    CardModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule
];

export const DATA_IMPORTS = [
    TableModule,
    TreeModule,
    TreeTableModule
];

export const MISC_IMPORTS = [
    ProgressBarModule,
    BadgeModule,
    AvatarModule,
    ScrollPanelModule,
    TagModule,
    ChipModule,
    ButtonModule,
    SkeletonModule,
    AvatarGroupModule,
    ScrollTopModule,
    OverlayBadgeModule
];

// Export nhóm theo UI component demo
export const BUTTON_DEMO_IMPORTS = [
    CommonModule,
    ButtonModule
];

export const TABLE_DEMO_IMPORTS = [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule
];

export const MISC_DEMO_IMPORTS = [
    CommonModule,
    ProgressBarModule,
    BadgeModule,
    AvatarModule,
    ScrollPanelModule,
    TagModule,
    ChipModule,
    ButtonModule,
    SkeletonModule,
    AvatarGroupModule,
    ScrollTopModule,
    OverlayBadgeModule
];
```

### 3. Tái cấu trúc MiscDemo

```typescript
// src/app/pages/uikit/miscdemo.ts
import { Component } from '@angular/core';
import { MISC_DEMO_IMPORTS } from '@/shared/shared-imports';

@Component({
    selector: 'app-misc-demo',
    standalone: true,
    imports: [...MISC_DEMO_IMPORTS],
    template: `
        <!-- template hiện tại giữ nguyên -->
    `
})
export class MiscDemo {
    value = 0;
    interval: any;

    ngOnInit() {
        this.interval = setInterval(() => {
            this.value = this.value + Math.floor(Math.random() * 10) + 1;
            if (this.value >= 100) {
                this.value = 100;
                clearInterval(this.interval);
            }
        }, 2000);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
```

## Best Practices

### 1. Khi nào nên tái sử dụng imports
- Khi nhiều components sử dụng cùng một tập hợp modules
- Khi có nhiều PrimeNG components được sử dụng cùng nhau
- Trong các modules feature lớn với nhiều components

### 2. Khi nào KHÔNG nên tái sử dụng imports
- Khi component chỉ cần một số ít module (1-3 modules)
- Khi optimizing bundle size là ưu tiên cao (lazy loading)
- Khi component có imports rất đặc biệt không dùng lại

### 3. Cân nhắc Bundle Size
Khi tái sử dụng imports, hãy cẩn thận không import quá nhiều module không cần thiết vào một component. Điều này có thể ảnh hưởng đến bundle size và performance.

### 4. Quản lý Path
Đảm bảo cấu hình paths trong `tsconfig.json` để sử dụng imports ngắn gọn:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@shared/*": ["src/app/shared/*"]
    }
  }
}
```

## Tổng kết

Việc tái sử dụng imports trong Angular Standalone Components giúp:
- Giảm code trùng lặp
- Dễ dàng bảo trì khi thay đổi dependencies
- Tăng tính nhất quán trong toàn bộ dự án
- Đơn giản hóa việc thêm/sửa components

Tuy nhiên, cần cân nhắc giữa sự tiện lợi và optimizing bundle size để có trải nghiệm người dùng tốt nhất.

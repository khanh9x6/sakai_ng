import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    template: ` 
<div class="layout-topbar">
    <div class="layout-topbar-logo-container">
        <a class="layout-topbar-logo" routerLink="/">
            <span>HOme</span>
        </a>
        <button type="button" class="layout-topbar-action" (click)="toggleSlimPlusMode()" title="Toggle Slim Plus Menu">
            <i class="pi"
                [ngClass]="{ 'pi-angle-double-right': layoutService.layoutState().slimPlusMenuActive , 'pi-angle-double-left': layoutService.layoutState().slimPlusMenuActive == false }"></i>
        </button>
    </div>

    <div class="layout-topbar-actions">
        <div class="layout-config-menu">
            <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                <i
                    [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
            </button>
            <div class="relative">
                <button class="layout-topbar-action layout-topbar-action-highlight" pStyleClass="@next"
                    enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden"
                    leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                    <i class="pi pi-palette"></i>
                </button>
                <app-configurator />
            </div>
        </div>

        <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden"
            enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout"
            [hideOnOutsideClick]="true">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu hidden lg:block">
            <div class="layout-topbar-menu-content">
                <button type="button" class="layout-topbar-action">
                    <i class="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" class="layout-topbar-action">
                    <i class="pi pi-inbox"></i>
                    <span>Messages</span>
                </button>
                <button type="button" class="layout-topbar-action">
                    <i class="pi pi-user"></i>
                    <span>Profile</span>
                </button>
            </div>
        </div>
    </div>
</div>
    `
})
export class AppTopbar {
    onMenuButtonClick() {
        if (window.innerWidth <= 1024) {
            // Nếu đang slim plus thì ẩn menu, ngược lại thì hiện slim plus
            if (this.layoutService.layoutState().slimPlusMenuActive) {
                this.layoutService.onSlimPlusModeToggle(); // Tắt slim plus (ẩn menu)
            } else {
                this.layoutService.onSlimPlusModeToggle(); // Bật slim plus
            }
        } else {
            // Desktop/laptop: chuyển giữa menu thường và slim plus
            if (this.layoutService.layoutState().slimPlusMenuActive) {
                this.layoutService.onSlimModeToggle(); // Chuyển về menu thường
            } else {
                this.layoutService.onSlimPlusModeToggle(); // Chuyển sang slim plus
            }
        }
    }
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) { }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    toggleSlimMode() {
        if (window.innerWidth <= 1024) {
            this.layoutService.onSlimPlusModeToggle();
        } else {
            this.layoutService.onSlimModeToggle();
        }
    }

    toggleSlimPlusMode() {
        this.layoutService.onSlimPlusModeToggle();
    }
}

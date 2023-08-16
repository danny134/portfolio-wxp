import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { MenuComponent } from './desktop/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DesktoptwoComponent } from './desktoptwo/desktoptwo.component';
import { NgxExplorerDndModule } from 'ngx-explorer-dnd';
import { FolderComponent } from './childs/folder/folder.component';
import { FileComponent } from './childs/file/file.component';
import { DialogWindowsComponent } from './dialog-windows/dialog-windows.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    TaskbarComponent,
    MenuComponent,
    DesktoptwoComponent,
    FolderComponent,
    FileComponent,
    DialogWindowsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgxExplorerDndModule,
    MatDialogModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

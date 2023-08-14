import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { DesktopComponent } from './desktop/desktop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DesktoptwoComponent } from './desktoptwo/desktoptwo.component';
import { NgxExplorerDndModule } from 'ngx-explorer-dnd';
import { FolderComponent } from './childs/folder/folder.component';
import { FileComponent } from './childs/file/file.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskbarComponent,
    DesktopComponent,
    DesktoptwoComponent,
    FolderComponent,
    FileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgxExplorerDndModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

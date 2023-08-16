import {
  Component,
  HostListener,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FileFolder, FileFolderType, moveItemInArray } from 'ngx-explorer-dnd';
import { FileComponent } from '../childs/file/file.component';
import { FolderComponent } from '../childs/folder/folder.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowsComponent } from '../dialog-windows/dialog-windows.component';

@Component({
  selector: 'app-desktoptwo',
  templateUrl: './desktoptwo.component.html',
  styleUrls: ['./desktoptwo.component.scss'],
})
export class DesktoptwoComponent {
  directories = ['Folder 1', 'Folder 2', 'Folder 3', 'Folder 4'];
  files = ['File 1', 'File 2', 'File 3', 'File 4'];

  allTogether = [
    { type: 'DIRECTORY', name: 'Folder 1' },
    { type: 'DIRECTORY', name: 'Folder 2' },
    { type: 'DIRECTORY', name: 'Folder 3' },
    { type: 'DIRECTORY', name: 'Folder 4' },
  ];
  icons = [
    { type: 'DIRECTORY', name: 'Folder 1' },
    { type: 'DIRECTORY', name: 'Folder 2' },
    { type: 'DIRECTORY', name: 'Folder 3' },
    { type: 'DIRECTORY', name: 'Folder 4' },
  ];

  myElement!: HTMLElement;

  isDragInProgress: boolean = false;
  shiftPressed: boolean = false;
  cancelAnimation: boolean = false;
  badgeCount: string | null = null;

  @ViewChildren(FileFolder)
  fileFolderComponents!: QueryList<FileFolder>;

  // ----- HELPER
  checkIfElementInsideRect(
    rect: any,
    selectionBorder: { x: number; y: number; width: number; height: number }
  ) {
    if (
      ((selectionBorder.x >= rect.x &&
        selectionBorder.x <= rect.x + rect.width) ||
        (selectionBorder.x <= rect.x &&
          selectionBorder.x + selectionBorder.width >= rect.x)) &&
      ((selectionBorder.y >= rect.y &&
        selectionBorder.y <= rect.y + rect.height) ||
        (selectionBorder.y <= rect.y &&
          selectionBorder.y + selectionBorder.height >= rect.y))
    ) {
      return true;
    } else {
      return false;
    }
  }
  // ----- HELPER

  constructor(private dialog: MatDialog) {
    // Example to set a custom selection div HTMLElement
    // this.myElement = document.createElement('div');
    // this.myElement.style.position = 'absolute';
    // this.myElement.style.width = '100px';
    // this.myElement.style.height = '100px';
    // this.myElement.style.backgroundColor = 'green';
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogWindowsComponent, {
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  ngAfterViewInit() {
    // Actualizar la cuadrícula después de la vista inicial
    this.updateGrid();
  }
  private updateGrid() {
    const numColumns = Math.floor(window.innerWidth / 35); // 100px (icon width) + 10px (gap)
    this.allTogether = [
      ...this.allTogether,
      ...Array.from({ length: numColumns * 10 }, (_, index) => ({
        name: `Icon${index + 1}`,
        type: 'FILE',
      })),
    ];
  }
  dragInProgress(event: boolean) {
    this.isDragInProgress = event;
  }

  selectedElementsChange(event: { count: number; data: FileFolder[] }) {
    for (let _data of this.fileFolderComponents) {
      _data.selected = false;
    }

    for (let _data of event.data) {
      _data.selected = true;
    }
  }

  drop(event: any) {
    // Show the optional event data and the selected components
    // Do whatever you wanna do with it! :-)
    console.log(
      event,
      this.fileFolderComponents.filter((f) => f.selected)
    );

    if (this.cancelAnimation) {
      // false? No target under mouse
      for (let _fileFolder of this.fileFolderComponents.filter(
        (f) => f.selected
      )) {
        if (_fileFolder.id && _fileFolder.id.includes('File')) {
          this.files.splice(
            this.files.findIndex((f) => f === _fileFolder.id),
            1
          );
        }
        if (_fileFolder.id && _fileFolder.id.includes('Folder')) {
          this.directories.splice(
            this.directories.findIndex((f) => f === _fileFolder.id),
            1
          );
        }
      }
    }
  }

  sortDrop(event: any) {
    // oldIndex and newIndex are only filled when sortingEnabled=true
    if (event.oldIndex !== null) {
      console.log('Drop event sorting', event);
      moveItemInArray(this.allTogether, event.oldIndex, event.newIndex);
    }
    moveItemInArray(this.files, event.oldIndex, event.newIndex);
  }

  targetChange(event: any) {
    // The target folder as example; event = { target: any | null}
    // So if any target under mouse stop "move back" animation as example.
    console.log(event.target);
    if (event.target) {
      this.cancelAnimation = true;
    } else {
      this.cancelAnimation = false;
    }
  }

  @HostListener('window:keydown.Shift', ['$event'])
  onKeyDownShift(ev: any) {
    this.shiftPressed = true;
  }

  @HostListener('window:keyup.Shift', ['$event'])
  onKeyUpShift(ev: any) {
    this.shiftPressed = false;
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(ev: any) {
    const selectedFileFolders = this.fileFolderComponents.filter(
      (f) => f.selected
    ).length;

    this.badgeCount =
      selectedFileFolders > 1 ? selectedFileFolders.toString() : null;

    let anyFileFolderSelected = false;

    for (let data of this.fileFolderComponents) {
      // Get if the component a FileComponent or a FolderComponent

      type typeOfComponent<T> = T extends FileFolderType.File
        ? FileComponent
        : FolderComponent;

      const rect = (
        data as typeOfComponent<typeof data>
      ).elRef.nativeElement.getBoundingClientRect();
      if (
        this.checkIfElementInsideRect(rect, {
          x: ev.x,
          y: ev.y,
          width: 1,
          height: 1,
        })
      ) {
        anyFileFolderSelected = true;
        // If the component under the mouse is selected already, ignore
        if (data.selected) {
          ev.preventDefault();
          return;
        }

        // If shift pressed do not deselect selected components
        if (!this.shiftPressed) {
          for (let data of this.fileFolderComponents) {
            data.selected = false;
          }
        }
        data.selected = true;
      }
    }
    // Last click goes into an empty place: remove all selections
    if (!anyFileFolderSelected)
      for (let data of this.fileFolderComponents) {
        data.selected = false;
      }
  }
}

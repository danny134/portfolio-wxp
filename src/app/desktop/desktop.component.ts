import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
})
export class DesktopComponent {
  desktopIcons = [{ name: 'Icon1', url: '../assets/img/Calculator.png' }];
  boxWidth = 100;
  columnSize!: number;
  itemsTable!: Array<number[]>;
  items: Array<number> = Array.from({ length: 21 }, (v, k) => k + 1);

  desktopTrueIcons = [
    { name: 'Icon1', url: '../assets/img/Calculator.png' },
    { name: 'Icon2', url: '../assets/img/Zip folder.png' },

    // ... Agrega más iconos aquí
  ];

  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    // Actualizar la cuadrícula después de la vista inicial
    this.updateGrid();
  }
  private updateGrid() {
    const numColumns = Math.floor(window.innerWidth / 110); // 100px (icon width) + 10px (gap)
    this.desktopIcons = [
      // ...this.desktopTrueIcons,
      ...Array.from({ length: numColumns * 10 }, (_, index) => ({
        name: `Icon${index + 1}`,
        url: '',
      })),
    ];
  }
  onDrop(event: CdkDragDrop<any[]>) {
    debugger;
    moveItemInArray(this.desktopIcons, event.previousIndex, event.currentIndex);
  }
  getItemsTable(rowLayout: Element): number[][] {
    // calculate column size per row
    const { width } = rowLayout.getBoundingClientRect();
    const columnSize = Math.round(width / this.boxWidth);
    // view has been resized? => update table with new column size
    if (columnSize != this.columnSize) {
      this.columnSize = columnSize;
      this.initTable();
    }
    return this.itemsTable;
  }
  initTable() {
    // create table rows based on input list
    // example: [1,2,3,4,5,6] => [ [1,2,3], [4,5,6] ]
    this.itemsTable = this.items
      .filter((_, outerIndex) => outerIndex % this.columnSize == 0) // create outter list of rows
      .map(
        (
          _,
          rowIndex // fill each row from...
        ) =>
          this.items.slice(
            rowIndex * this.columnSize, // ... row start and
            rowIndex * this.columnSize + this.columnSize // ...row end
          )
      );
  }
  reorderDroppedItem(event: CdkDragDrop<number[]>) {
    // same row/container? => move item in same row
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // different rows? => transfer item from one to another list
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // update items after drop: flatten matrix into list
    // example: [ [1,2,3], [4,5,6] ] => [1,2,3,4,5,6]
    this.items = this.itemsTable.reduce(
      (previous, current) => previous.concat(current),
      []
    );

    // re-initialize table - makes sure each row has same numbers of entries
    // example: [ [1,2], [3,4,5,6] ] => [ [1,2,3], [4,5,6] ]
    this.initTable();
  }
}

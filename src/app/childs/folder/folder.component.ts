import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { FileFolder, FileFolderType } from 'ngx-explorer-dnd';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
  providers: [
    { provide: FileFolder, useExisting: forwardRef(() => FolderComponent) },
  ],
})
export class FolderComponent extends FileFolder implements OnInit {
  @Input() myId!: string;

  constructor(public elRef: ElementRef) {
    super();
    this.type = FileFolderType.Folder;
  }

  ngOnInit(): void {
    this.id = this.myId;
  }
}

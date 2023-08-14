import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { FileFolder } from 'ngx-explorer-dnd';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  providers: [
    { provide: FileFolder, useExisting: forwardRef(() => FileComponent) },
  ],
})
export class FileComponent extends FileFolder implements OnInit {
  @Input() myId!: string;

  constructor(public elRef: ElementRef) {
    super();
  }

  ngOnInit(): void {
    this.id = this.myId;
  }
}

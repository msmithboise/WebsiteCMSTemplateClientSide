import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomImageService } from '../services/custom-image.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { WebcontentService } from '../WebContent/webcontent.service';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2,
}

@Component({
  selector: 'app-resizable-draggable',
  templateUrl: './resizable-draggable.component.html',
  styleUrls: ['./resizable-draggable.component.scss'],
})
export class ResizableDraggableComponent implements OnInit, AfterViewInit {
  @Input('width') public width: number;
  @Input('height') public height: number;
  @Input('left') public left: number;
  @Input('top') public top: number;
  @Input('cover') public cover: string;
  @ViewChild('box') public box: ElementRef;
  private boxPosition: { left: number; top: number };
  public mouse: { x: number; y: number };
  public status: Status = Status.OFF;
  private containerPos: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  private mouseClick: { x: number; y: number; left: number; top: number };
  public pageIdSnapshot: number;

  constructor(
    public webContentService: WebcontentService,
    public customImageService: CustomImageService
  ) {}

  ngOnInit(): void {
    this.getDivRect();
  }

  ngAfterViewInit() {
    this.loadBox();
    this.loadContainer();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };

    if (this.status === Status.RESIZE) this.resize();
    else if (this.status === Status.MOVE) this.move();
  }

  grabAllContentByPageId() {
    this.webContentService.pageIdSnapshot = this.pageIdSnapshot;

    this.customImageService
      .getWebContentByPageId(this.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        this.webContentService.webContentArray = res;
        console.log('here is the content array:');
        console.log(this.webContentService.webContentArray);

        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }

  imageForm = new FormGroup({
    width: new FormControl(''),
    height: new FormControl(''),
    left: new FormControl(''),
    top: new FormControl(''),
    ImageUrl: new FormControl(''),
    Id: new FormControl(''),
    PageId: new FormControl(''),
  });

  onImageSubmit(
    width: number,
    height: number,
    left: number,
    top: number,
    imageUrl: string,
    id: number
  ) {
    console.log('width:');
    console.log(width);
    console.log('height:');
    console.log(height);
    console.log('left');
    console.log(left);
    console.log('top');
    console.log(top);

    let image = this.imageForm.value;

    image.width = width;
    image.height = height;
    image.left = left;
    image.top = top;
    image.ImageUrl = imageUrl;
    image.id = id;
    image.PageId = this.webContentService.pageIdSnapshot;

    this.webContentService.postImageFormDataByPageId(image).subscribe((res) => {
      console.log(res);
    });
  }

  getDivRect() {
    let elem = document.getElementById('resize-div');
    console.log('here is the div after query:');
    console.log(elem);
    elem.style.backgroundColor = '#5C969E';
  }

  private loadBox() {
    const { left, top } = this.box.nativeElement.getBoundingClientRect();
    this.boxPosition = { left, top };
    console.log('here are the exact coordinates taken from DOM.. Ojinaka');
    console.log(this.box.nativeElement.getBoundingClientRect());
  }

  private loadContainer() {
    const left = this.boxPosition.left - this.left;
    const top = this.boxPosition.top - this.top;
    const right = left + 600;
    const bottom = top + 450;
    this.containerPos = { left, top, right, bottom };
  }

  setStatus(event: MouseEvent, status: number) {
    if (status === 1) event.stopPropagation();
    else if (status === 2)
      this.mouseClick = {
        x: event.clientX,
        y: event.clientY,
        left: this.left,
        top: this.top,
      };
    else this.loadBox();
    this.status = status;
  }

  private resize() {
    if (this.resizeCondMeet()) {
      this.width = Number(this.mouse.x > this.boxPosition.left)
        ? this.mouse.x - this.boxPosition.left
        : 0;
      this.height = Number(this.mouse.y > this.boxPosition.top)
        ? this.mouse.y - this.boxPosition.top
        : 0;
    }
  }

  private resizeCondMeet() {
    return (
      this.mouse.x < this.containerPos.right &&
      this.mouse.y < this.containerPos.bottom
    );
  }

  private move() {
    if (this.moveCondMeet()) {
      this.left = this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
      this.top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);
    }
  }

  private moveCondMeet() {
    const offsetLeft = this.mouseClick.x - this.boxPosition.left;
    const offsetRight = this.width - offsetLeft;
    const offsetTop = this.mouseClick.y - this.boxPosition.top;
    const offsetBottom = this.height - offsetTop;
    return (
      this.mouse.x > this.containerPos.left + offsetLeft &&
      this.mouse.x < this.containerPos.right - offsetRight &&
      this.mouse.y > this.containerPos.top + offsetTop &&
      this.mouse.y < this.containerPos.bottom - offsetBottom
    );
  }
}
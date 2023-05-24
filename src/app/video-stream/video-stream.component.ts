import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent implements OnInit {
  @ViewChild('videoElement', { static: true }) videoElement: ElementRef;
  videoStream: MediaStream;
  canvasElement: HTMLCanvasElement;

  constructor(private http: HttpClient) {
    console.log("On Video Stream Component constructor");
  }

  ngOnInit(): void {
    console.log("On In It Video Stream Component");
    this.canvasElement = document.createElement('canvas');
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream: MediaStream) => {
        this.videoStream = stream;
        this.videoElement.nativeElement.srcObject = stream;
        this.streamFrames();
      })
      .catch((error) => {
        console.error('Error accessing video stream:', error);
      });
  }

  streamFrames(): void {
    console.log("On streamFrames Video Stream Component");
    const canvas = this.canvasElement;
    const context = canvas.getContext('2d');

    setInterval(() => {
      console.log("On set interval Video Stream Component");
      context.drawImage(this.videoElement.nativeElement, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
  
      this.http.post('/process_frame', imageData, { responseType: 'text' }).subscribe((response) => {
        console.log(response);
      });
    }, 1000 / 30);
  }
}

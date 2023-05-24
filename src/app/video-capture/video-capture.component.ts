import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VideoConnectService } from '../service/video-connect.service';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.css']
})
export class VideoCaptureComponent implements OnInit {
  @ViewChild('videoElement', { static: true }) videoElement: ElementRef;
  videoStream: MediaStream;
  canvasElement: HTMLCanvasElement;

  constructor(private service: VideoConnectService) { } 
  
  ngOnInit(): void {
    this.canvasElement = document.createElement('canvas');
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream: MediaStream) => {
        this.videoStream = stream;
        this.videoElement.nativeElement.srcObject = stream;
        this.captureFrames();
      })
      .catch((error) => {
        console.error('Error accessing video stream:', error);
      });
  }

  captureFrames(): void {
    const canvas = this.canvasElement;
    const context = canvas.getContext('2d');

    setInterval(() => {
      context.drawImage(this.videoElement.nativeElement, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      this.postDataFunction(imageData);
    }, 1000 / 30);
  }

  postDataFunction(imageData: String): void{
    this.service.postDataToFlask(imageData).subscribe( 
      data => {
        console.log(data);
      },
      error=> {
        console.log("unable to fetch data cluster",error);
      }
    );
  }
}

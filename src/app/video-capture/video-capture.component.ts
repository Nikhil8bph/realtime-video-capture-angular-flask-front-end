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
  capturing: boolean = false;
  frameInterval: any;

  constructor(private service: VideoConnectService) { } 
  
  ngOnInit(): void {
    // this.startCapture();
    this.videoElement.nativeElement.style.display = 'block';
  }

  startCapture(): void {
    this.videoElement.nativeElement.style.display = 'block';
    this.capturing = true;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream: MediaStream) => {
        this.videoStream = stream;
        this.videoElement.nativeElement.srcObject = stream;
        this.capturing = true;
        this.frameInterval = setInterval(() => this.captureFrame(), 1000 / 30);
      })
      .catch((error) => {
        console.error('Error accessing video stream:', error);
      });
  }

  stopCapture(): void {
    // this.videoElement.nativeElement.style.display = 'none';
    this.capturing = false;
    if (this.frameInterval) {
      clearInterval(this.frameInterval);
    }
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
    }
  }

  captureFrame(): void {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const video = this.videoElement.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    this.postDataFunction(imageData);
  }

  postDataFunction(imageData: String): void{
    this.service.postDataToFlask(imageData).subscribe( 
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error sending frame to Flask:', error);
      }
    );
  }
}

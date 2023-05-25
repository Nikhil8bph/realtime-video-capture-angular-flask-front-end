import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoConnectService {

  constructor(private http: HttpClient) { }

  private VISNAVE_URL = environment.scrumAppUrl;

  postDataToFlask(imageData: String) {
    return this.http.post(this.VISNAVE_URL+"process_frame",imageData);
  }
  
}

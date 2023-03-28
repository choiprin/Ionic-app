//tab3.page.ts 파일

import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('inputVoice', { static: true }) inputVoiceElement: ElementRef;

  inputVoice = '';

  constructor(
    private speechRecognition: SpeechRecognition,
    private androidPermissions: AndroidPermissions,
    private renderer: Renderer2
  ) {}

  startRecognition() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
      result => {
        if (result.hasPermission) {
          this.startListening();
        } else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
            () => {
              this.startListening();
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );
  }
  
  startListening() {
    this.speechRecognition.startListening()
      .subscribe(
        (matches: string[]) => {
          console.log(matches);
          this.inputVoice = matches[0];
          this.renderer.setProperty(this.inputVoiceElement.nativeElement, 'textContent', matches[0]);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // stopRecognition() {
  //   this.speechRecognition.stopListening();
  //   console.log('Recognition stopped');
  // }
}

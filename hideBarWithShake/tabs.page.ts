//tabs.page.ts 파일

import { Component } from '@angular/core';
import { Platform, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  counter: number = 0;

  constructor(
    private platform: Platform,
    private navController: NavController,
    private toastController: ToastController
  ) {}

  isTabBarHidden = false;
  private lastShakeTime = 0;
  private readonly shakeDelay = 2000; // 2초 대기 시간

  ionViewDidEnter() {
    // Device Motion API를 사용하여 흔들림 이벤트 감지
    window.addEventListener('devicemotion', (event) => {
      const { acceleration, accelerationIncludingGravity } = event;

      if (Math.abs(accelerationIncludingGravity.x) > 20 || Math.abs(accelerationIncludingGravity.y) > 20 ||
      Math.abs(accelerationIncludingGravity.z) > 20) {
        const currentTime = Date.now();
        // 현재 시간과 마지막 흔들림 시간의 차이가 일정 시간 이상이면 하단 바 토글
        if (currentTime - this.lastShakeTime > this.shakeDelay) {
          this.lastShakeTime = currentTime;
          this.toggleTabBarAlert();
          this.toggleTabBar();
        }
      }
    });
  }

  toggleTabBar() {
    const tabBar = document.querySelector('ion-tab-bar');
    this.isTabBarHidden = !this.isTabBarHidden;
    tabBar.style.display = this.isTabBarHidden ? 'none' : 'flex';
  }

  toggleTabBarAlert() {
    this.counter++;

  if(this.counter==1){
      const toast = this.toastController.create({
        message: '하단 바를 숨깁니다',
        duration: 2000,
        position: 'bottom',
        cssClass: 'my-toast'
      });
  
      toast.then((toast) => {
        toast.present();
        const toastElement = document.querySelector('.my-toast') as HTMLElement;
        toastElement.style.transform = 'translateY(-80px)'; // Move the toast up by 80px
        toastElement.style.textAlign = 'center';
      });
      this.navController.pop();
    }

  else if(this.counter==2){
      const toast = this.toastController.create({
        message: '하단 바를 표시합니다',
        duration: 2000,
        position: 'bottom',
        cssClass: 'my-toast2'
      });
  
      toast.then((toast) => {
        toast.present();
        const toastElement = document.querySelector('.my-toast2') as HTMLElement;
        toastElement.style.transform = 'translateY(-80px)'; // Move the toast up by 80px
        toastElement.style.textAlign = 'center';
      });
      this.navController.pop();
    this.counter=0;
    }
  }

}

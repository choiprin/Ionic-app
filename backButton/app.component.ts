import { Component } from '@angular/core';
import { Platform, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  lastBack: number = 0;
  constructor(
    private platform: Platform,
    private navController: NavController,
    private toastController: ToastController
  ) {
    this.closeApp();
  }

  closeApp() { 

    this.platform.backButton.subscribeWithPriority(9999, () => {
      if (this.lastBack + 2000 < Date.now()) {
        this.lastBack = Date.now();
        this.backButtonAlert();
      } else {
        this.platform.backButton.unsubscribe();
        navigator['app'].exitApp();
      }
    });
  }

    backButtonAlert() {
      const timeSinceLastBack = Date.now() - this.lastBack;
      this.lastBack = Date.now();
  
      if (timeSinceLastBack < 2000) {
        this.toastController.create({
          message: '뒤로가기를 한번 더 눌러서 종료하세요!',
          duration: 2000
        }).then(toast => toast.present());
      } else {
        this.navController.pop();
      }
  }
}

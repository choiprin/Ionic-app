//tabs.page.ts 파일

import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isTabBarHidden = false;
  
  toggleTabBar() {
    const tabBar = document.querySelector('ion-tab-bar');
    this.isTabBarHidden = !this.isTabBarHidden;
    tabBar.style.display = this.isTabBarHidden ? 'none' : 'flex';
  }
}

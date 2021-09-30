import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector("#theme");

  constructor() { 
    const theme = localStorage.getItem("theme") || 'default-dark';
    this.linkTheme?.setAttribute('href', `./assets/css/colors/${ theme }.css`);
  }

  changeTheme( theme: string){
    
    const url = `./assets/css/colors/${ theme }.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', theme);

    this.selectedTheme();
  }

  selectedTheme(){
    const optionsTheme = document.querySelectorAll(".selector");

    const theme = localStorage.getItem("theme") || 'default-dark';

    optionsTheme.forEach( elem => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');

      if(btnTheme == theme)
      {
        elem.classList.add('working');
      }

    });
  }
}

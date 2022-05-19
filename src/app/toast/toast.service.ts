import { Injectable } from '@angular/core';
declare var $: any;
declare var Swal: any;

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showMessageSuccess(icon, title) {
    $(function() {
      Swal.fire({
        timer: 3000,
        icon: icon,
        title: title,
        showConfirmButton: false,
      });
    });
  }


}

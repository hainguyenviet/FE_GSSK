import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title: string, mess: string) {
    this.toastr.success(mess,title);
  }

  showError(title: string, mess: string) {
    this.toastr.error(mess,title);
  }

  showInfo(title: string, mess: string) {
    this.toastr.info(mess,title);
  }

  showWarning(title: string, mess: string) {
    this.toastr.warning(mess,title);
  }
}

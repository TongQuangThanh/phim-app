import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() title = 'Có lỗi xảy ra. Vui lòng thử lại sau!!!';
  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

}

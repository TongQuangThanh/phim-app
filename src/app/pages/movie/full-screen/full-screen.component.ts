import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { setVideoPlayer } from 'src/app/shared/common/utils';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent implements OnInit {
  @Input() url: string;
  isSuccess = true;
  counter = 5;
  timer = this.counter;
  private videoPlayer: any;
  private handlerEnded: any;
  private handlerExit: any;
  constructor(public modalCtrl: ModalController) { }

  async ngOnInit() {
    const player: any = await setVideoPlayer();
    this.videoPlayer = player.plugin;
    this.handlerEnded = await this.videoPlayer.addListener('jeepCapVideoPlayerEnded', () => this.leaveModal(true), false);
    this.handlerExit = await this.videoPlayer.addListener('jeepCapVideoPlayerExit', () => this.leaveModal(), false);
    window.screen.orientation.lock('landscape');
    await this.videoPlayer.initPlayer({
      mode: 'fullscreen', url: this.url, playerId: 'fullscreen', loopOnEnd: false, exitOnEnd: true, componentTag: 'app-full-screen'
    });
  }

  private async leaveModal(ended?: boolean): Promise<void> {
    window.screen.orientation.unlock();
    await this.videoPlayer.stopAllPlayers();
    // Remove all the plugin listeners
    this.handlerEnded.remove();
    this.handlerExit.remove();
    // Dismiss the modal view
    this.modalCtrl.dismiss({ dismissed: true, ended });
  }
}

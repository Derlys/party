import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { TNSPlayer } from 'nativescript-audio';

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})

export class ItemsComponent implements OnInit {
    @ViewChild('animateImg') animageImgEl: ElementRef;
    public img;
    private _player: TNSPlayer;
    public partying: boolean;
    constructor() {
        this._player = new TNSPlayer();
        this._player.initFromFile({
            audioFile: '~/app/audio.mp3', // ~ = root directory
            loop: false,
            completeCallback: this._trackComplete.bind(this),
            errorCallback: this._trackError.bind(this)
        }).then(() => {
            this._player.getAudioTrackDuration().then(duration => {
                // iOS: duration is in seconds
                // Android: duration is in milliseconds
                console.log(`song duration:`, duration);
            });
        });
    }

    ngOnInit(): void {
        this.img = this.animageImgEl.nativeElement;

    }

    private _trackComplete(args: any) {
        console.log('reference back to player:', args.player);
        console.log('whether song play completed successfully:', args.flag);
    }

    private _trackError(args: any) {
        console.log('reference back to player:', args.player);
        console.log('the error:', args.error);
        console.log('extra info on the error:', args.extra);
    }
    public togglePlay() {
        if (this._player.isAudioPlaying()) {
            this._player.pause();
            this.partying = false;
            this.stopAnimation();
        } else {
            this._player.play();
            this.partying = true;
            this.startAnimation();
        }
    }

    private animateInterval;
    startAnimation() {
        this.animateInterval = setInterval(() => {
            this.img.animate({
                scale: {x: 2, y: 2},
                rotate: 45,
                duration: 270
            }).then(() => {
                this.img.animate({
                    scale: {x: 1, y: 1},
                    rotate: 0,
                    duration: 270
                }).then(() => {}, err => {})
            }, err => {})
        }, 540)
    }

    stopAnimation() {
        clearInterval(this.animateInterval);
    }
}

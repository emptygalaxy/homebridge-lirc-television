import {IrRemote} from './IrRemote';
import {Logger} from 'homebridge/lib/logger';

export class Television {
    private readonly remote: IrRemote;

    private isOn = false;
    private muted = false;
    private playing = false;

    constructor(log: Logger, remoteName: string, commands?: {[k: string]: string}) {
        this.remote = new IrRemote(log, remoteName, commands);
    }

    public turnOn(): void {
        if(this.isOn) {
            return;
        }

        this.isOn = true;
        this.remote.power();
    }

    public turnOff(): void {
        if(!this.isOn) {
            return;
        }

        this.isOn = false;
        this.remote.power();
    }

    public isTurnedOn(): boolean {
        return this.isOn;
    }

    public up(): void {
        this.remote.up();
    }

    public down(): void {
        this.remote.down();
    }

    public left(): void {
        this.remote.left();
    }

    public right(): void {
        this.remote.right();
    }

    public select(): void {
        this.remote.enter();
    }

    public mute(): void {
        this.muted = !this.muted;
        this.remote.mute();
    }

    public volumeUp(): void {
        this.remote.volumeUp();
    }

    public volumeDown(): void {
        this.remote.volumeDown();
    }

    public rewind(): void {
        this.remote.rewind();
    }

    public forward(): void {
        this.remote.forward();
    }

    public back(): void {
        this.remote.back();
    }

    public exit(): void {
        this.remote.exit();
    }

    public playPause(): void {
        if(this.playing){
            this.remote.pause();
            this.playing = false;
        } else {
            this.remote.play();
            this.playing = true;
        }
    }

    public openSettings(): void {
        this.remote.settings();
    }

    public usb(): void {
        this.remote.usb();
    }

    public hdmi(): void {
        this.remote.input();
        setTimeout(this.remote.enter.bind(this.remote), 100);
    }
}
import {IrRemote} from './IrRemote';
import {Logger} from 'homebridge/lib/logger';
import EventEmitter from 'events';
import Timeout = NodeJS.Timeout;
import {TelevisionEvent} from './TelevisionEvent';
import {CommandsConfig} from './AccessoryConfig';

export class Television extends EventEmitter.EventEmitter {
    private readonly remote: IrRemote;

    private isOn = false;
    private muted = false;
    private playing = false;

    private readonly automaticOffTime: number;
    private readonly enableAutomaticOff: boolean = true;
    private automaticOffTimeout?: Timeout;

    constructor(log: Logger, remoteName: string, commands?: CommandsConfig, automaticOffTime?: number) {
        super();

        this.remote = new IrRemote(log, remoteName, commands);

        this.automaticOffTime = (automaticOffTime || 0) * 1000 * 60;
        this.enableAutomaticOff = this.automaticOffTime > 0;
    }

    public turnOn(): void {
        if(this.isOn) {
            return;
        }

        this.remote.power();
        this.isOn = true;
        this.emit(TelevisionEvent.TurnedOn);

        this.handleInput();
    }

    public turnOff(): void {
        if(!this.isOn) {
            return;
        }

        this.remote.power();
        this.isOn = false;
        this.emit(TelevisionEvent.TurnedOff);

        this.handleInput();
    }

    public isTurnedOn(): boolean {
        return this.isOn;
    }

    public up(): void {
        this.remote.up();

        this.handleInput();
    }

    public down(): void {
        this.remote.down();

        this.handleInput();
    }

    public left(): void {
        this.remote.left();

        this.handleInput();
    }

    public right(): void {
        this.remote.right();

        this.handleInput();
    }

    public select(): void {
        this.remote.enter();

        this.handleInput();
    }

    public mute(): void {
        this.muted = !this.muted;
        this.remote.mute();

        this.handleInput();
    }

    public volumeUp(): void {
        this.remote.volumeUp();

        this.handleInput();
    }

    public volumeDown(): void {
        this.remote.volumeDown();

        this.handleInput();
    }

    public rewind(): void {
        this.remote.rewind();

        this.handleInput();
    }

    public forward(): void {
        this.remote.forward();

        this.handleInput();
    }

    public back(): void {
        this.remote.back();

        this.handleInput();
    }

    public exit(): void {
        this.remote.exit();

        this.handleInput();
    }

    public playPause(): void {
        if(this.playing){
            this.remote.pause();
            this.playing = false;
        } else {
            this.remote.play();
            this.playing = true;
        }

        this.handleInput();
    }

    public openSettings(): void {
        this.remote.settings();

        this.handleInput();
    }

    public usb(): void {
        this.remote.usb();

        this.handleInput();
    }

    public hdmi(): void {
        this.remote.input();
        setTimeout(this.remote.enter.bind(this.remote), 100);

        this.handleInput();
    }

    private handleInput(): void {
        if(this.enableAutomaticOff){
            // clear
            if(this.automaticOffTimeout) {
                clearTimeout(this.automaticOffTimeout);
            }

            this.automaticOffTimeout = setTimeout(this.handleAutomaticOffTimeout.bind(this), this.automaticOffTime);
        }
    }

    private handleAutomaticOffTimeout(): void {
        this.isOn = false;
        this.emit(TelevisionEvent.TurnedOff);
    }
}
import {IIrRemote} from './IIrRemote';
import {Logger} from 'homebridge/lib/logger';
import lirc = require('lirc_node');
// const lirc = require('lirc_node');

export class IrRemote implements IIrRemote {
    private log: Logger;
    private readonly remoteName;

    private readonly powerCommand;
    private readonly muteCommand;
    private readonly inputCommand;

    private readonly volumeUpCommand: string;
    private readonly volumeDownCommand: string;
    private readonly pageUpCommand: string;
    private readonly pageDownCommand: string;

    private readonly pictureCommand: string;
    private readonly blankCommand: string;

    private readonly upCommand: string;
    private readonly leftCommand: string;
    private readonly enterCommand: string;
    private readonly rightCommand: string;
    private readonly downCommand: string;

    private readonly exitCommand: string;
    private readonly backCommand: string;

    private readonly settingsCommand: string;
    private readonly qMenuCommand: string;

    private readonly stillCommand: string;
    private readonly ratioCommand: string;
    private readonly usbCommand: string;

    private readonly helpCommand: string;
    private readonly keystoneUpCommand: string;
    private readonly keystoneDownCommand: string;

    private readonly rewindCommand: string;
    private readonly playCommand: string;
    private readonly forwardCommand: string;
    private readonly stopCommand: string;
    private readonly pauseCommand: string;

    private readonly redCommand: string;
    private readonly greenCommand: string;
    private readonly yellowCommand: string;
    private readonly blueCommand: string;

    constructor(log: Logger, remoteName?: string, commands?: {[k: string]: string}) {
        lirc.init();

        this.log = log;
        this.remoteName = remoteName || 'LG-P150G-GL';

        if(commands === undefined) {
            commands = {};
        }
        this.powerCommand = commands.power || 'KEY_POWER';
        this.muteCommand = commands.mute || 'KEY_MUTE';
        this.inputCommand = commands.input || 'KEY_SCREEN';

        this.volumeUpCommand = commands.volumeUp || 'KEY_VOLUMEUP';
        this.volumeDownCommand = commands.volumeDown || 'KEY_VOLUMEDOWN';
        this.pageUpCommand = commands.pageUp || 'KEY_PAGEUP';
        this.pageDownCommand = commands.pageDown || 'KEY_PAGEDOWN';

        this.pictureCommand = commands.picture || 'KEY_PC';
        this.blankCommand = commands.blank || 'KEY_CLEAR';

        this.upCommand = commands.up || 'KEY_UP';
        this.leftCommand = commands.left || 'KEY_LEFT';
        this.enterCommand = commands.enter || 'KEY_ENTER';
        this.rightCommand = commands.right || 'KEY_RIGHT';
        this.downCommand = commands.down || 'KEY_DOWN';

        this.exitCommand = commands.exit || 'KEY_EXIT';
        this.backCommand = commands.back || 'KEY_BACK';

        this.settingsCommand = commands.settings || 'KEY_CONTROLPANEL';
        this.qMenuCommand = commands.qMenu || 'KEY_CONTEXT_MENU';

        this.stillCommand = commands.still || 'KEY_IMAGES';
        this.ratioCommand = commands.ratio || 'KEY_ZOOM';
        this.usbCommand = commands.usb || 'KEY_FILE';

        this.helpCommand = commands.help || 'KEY_HELP';
        this.keystoneUpCommand = commands.keystoneUp || 'KEY_CAMERA_UP';
        this.keystoneDownCommand = commands.keystoneDown || 'KEY_CAMERA_DOWN';

        this.rewindCommand = commands.rewind || 'KEY_REWIND';
        this.playCommand = commands.play || 'KEY_PLAY';
        this.forwardCommand = commands.forward || 'KEY_FORWARD';
        this.stopCommand = commands.stop || 'KEY_STOP';
        this.pauseCommand = commands.pause || 'KEY_PAUSE';

        this.redCommand = commands.red || 'KEY_RED';
        this.greenCommand = commands.green || 'KEY_GREEN';
        this.yellowCommand = commands.yellow || 'KEY_YELLOW';
        this.blueCommand = commands.blue || 'KEY_BLUE';
    }

    private send(command: string): void {
        this.log.info('Send LIRC', this.remoteName, command);
        lirc.irsend.send_once(this.remoteName, command);
    }

    public power(): void {
        this.send(this.powerCommand);
    }

    public mute(): void {
        this.send(this.muteCommand);
    }

    public input(): void {
        this.send(this.inputCommand);
    }

    public volumeUp(): void {
        this.send(this.volumeUpCommand);
    }

    public volumeDown(): void {
        this.send(this.volumeDownCommand);
    }

    public pageUp(): void {
        this.send(this.pageUpCommand);
    }

    public pageDown(): void {
        this.send(this.pageDownCommand);
    }


    public picture(): void {
        this.send(this.pictureCommand);
    }

    public blank(): void {
        this.send(this.blankCommand);
    }

    public up(): void {
        this.send(this.upCommand);
    }

    public left(): void {
        this.send(this.leftCommand);
    }

    public enter(): void {
        this.send(this.enterCommand);
    }

    public right(): void {
        this.send(this.rightCommand);
    }

    public down(): void {
        this.send(this.downCommand);
    }


    public exit(): void {
        this.send(this.exitCommand);
    }

    public back(): void {
        this.send(this.backCommand);
    }


    public settings(): void {
        this.send(this.settingsCommand);
    }

    public qMenu(): void {
        this.send(this.qMenuCommand);
    }

    public still(): void {
        this.send(this.stillCommand);
    }

    public ratio(): void {
        this.send(this.ratioCommand);
    }

    public usb(): void {
        this.send(this.usbCommand);
    }


    public help(): void {
        this.send(this.helpCommand);
    }

    public keystoneUp(): void {
        this.send(this.keystoneUpCommand);
    }

    public keystoneDown(): void {
        this.send(this.keystoneDownCommand);
    }


    public rewind(): void {
        this.send(this.rewindCommand);
    }

    public play(): void {
        this.send(this.playCommand);
    }

    public forward(): void {
        this.send(this.forwardCommand);
    }

    public stop(): void {
        this.send(this.stopCommand);
    }

    public pause(): void {
        this.send(this.pauseCommand);
    }

    public red(): void {
        this.send(this.redCommand);
    }

    public green(): void {
        this.send(this.greenCommand);
    }

    public yellow(): void {
        this.send(this.yellowCommand);
    }

    public blue(): void {
        this.send(this.blueCommand);
    }

}
import {IIrRemote} from './IIrRemote';

const lirc = require('lirc_node');

export class IrRemote implements IIrRemote {
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

    constructor(remoteName?: string, commands?: {[k: string]: string}) {
        lirc.init();

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


    public power(): void {
        lirc.irsend.send_once(this.remoteName, this.powerCommand);
    }

    public mute(): void {
        lirc.irsend.send_once(this.remoteName, this.muteCommand);
    }

    public input(): void {
        lirc.irsend.send_once(this.remoteName, this.inputCommand);
    }

    public volumeUp(): void {
        lirc.irsend.send_once(this.remoteName, this.volumeUpCommand);
    }

    public volumeDown(): void {
        lirc.irsend.send_once(this.remoteName, this.volumeDownCommand);
    }

    public pageUp(): void {
        lirc.irsend.send_once(this.remoteName, this.pageUpCommand);
    }

    public pageDown(): void {
        lirc.irsend.send_once(this.remoteName, this.pageDownCommand);
    }


    public picture(): void {
        lirc.irsend.send_once(this.remoteName, this.pictureCommand);
    }

    public blank(): void {
        lirc.irsend.send_once(this.remoteName, this.blankCommand);
    }

    public up(): void {
        lirc.irsend.send_once(this.remoteName, this.upCommand);
    }

    public left(): void {
        lirc.irsend.send_once(this.remoteName, this.leftCommand);
    }

    public enter(): void {
        lirc.irsend.send_once(this.remoteName, this.enterCommand);
    }

    public right(): void {
        lirc.irsend.send_once(this.remoteName, this.rightCommand);
    }

    public down(): void {
        lirc.irsend.send_once(this.remoteName, this.downCommand);
    }


    public exit(): void {
        lirc.irsend.send_once(this.remoteName, this.exitCommand);
    }

    public back(): void {
        lirc.irsend.send_once(this.remoteName, this.backCommand);
    }


    public settings(): void {
        lirc.irsend.send_once(this.remoteName, this.settingsCommand);
    }

    public qMenu(): void {
        lirc.irsend.send_once(this.remoteName, this.qMenuCommand);
    }

    public still(): void {
        lirc.irsend.send_once(this.remoteName, this.stillCommand);
    }

    public ratio(): void {
        lirc.irsend.send_once(this.remoteName, this.ratioCommand);
    }

    public usb(): void {
        lirc.irsend.send_once(this.remoteName, this.usbCommand);
    }


    public help(): void {
        lirc.irsend.send_once(this.remoteName, this.helpCommand);
    }

    public keystoneUp(): void {
        lirc.irsend.send_once(this.remoteName, this.keystoneUpCommand);
    }

    public keystoneDown(): void {
        lirc.irsend.send_once(this.remoteName, this.keystoneDownCommand);
    }


    public rewind(): void {
        lirc.irsend.send_once(this.remoteName, this.rewindCommand);
    }

    public play(): void {
        lirc.irsend.send_once(this.remoteName, this.playCommand);
    }

    public forward(): void {
        lirc.irsend.send_once(this.remoteName, this.forwardCommand);
    }

    public stop(): void {
        lirc.irsend.send_once(this.remoteName, this.stopCommand);
    }

    public pause(): void {
        lirc.irsend.send_once(this.remoteName, this.pauseCommand);
    }



    public red(): void {
        lirc.irsend.send_once(this.remoteName, this.redCommand);
    }

    public green(): void {
        lirc.irsend.send_once(this.remoteName, this.greenCommand);
    }

    public yellow(): void {
        lirc.irsend.send_once(this.remoteName, this.yellowCommand);
    }

    public blue(): void {
        lirc.irsend.send_once(this.remoteName, this.blueCommand);
    }

}
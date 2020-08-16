import {AccessoryPlugin, API} from 'homebridge/lib/api';
import {Logger} from 'homebridge/lib/logger';
import {Service, CharacteristicEventTypes, CharacteristicGetCallback, CharacteristicValue, CharacteristicSetCallback} from 'hap-nodejs';
import {Television} from './Television';
import {TelevisionEvent} from './TelevisionEvent';
import {AccessoryConfig, CommandsConfig} from './AccessoryConfig';

export class TelevisionAccessory implements AccessoryPlugin {
    private readonly log: Logger;
    private readonly config;
    private readonly api: API;

    private readonly name: string;
    private readonly manufacturer: string;
    private readonly serial: string;
    private readonly model: string;
    private readonly remoteName: string;
    private readonly commands?: CommandsConfig;
    private readonly automaticOffTime?: number;

    private readonly television: Television;

    private readonly informationService: Service;
    private readonly tvService: Service;
    private readonly inputServices: Service[];

    private activeIdentifier: string;

    constructor(log: Logger, config: AccessoryConfig, api: API) {
        this.log = log;
        this.config = config;
        this.api = api;

        // parse config
        this.name = config.name;
        this.manufacturer = config.manufacturer || 'LG';
        this.serial = config.serialNumber || '';
        this.model = config.model || '';
        this.remoteName = config.remoteName || 'TV';
        this.commands = config.commands;
        this.automaticOffTime = config.automaticOffTime;

        this.television = new Television(this.log, this.remoteName, this.commands, this.automaticOffTime);
        this.television.on(TelevisionEvent.TurnedOff, this.handleTelevisionOff.bind(this));

        // hap
        const Service = this.api.hap.Service;
        const Characteristic = this.api.hap.Characteristic;

        this.informationService = new Service.AccessoryInformation();
        this.informationService
            .setCharacteristic(Characteristic.Name, this.name)
            .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
            .setCharacteristic(Characteristic.SerialNumber, this.serial)
            .setCharacteristic(Characteristic.Model, this.model)
        ;

        this.tvService = new Service.Television(this.name, 'tvService');
        this.tvService
            .setCharacteristic(Characteristic.ConfiguredName, this.name)
            .setCharacteristic(Characteristic.SleepDiscoveryMode, Characteristic.SleepDiscoveryMode.ALWAYS_DISCOVERABLE)
        ;
        this.tvService.getCharacteristic(Characteristic.Active)
            .on(CharacteristicEventTypes.GET, this.getActive.bind(this))
            .on(CharacteristicEventTypes.SET, this.setActive.bind(this))
        ;
        this.tvService.getCharacteristic(Characteristic.RemoteKey)
            .on(CharacteristicEventTypes.SET, this.setRemoteKey.bind(this))
        ;

        // input sources

        this.inputServices = [];
        const hdmi = 'HDMI';
        const hdmiSource = new Service.InputSource(hdmi, hdmi);
        hdmiSource
            .setCharacteristic(Characteristic.ConfiguredName, hdmi)
            .setCharacteristic(Characteristic.InputSourceType, Characteristic.InputSourceType.HDMI)
            .setCharacteristic(Characteristic.IsConfigured, Characteristic.IsConfigured.CONFIGURED)
            .setCharacteristic(Characteristic.CurrentVisibilityState, Characteristic.CurrentVisibilityState.SHOWN)
            .setCharacteristic(Characteristic.Identifier, hdmi)
        ;

        this.activeIdentifier = hdmi;
        this.tvService.updateCharacteristic(Characteristic.ActiveIdentifier, hdmi);
        this.tvService.addLinkedService(hdmiSource);
        this.inputServices.push(hdmiSource);

        const usb = 'USB';
        const usbSource = new Service.InputSource(usb, usb);
        usbSource
            .setCharacteristic(Characteristic.ConfiguredName, usb)
            .setCharacteristic(Characteristic.InputSourceType, Characteristic.InputSourceType.USB)
            .setCharacteristic(Characteristic.IsConfigured, Characteristic.IsConfigured.CONFIGURED)
            .setCharacteristic(Characteristic.CurrentVisibilityState, Characteristic.CurrentVisibilityState.SHOWN)
            .setCharacteristic(Characteristic.Identifier, usb)
        ;
        this.tvService.addLinkedService(usbSource);
        this.inputServices.push(usbSource);

        this.tvService.getCharacteristic(Characteristic.ActiveIdentifier)
            .on(CharacteristicEventTypes.GET, this.getActiveIdentifier.bind(this))
            .on(CharacteristicEventTypes.SET, this.setActiveIdentifier.bind(this))
        ;
    }


    getServices(): Service[] {
        return [this.informationService, this.tvService].concat(this.inputServices);
    }

    identify(): void {
        this.log.info('identify');
    }

    private getActive(callback: CharacteristicGetCallback): void {
        callback(null, this.television.isTurnedOn());
    }

    private setActive(value: CharacteristicValue, callback: CharacteristicSetCallback): void {
        this.log.info('Set active:', value);
        if(value) {
            this.television.turnOn();
        } else {
            this.television.turnOff();
        }

        callback(null);
    }

    private setRemoteKey(value: CharacteristicValue, callback: CharacteristicSetCallback): void {
        this.log.info('button', value);
        const Characteristic = this.api.hap.Characteristic;

        switch(value) {
            case Characteristic.RemoteKey.REWIND:
                this.television.rewind();
                break;
            case Characteristic.RemoteKey.FAST_FORWARD:
                this.television.forward();
                break;
            case Characteristic.RemoteKey.NEXT_TRACK:
                break;
            case Characteristic.RemoteKey.PREVIOUS_TRACK:
                break;
            case Characteristic.RemoteKey.ARROW_UP:
                this.television.up();
                break;
            case Characteristic.RemoteKey.ARROW_DOWN:
                this.television.down();
                break;
            case Characteristic.RemoteKey.ARROW_LEFT:
                this.television.left();
                break;
            case Characteristic.RemoteKey.ARROW_RIGHT:
                this.television.right();
                break;
            case Characteristic.RemoteKey.SELECT:
                this.television.select();
                break;
            case Characteristic.RemoteKey.BACK:
                this.television.back();
                break;
            case Characteristic.RemoteKey.EXIT:
                this.television.exit();
                break;
            case Characteristic.RemoteKey.PLAY_PAUSE:
                this.television.playPause();
                break;
            case Characteristic.RemoteKey.INFORMATION:
                this.television.openSettings();
                break;
        }

        callback(null);
    }

    private getActiveIdentifier(callback: CharacteristicGetCallback): void {
        this.log.info('get active identifier', this.activeIdentifier);
        callback(null, this.activeIdentifier);
    }

    private setActiveIdentifier(value: CharacteristicValue, callback: CharacteristicSetCallback): void {
        try {
            this.log.info('set active identifier', value);
            if(value === 'USB') {
                this.television.usb();
            } else {
                this.television.hdmi();
            }

            this.activeIdentifier = value as string;
            callback();

        } catch (e) {
            this.log.error(e);
            callback(e);
        }
    }

    private handleTelevisionOff(): void {
        // hap
        const Characteristic = this.api.hap.Characteristic;

        this.tvService.getCharacteristic(Characteristic.Active).updateValue(this.television.isTurnedOn());
    }
}
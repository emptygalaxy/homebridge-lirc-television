export interface IIrRemote {
    power(): void;

    mute(): void;

    input(): void;

    volumeUp(): void;
    volumeDown(): void;

    pageUp(): void;
    pageDown(): void;

    picture(): void;
    blank(): void;

    left(): void;
    up(): void
    right(): void;
    down(): void;
    enter(): void;

    exit(): void;
    back(): void;

    settings(): void;
    qMenu(): void;

    still(): void;
    ratio(): void;
    usb(): void;
    help(): void;

    keystoneUp(): void;
    keystoneDown(): void;

    rewind(): void;
    play(): void;
    forward(): void;
    stop(): void;
    pause(): void;

    red(): void;
    green(): void;
    yellow(): void;
    blue(): void;
}
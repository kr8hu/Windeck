declare module 'use-sound' {
    import { Howl, Howler } from 'howler';

    interface HookOptions {
        interrupt?: boolean;
        playbackRate?: number;
        soundEnabled?: boolean;
        volume?: number;
        sprite?: { [key: string]: [number, number] };
    }

    interface ExposedData {
        interrupt: boolean;
        playbackRate: number;
        soundEnabled: boolean;
        volume: number;
        sprite: { [key: string]: [number, number] };
    }

    type PlayFunction = (options?: PlayOptions) => void;

    interface PlayOptions {
        id?: string;
        forceSoundEnabled?: boolean;
        playbackRate?: number;
    }

    interface PlayExposedData extends ExposedData {
        stop: (id?: string) => void;
        pause: (id?: string) => void;
        duration: number | null;
        sound: Howl | null;
    }

    type UseSoundTuple = [PlayFunction, PlayExposedData];

    const useSound: (src: string, options?: HookOptions) => UseSoundTuple;

    export default useSound;
}
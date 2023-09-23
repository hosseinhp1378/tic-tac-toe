import { Audio } from "expo-av";
import { useEffect, useRef } from "react";
import * as Haptics from "expo-haptics";

type soundType = "pop1" | 'pop2' | 'win' | 'lose' | 'draw'

export default function useSounds(): (sound: soundType) => void {
    const popSoundRef = useRef<Audio.Sound | null>(null);
    const pop2SoundRef = useRef<Audio.Sound | null>(null);
    const winSoundRef = useRef<Audio.Sound | null>(null);
    const loseSoundRef = useRef<Audio.Sound | null>(null);
    const drawSoundRef = useRef<Audio.Sound | null>(null);

    const playSound = async (sound: soundType): Promise<void> => {
        const soundsMap = {
            pop1: popSoundRef,
            pop2: pop2SoundRef,
            win: winSoundRef,
            lose: loseSoundRef,
            draw: drawSoundRef
        }
        try {
            const status = await soundsMap[sound].current?.getStatusAsync()
            status && status.isLoaded && soundsMap[sound].current?.replayAsync()
            switch (sound) {
                case 'pop1':
                    break;
                case 'pop2':
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    break;
                case 'win':
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                    break
                case 'lose':
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                    break
                case 'draw':
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                    break
                default:
                    break;
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        const popSoundObject = new Audio.Sound();
        const pop2SoundObject = new Audio.Sound();
        const winSoundObject = new Audio.Sound();
        const loseSoundObject = new Audio.Sound();
        const drawSoundObject = new Audio.Sound();
        const loadSounds = async () => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await popSoundObject.loadAsync(require("@assets/pop_1.wav"));
            popSoundRef.current = popSoundObject;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await pop2SoundObject.loadAsync(require("@assets/pop_2.wav"));
            pop2SoundRef.current = pop2SoundObject;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await winSoundObject.loadAsync(require("@assets/win.mp3"));
            winSoundRef.current = winSoundObject;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await loseSoundObject.loadAsync(require("@assets/loss.mp3"));
            loseSoundRef.current = loseSoundObject;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await drawSoundObject.loadAsync(require("@assets/draw.mp3"));
            drawSoundRef.current = drawSoundObject;
        };
        loadSounds();
        return () => {
            popSoundObject && popSoundObject.unloadAsync();
            pop2SoundObject && pop2SoundObject.unloadAsync();
            winSoundObject && winSoundObject.unloadAsync();
            loseSoundObject && loseSoundObject.unloadAsync();
            drawSoundObject && drawSoundObject.unloadAsync();
        };
    }, []);
    return playSound
}
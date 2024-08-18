import React, { useEffect, useRef, useState } from "react";
import TimeSince from "./TimeSince";

interface MediaPlayerProps {
  my_sound: string;
  my_video: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ my_sound, my_video }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error("Autoplay foi bloqueado:", error);
        }
      }
    };

    playAudio();
  }, [my_sound]);

  useEffect(() => {
    const preventFullscreen = (e: Event) => {
      e.preventDefault();
      if (document.fullscreenElement === videoRef.current) {
        document.exitFullscreen();
      }
    };

    const videoElement = videoRef.current;

    videoElement?.addEventListener("fullscreenchange", preventFullscreen);
    videoElement?.addEventListener("webkitbeginfullscreen", preventFullscreen); // iOS Safari
    videoElement?.addEventListener("webkitendfullscreen", preventFullscreen); // iOS Safari

    return () => {
      videoElement?.removeEventListener("fullscreenchange", preventFullscreen);
      videoElement?.removeEventListener(
        "webkitbeginfullscreen",
        preventFullscreen
      );
      videoElement?.removeEventListener(
        "webkitendfullscreen",
        preventFullscreen
      );
    };
  }, []);

  const somePastDate = new Date("2022-09-18T00:00:00");

  return (
    <div className="container mx-auto flex items-center justify-center flex-col">
      <audio ref={audioRef} autoPlay loop>
        <source src={my_sound} type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="max-w-3xl max-h-[600px] w-full aspect-auto object-contain object-center"
        controls={false} // Desativa os controles nativos
        playsInline // Importante para iOS
      >
        <source src={my_video} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>

      <div className="mt-6 text-3xl flex flex-col gap-y-10 text-white max-w-3xl text-center">
        <TimeSince targetDate={somePastDate} />

        <div className="">❤️</div>

        <hr className="w-1/2 mx-auto" />

        {step === 0 && (
          <div className="">
            <h1 className="text-red-500 text-3xl">
              Só pra você lembrar toda vez que acessar isso:
            </h1>

            <div className="w-full flex flex-col">
              <p className="mt-4 text-lg">
                Hoje comemoramos 1 ano e 11 meses de uma jornada incrível
                juntos. Cada momento ao seu lado tem sido uma alegria e uma
                descoberta constante, tenho aprendido com você como realmente
                funciona um amor de verdade.
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="">
            <h1 className="text-red-500 text-3xl">
              Só pra você lembrar toda vez que acessar isso:
            </h1>

            <div className="w-full flex flex-col">
              <p className="mt-4 text-lg">
                Sua presença ilumina meus dias e seu amor torna tudo mais
                especial. Sou grato por cada risada, cada conversa e cada
                experiência que compartilhamos. Deus foi muito bom comigo em ter
                guardado você para mim, pq sem você, nao sei o que seria de mim!
                ❤️
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="">
            <h1 className="text-red-500 text-3xl">Te amo!</h1>

            <div className="w-full flex flex-col">
              <p className="mt-4 text-lg">
                E te amarei até a volta Dele! Mesmo se um dia seu amor por mim
                acabar, saiba que eu fui realmente feliz com você! Sempre serei
                grato pela sua vida
              </p>
            </div>
          </div>
        )}

        {step < 2 && (
          <button
            onClick={() => setStep(step + 1)}
            className="text-white bg-red-500 px-6 py-2 rounded-lg hover:bg-red-700 duration-300 ease-in-out text-xl"
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;

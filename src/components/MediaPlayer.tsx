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
      videoElement?.removeEventListener("webkitbeginfullscreen", preventFullscreen);
      videoElement?.removeEventListener("webkitendfullscreen", preventFullscreen);
    };
  }, []);

  const somePastDate = new Date("2023-02-01T12:00:00");

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

        {/* Lógica para exibir os textos com base no valor de step */}
        {step === 0 && (
          <div>
            <h1 className="text-red-500">Você...</h1>
            <p className="mt-4">
              11111111 Dolorum hic veniam minima hic veniam minima hic veniam
              minima hic veniam minima hic veniam minima debitis rem nihil!
              Deleniti, quibusdam. Corrupti, reiciendis.
            </p>
          </div>
        )}

        {/* ... Outras condições para step ... */}

        {step < 6 && (
          <button
            onClick={() => setStep(step + 1)}
            className="text-white bg-red-500 px-6 py-2 rounded-lg hover:bg-red-700 duration-300 ease-in-out text-caveat text-xl"
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;

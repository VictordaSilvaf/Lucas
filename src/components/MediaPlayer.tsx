import React, { useEffect, useRef, useState } from "react";
import TimeSince from "./TimeSince";

interface MediaPlayerProps {
  my_sound: string;
  my_video: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ my_sound, my_video }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const videoRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = (e) => {
      if (document.fullscreenElement === videoRef.current) {
        document.exitFullscreen(); // Sai do fullscreen automaticamente
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const [step, setStep] = useState(0);

  const somePastDate = new Date("2023-02-01T12:00:00");

  return (
    <div className="container mx-auto flex items-center justify-center flex-col">
      {/* <audio ref={audioRef} autoPlay loop>
        <source src={my_sound} type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio> */}

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="max-w-3xl max-h-[600px] w-full aspect-auto object-contain object-center"
        controls
      >
        <source src={my_video} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>

      <div className="mt-6 text-3xl flex flex-col gap-y-10 text-white max-w-3xl text-center">
        <TimeSince targetDate={somePastDate} />

        {step === 0 && (
          <div className="">
            <h1 className="text-red-500">Você...</h1>

            <div className="w-full flex flex-col">
              <p className="mt-4">
                11111111 Dolorum hic veniam minima hic veniam minima hic veniam
                minima hic veniam minima hic veniam minima debitis rem nihil!
                Deleniti, quibusdam. Corrupti, reiciendis.
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="">
            <h1 className="text-red-500">é...</h1>

            <div className="w-full flex flex-col">
              <p className="mt-4">
                222222222 Dolorum hic veniam minima hic veniam minima hic veniam
                minima hic veniam minima hic veniam minima debitis rem nihil!
                Deleniti, quibusdam. Corrupti, reiciendis.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="">
            <h1 className="text-red-500">a...</h1>

            <div className="w-full flex flex-col">
              <p className="mt-4">
                33333333 Dolorum hic veniam minima hic veniam minima hic veniam
                minima hic veniam minima hic veniam minima debitis rem nihil!
                Deleniti, quibusdam. Corrupti, reiciendis.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="">
            <h1 className="text-red-500">mulher...</h1>

            <div className="w-full flex flex-col">
              <p className="mt-4">
                444444444 Dolorum hic veniam minima hic veniam minima hic veniam
                minima hic veniam minima hic veniam minima debitis rem nihil!
                Deleniti, quibusdam. Corrupti, reiciendis.
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="">
            <h1 className="text-red-500">da...</h1>

            <div className="w-full flex flex-col">
              <p className="mt-4">
                555555555 Dolorum hic veniam minima hic veniam minima hic veniam
                minima hic veniam minima hic veniam minima debitis rem nihil!
                Deleniti, quibusdam. Corrupti, reiciendis.
              </p>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="">
            <h1 className="text-red-500">minha...</h1>

            <div className="w-full flex flex-col">
              <p className="mt-4">
                666666666 Dolorum hic veniam minima hic veniam minima hic veniam
                minima hic veniam minima hic veniam minima debitis rem nihil!
                Deleniti, quibusdam. Corrupti, reiciendis.
              </p>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="">
            <h1 className="text-red-500">vida!</h1>

            <div className="w-full flex flex-col">
              <p className="mt-4">
                7777777777 Dolorum hic veniam minima hic veniam minima hic
                veniam minima hic veniam minima hic veniam minima debitis rem
                nihil! Deleniti, quibusdam. Corrupti, reiciendis.
              </p>
            </div>
          </div>
        )}

        {step < 6 && (
          <div className="">
            <button
              onClick={() => {
                if (step < 6) {
                  setStep(step + 1);
                }
              }}
              className="text-white bg-red-500 px-6 py-2 rounded-lg hover:bg-red-700 duration-300 ease-in-out text-caveat text-xl"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;

import React, { useState, useEffect } from 'react';

interface TimeSinceProps {
  targetDate: Date;
}

const TimeSince: React.FC<TimeSinceProps> = ({ targetDate }) => {
  const [timeSince, setTimeSince] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let years = now.getFullYear() - targetDate.getFullYear();
      let months = now.getMonth() - targetDate.getMonth();
      let days = now.getDate() - targetDate.getDate();
      let hours = now.getHours() - targetDate.getHours();
      let minutes = now.getMinutes() - targetDate.getMinutes();
      let seconds = now.getSeconds() - targetDate.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
      }

      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }

      if (hours < 0) {
        hours += 24;
        days -= 1;
      }

      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months -= 1;
      }

      if (months < 0) {
        months += 12;
        years -= 1;
      }

      const formatPart = (value: number, unit: string) => {
        if (value === 0) return '';
        if (unit === 'mês') return `${value} ${unit}${value > 1 ? 'es' : ''}`;
        return `${value} ${unit}${value > 1 ? 's' : ''}`;
      };

      const formattedTime = [
        formatPart(years, 'ano'),
        formatPart(months, 'mês'),
        formatPart(days, 'dia'),
        formatPart(hours, 'hora'),
        formatPart(minutes, 'minuto'),
        formatPart(seconds, 'segundo'),
      ].filter(Boolean).join(', ').replace(/,([^,]*)$/, ' e$1');

      setTimeSince(formattedTime);
    };

    updateTime(); // Atualiza imediatamente ao montar
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, [targetDate]);

  return (
    <div>
      <p>{timeSince}</p>
    </div>
  );
};

export default TimeSince;

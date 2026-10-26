import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface AudioPlayerProps {
  arabicText: string;
  language: string;
}

export default function AudioPlayer({ arabicText, language }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [speed, setSpeed] = useState(0.8);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      // Cleanup on unmount
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playAudio = () => {
    if (!isSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(arabicText);
    utterance.lang = 'ar-SA'; // Arabic language
    utterance.rate = speed;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find an Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(voice => voice.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const increaseSpeed = () => {
    setSpeed(prev => Math.min(prev + 0.1, 1.5));
  };

  const decreaseSpeed = () => {
    setSpeed(prev => Math.max(prev - 0.1, 0.5));
  };

  if (!isSupported) {
    return null;
  }

  const labels = {
    en: { listen: 'Listen', speed: 'Speed', notSupported: 'Audio not supported' },
    ar: { listen: 'استمع', speed: 'السرعة', notSupported: 'الصوت غير مدعوم' },
    ur: { listen: 'سنیں', speed: 'رفتار', notSupported: 'آڈیو تعاون یافتہ نہیں' },
    fr: { listen: 'Écouter', speed: 'Vitesse', notSupported: 'Audio non supporté' },
    tr: { listen: 'Dinle', speed: 'Hız', notSupported: 'Ses desteklenmiyor' },
    id: { listen: 'Dengarkan', speed: 'Kecepatan', notSupported: 'Audio tidak didukung' },
    bn: { listen: 'শুনুন', speed: 'গতি', notSupported: 'অডিও সমর্থিত নয়' },
    ms: { listen: 'Dengar', speed: 'Kelajuan', notSupported: 'Audio tidak disokong' },
    ta: { listen: 'கேளுங்கள்', speed: 'வேகம்', notSupported: 'ஆடியோ ஆதரிக்கப்படவில்லை' },
    ml: { listen: 'കേൾക്കുക', speed: 'വേഗത', notSupported: 'ഓഡിയോ പിന്തുണയ്ക്കുന്നില്ല' },
  };

  const label = (labels as any)[language] || labels.en;

  return (
    <div className={`mt-4 p-4 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          🎧 {label.listen}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseSpeed}
            disabled={speed <= 0.5}
            className={`w-7 h-7 rounded-md text-xs font-bold transition-colors ${
              isDark 
                ? 'bg-slate-700 text-gray-300 hover:bg-slate-600 disabled:opacity-50' 
                : 'bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50'
            }`}
          >
            -
          </button>
          <span className={`text-xs font-medium min-w-[3rem] text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {speed.toFixed(1)}x
          </span>
          <button
            onClick={increaseSpeed}
            disabled={speed >= 1.5}
            className={`w-7 h-7 rounded-md text-xs font-bold transition-colors ${
              isDark 
                ? 'bg-slate-700 text-gray-300 hover:bg-slate-600 disabled:opacity-50' 
                : 'bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50'
            }`}
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={togglePlay}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
          isPlaying
            ? isDark
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
            : isDark
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
        }`}
      >
        {isPlaying ? (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{language === 'en' ? 'Pause' : language === 'ar' ? 'إيقاف' : language === 'ur' ? 'روکیں' : language === 'fr' ? 'Pause' : language === 'tr' ? 'Duraklat' : language === 'id' ? 'Jeda' : language === 'bn' ? 'বিরতি' : language === 'ms' ? 'Jeda' : language === 'ta' ? 'இடைநிறுத்து' : 'നിർത്തുക'}</span>
            <div className="audio-wave ml-2">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span>{language === 'en' ? 'Play' : language === 'ar' ? 'تشغيل' : language === 'ur' ? 'چلائیں' : language === 'fr' ? 'Lecture' : language === 'tr' ? 'Oynat' : language === 'id' ? 'Putar' : language === 'bn' ? 'চালান' : language === 'ms' ? 'Main' : language === 'ta' ? 'இயக்கு' : 'പ്ലേ'}</span>
          </>
        )}
      </button>

      <p className={`text-xs mt-2 text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        {language === 'en' ? 'Uses browser speech synthesis' : 
         language === 'ar' ? 'يستخدم تخليق كلام المتصفح' :
         language === 'ur' ? 'براؤزر اسپیچ سنتھیسس استعمال کرتا ہے' :
         language === 'fr' ? 'Utilise la synthèse vocale du navigateur' :
         language === 'tr' ? 'Tarayıcı konuşma sentezini kullanır' :
         language === 'id' ? 'Menggunakan sintesis ucapan browser' :
         language === 'bn' ? 'ব্রাউজার স্পিচ সিন্থেসিস ব্যবহার করে' :
         language === 'ms' ? 'Menggunakan sintesis ucapan pelayar' :
         language === 'ta' ? 'உலாவி பேச்சு தொகுப்பைப் பயன்படுத்துகிறது' :
         'ബ്രൗസർ സ്പീച്ച് സിന്തസിസ് ഉപയോഗിക്കുന്നു'}
      </p>
    </div>
  );
}

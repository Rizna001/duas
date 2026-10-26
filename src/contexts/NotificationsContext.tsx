import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface NotificationsContextType {
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  notificationTime: string;
  setNotificationTime: (time: string) => void;
  lastNotification: string | null;
  requestPermission: () => Promise<boolean>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('notificationsEnabled') === 'true';
    }
    return false;
  });

  const [notificationTime, setNotificationTimeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('notificationTime') || '08:00';
    }
    return '08:00';
  });

  const [lastNotification, setLastNotification] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lastNotification');
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem('notificationsEnabled', String(notificationsEnabled));
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('notificationTime', notificationTime);
  }, [notificationTime]);

  useEffect(() => {
    if (lastNotification) {
      localStorage.setItem('lastNotification', lastNotification);
    }
  }, [lastNotification]);

  // Check for daily notification
  useEffect(() => {
    if (!notificationsEnabled) return;

    const checkNotification = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const today = now.toDateString();

      if (currentTime === notificationTime && lastNotification !== today) {
        sendDailyNotification();
        setLastNotification(today);
      }
    };

    const interval = setInterval(checkNotification, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [notificationsEnabled, notificationTime, lastNotification]);

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  };

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const granted = await requestPermission();
      if (granted) {
        setNotificationsEnabled(true);
        showNotification(
          'Notifications Enabled',
          'You will receive daily duas at your scheduled time.',
          '🔔'
        );
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  const setNotificationTime = (time: string) => {
    setNotificationTimeState(time);
    if (notificationsEnabled) {
      showNotification(
        'Time Updated',
        `Daily duas will be sent at ${time}`,
        '⏰'
      );
    }
  };

  const sendDailyNotification = () => {
    const duas = [
      { title: 'Morning Remembrance', text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ' },
      { title: 'Seeking Forgiveness', text: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي' },
      { title: 'Protection', text: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ' },
      { title: 'Guidance', text: 'رَبِّ زِدْنِي عِلْمًا' },
      { title: 'Gratitude', text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
    ];

    const randomDua = duas[Math.floor(Math.random() * duas.length)];
    showNotification(
      `Daily Dua: ${randomDua.title}`,
      randomDua.text,
      '🤲'
    );
  };

  const showNotification = (title: string, body: string, icon: string = '🤲') => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`${icon} ${title}`, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'daily-dua',
        requireInteraction: false,
      });
    }
  };

  return (
    <NotificationsContext.Provider value={{
      notificationsEnabled,
      toggleNotifications,
      notificationTime,
      setNotificationTime,
      lastNotification,
      requestPermission,
    }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error('useNotifications must be used within NotificationsProvider');
  return context;
}

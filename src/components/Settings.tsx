import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationsContext';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export default function Settings({ isOpen, onClose, language }: SettingsProps) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { notificationsEnabled, toggleNotifications, notificationTime, setNotificationTime } = useNotifications();

  if (!isOpen) return null;

  const labels = {
    en: { settings: 'Settings', appearance: 'Appearance', darkMode: 'Dark Mode', lightMode: 'Light Mode', notifications: 'Notifications', enableNotifications: 'Enable Daily Notifications', notificationTime: 'Notification Time', close: 'Close' },
    ar: { settings: 'الإعدادات', appearance: 'المظهر', darkMode: 'الوضع الداكن', lightMode: 'الوضع الفاتح', notifications: 'الإشعارات', enableNotifications: 'تفعيل الإشعارات اليومية', notificationTime: 'وقت الإشعار', close: 'إغلاق' },
    ur: { settings: 'ترتیبات', appearance: 'ظاہری شکل', darkMode: 'ڈارک موڈ', lightMode: 'لائٹ موڈ', notifications: 'اطلاعات', enableNotifications: 'روزانہ کی اطلاعات فعال کریں', notificationTime: 'اطلاع کا وقت', close: 'بند کریں' },
    fr: { settings: 'Paramètres', appearance: 'Apparence', darkMode: 'Mode Sombre', lightMode: 'Mode Clair', notifications: 'Notifications', enableNotifications: 'Activer les Notifications Quotidiennes', notificationTime: 'Heure de Notification', close: 'Fermer' },
    tr: { settings: 'Ayarlar', appearance: 'Görünüm', darkMode: 'Karanlık Mod', lightMode: 'Aydınlık Mod', notifications: 'Bildirimler', enableNotifications: 'Günlük Bildirimleri Etkinleştir', notificationTime: 'Bildirim Zamanı', close: 'Kapat' },
    id: { settings: 'Pengaturan', appearance: 'Tampilan', darkMode: 'Mode Gelap', lightMode: 'Mode Terang', notifications: 'Notifikasi', enableNotifications: 'Aktifkan Notifikasi Harian', notificationTime: 'Waktu Notifikasi', close: 'Tutup' },
    bn: { settings: 'সেটিংস', appearance: 'চেহারা', darkMode: 'ডার্ক মোড', lightMode: 'লাইট মোড', notifications: 'বিজ্ঞপ্তি', enableNotifications: 'দৈনিক বিজ্ঞপ্তি সক্রিয় করুন', notificationTime: 'বিজ্ঞপ্তির সময়', close: 'বন্ধ' },
    ms: { settings: 'Tetapan', appearance: 'Penampilan', darkMode: 'Mod Gelap', lightMode: 'Mod Terang', notifications: 'Pemberitahuan', enableNotifications: 'Aktifkan Pemberitahuan Harian', notificationTime: 'Masa Pemberitahuan', close: 'Tutup' },
    ta: { settings: 'அமைப்புகள்', appearance: 'தோற்றம்', darkMode: 'இருண்ட பயன்முறை', lightMode: 'ஒளி பயன்முறை', notifications: 'அறிவிப்புகள்', enableNotifications: 'தினசரி அறிவிப்புகளை இயக்கு', notificationTime: 'அறிவிப்பு நேரம்', close: 'மூடு' },
    ml: { settings: 'ക്രമീകരണങ്ങൾ', appearance: 'രൂപം', darkMode: 'ഡാർക്ക് മോഡ്', lightMode: 'ലൈറ്റ് മോഡ്', notifications: 'അറിയിപ്പുകൾ', enableNotifications: 'ദൈനംദിന അറിയിപ്പുകൾ പ്രവർത്തനക്ഷമമാക്കുക', notificationTime: 'അറിയിപ്പ് സമയം', close: 'അടയ്ക്കുക' },
  };

  const label = (labels as any)[language] || labels.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ⚙️ {label.settings}
            </h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isDark ? 'hover:bg-slate-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Appearance Section */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              🎨 {label.appearance}
            </h3>
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {isDark ? '🌙' : '☀️'} {isDark ? label.darkMode : label.lightMode}
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {language === 'en' ? 'Toggle between light and dark themes' :
                     language === 'ar' ? 'التبديل بين السمات الفاتحة والداكنة' :
                     language === 'ur' ? 'روشن اور تاریک تھیم کے درمیان ٹوگل کریں' :
                     language === 'fr' ? 'Basculer entre les thèmes clair et sombre' :
                     language === 'tr' ? 'Açık ve koyu temalar arasında geçiş yap' :
                     language === 'id' ? 'Beralih antara tema terang dan gelap' :
                     language === 'bn' ? 'হালকা এবং গাঢ় থিমের মধ্যে টগল করুন' :
                     language === 'ms' ? 'Togol antara tema terang dan gelap' :
                     language === 'ta' ? 'ஒளி மற்றும் இருண்ட தீம்களுக்கு இடையில் மாற்றவும்' :
                     'ഇരുണ്ടതും വെളിച്ചമുള്ളതുമായ തീമുകൾക്കിടയിൽ മാറുക'}
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    isDark ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      isDark ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              🔔 {label.notifications}
            </h3>
            <div className={`p-4 rounded-xl border space-y-4 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {label.enableNotifications}
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {language === 'en' ? 'Receive a daily dua at your scheduled time' :
                     language === 'ar' ? 'تلقي دعاء يومي في الوقت المحدد' :
                     language === 'ur' ? 'اپنے طے شدہ وقت پر روزانہ دعا وصول کریں' :
                     language === 'fr' ? 'Recevez un dua quotidien à l\'heure prévue' :
                     language === 'tr' ? 'Belirlenen zamanda günlük bir dua alın' :
                     language === 'id' ? 'Terima doa harian pada waktu yang dijadwalkan' :
                     language === 'bn' ? 'আপনার নির্ধারিত সময়ে দৈনিক দোয়া পান' :
                     language === 'ms' ? 'Terima doa harian pada masa yang dijadualkan' :
                     language === 'ta' ? 'உங்கள் அட்டவணை நேரத்தில் தினசரி துஆவைப் பெறுங்கள்' :
                     'നിങ്ങളുടെ നിശ്ചിത സമയത്ത് ദൈനംദിന ദുആ സ്വീകരിക്കുക'}
                  </p>
                </div>
                <button
                  onClick={toggleNotifications}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-emerald-600' : isDark ? 'bg-slate-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                      notificationsEnabled ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {notificationsEnabled && (
                <div className="animate-fade-in">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    ⏰ {label.notificationTime}
                  </label>
                  <input
                    type="time"
                    value={notificationTime}
                    onChange={(e) => setNotificationTime(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-slate-800 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <button
            onClick={onClose}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              isDark 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            {label.close}
          </button>
        </div>
      </div>
    </div>
  );
}

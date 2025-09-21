// Утилиты для работы с локализацией

export const setDocumentLocale = (language: string) => {
    // Устанавливаем язык для документа
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'ru' ? 'ru' : 'en';
      
      // Устанавливаем локаль для input[type="date"] элементов
      const style = document.createElement('style');
      style.innerHTML = `
        input[type="date"] {
          color-scheme: light;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 1;
          cursor: pointer;
        }
        
        /* Пытаемся установить локаль для календаря */
        input[type="date"] {
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        /* Для WebKit браузеров */
        input[type="date"]::-webkit-datetime-edit {
          font-family: system-ui, -apple-system, sans-serif;
        }
      `;
      
      // Удаляем предыдущий стиль если есть
      const existingStyle = document.getElementById('date-locale-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      style.id = 'date-locale-style';
      document.head.appendChild(style);
    }
  };
  
  export const formatDateForLocale = (date: string, language: string) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    const locale = language === 'ru' ? 'ru-RU' : 'en-US';
    
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  export const getDateInputFormat = (language: string) => {
    // HTML date input всегда использует YYYY-MM-DD формат
    // Но мы можем вернуть подсказку для пользователя
    return language === 'ru' ? 'ДД.ММ.ГГГГ' : 'MM/DD/YYYY';
  };
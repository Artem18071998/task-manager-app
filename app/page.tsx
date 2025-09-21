'use client';

import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from 'react';
import { store } from '../store';
import TaskManager from '../components/TaskManager';
import { setDocumentLocale } from '../utils/locale';
import '../i18n'; // Импортируем конфигурацию i18n

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function Home() {
  useEffect(() => {
    // Восстанавливаем сохраненный язык при загрузке приложения
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    
    if (savedLanguage && ['ru', 'en'].includes(savedLanguage)) {
      // Динамически импортируем i18n и меняем язык
      import('../i18n').then((i18n) => {
        i18n.default.changeLanguage(savedLanguage);
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TaskManager />
      </ThemeProvider>
    </Provider>
  );
}
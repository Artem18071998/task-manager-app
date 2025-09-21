import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Переводы
const resources = {
  ru: {
    translation: {
      // Основные элементы интерфейса
      appTitle: 'Управление задачами',
      
      // Статусы задач
      status: {
        todo: 'К выполнению',
        inProgress: 'В процессе', 
        done: 'Завершено',
        all: 'Все задачи'
      },
      
      // Приоритеты
      priority: {
        high: 'Высокий',
        medium: 'Средний',
        low: 'Низкий'
      },
      
      // Форма задачи
      taskForm: {
        createTitle: 'Создать новую задачу',
        editTitle: 'Редактировать задачу',
        taskTitle: 'Название задачи',
        taskDescription: 'Описание задачи',
        taskPriority: 'Приоритет',
        dueDate: 'Срок выполнения',
        dueDateFormat: 'Формат: ДД.ММ.ГГГГ',
        cancel: 'Отмена',
        create: 'Создать задачу',
        save: 'Сохранить изменения',
        
        // Валидация
        validation: {
          titleRequired: 'Название задачи обязательно',
          titleMinLength: 'Название должно содержать минимум 3 символа',
          descriptionRequired: 'Описание задачи обязательно',
          descriptionMinLength: 'Описание должно содержать минимум 5 символов'
        }
      },
      
      // Карточка задачи
      taskCard: {
        created: 'Создано',
        updated: 'Обновлено',
        dueDate: 'Срок',
        overdue: 'Просрочено',
        deleteConfirm: 'Вы уверены, что хотите удалить эту задачу?'
      },
      
      // Фильтры
      filters: {
        title: 'Фильтры и поиск',
        searchPlaceholder: 'Поиск задач...',
        statusFilter: 'Статус',
        searchQuery: 'Поиск по запросу'
      },
      
      // Колонки канбан доски
      columns: {
        todo: 'К выполнению',
        inProgress: 'В процессе',
        done: 'Завершено'
      },
      
      // Статистика
      stats: {
        totalTasks: 'Всего задач',
        displayed: 'Отображено'
      },
      
      // Общие элементы
      common: {
        language: 'Язык'
      }
    }
  },
  en: {
    translation: {
      // Main UI elements
      appTitle: 'Task Management',
      
      // Task statuses
      status: {
        todo: 'To Do',
        inProgress: 'In Progress',
        done: 'Done',
        all: 'All Tasks'
      },
      
      // Priorities
      priority: {
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      },
      
      // Task form
      taskForm: {
        createTitle: 'Create New Task',
        editTitle: 'Edit Task',
        taskTitle: 'Task Title',
        taskDescription: 'Task Description',
        taskPriority: 'Priority',
        dueDate: 'Due Date',
        dueDateFormat: 'Format: MM/DD/YYYY',
        cancel: 'Cancel',
        create: 'Create Task',
        save: 'Save Changes',
        
        // Validation
        validation: {
          titleRequired: 'Task title is required',
          titleMinLength: 'Title must contain at least 3 characters',
          descriptionRequired: 'Task description is required',
          descriptionMinLength: 'Description must contain at least 5 characters'
        }
      },
      
      // Task card
      taskCard: {
        created: 'Created',
        updated: 'Updated',
        dueDate: 'Due',
        overdue: 'Overdue',
        deleteConfirm: 'Are you sure you want to delete this task?'
      },
      
      // Filters
      filters: {
        title: 'Filters and Search',
        searchPlaceholder: 'Search tasks...',
        statusFilter: 'Status',
        searchQuery: 'Search query'
      },
      
      // Kanban columns
      columns: {
        todo: 'To Do',
        inProgress: 'In Progress',
        done: 'Done'
      },
      
      // Statistics
      stats: {
        totalTasks: 'Total tasks',
        displayed: 'Displayed'
      },
      
      // Common elements
      common: {
        language: 'Language'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // язык по умолчанию
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // React уже делает escaping
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18n;
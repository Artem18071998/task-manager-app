import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../store';
import { setFilter, setSearchQuery } from '../store/taskSlice';
import { TaskStatus } from '../types';

const TaskFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { filter, searchQuery, tasks } = useSelector((state: RootState) => state.tasks);

  const handleFilterChange = (event: SelectChangeEvent<TaskStatus | "all">) => {
    dispatch(setFilter(event.target.value));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const getTaskCounts = () => {
    const todoCount = tasks.filter(task => task.status === TaskStatus.TODO).length;
    const inProgressCount = tasks.filter(task => task.status === TaskStatus.IN_PROGRESS).length;
    const doneCount = tasks.filter(task => task.status === TaskStatus.DONE).length;
    
    return { todoCount, inProgressCount, doneCount };
  };

  const { todoCount, inProgressCount, doneCount } = getTaskCounts();

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" color="primary">
          {t('filters.title')}
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        <TextField
          placeholder={t('filters.searchPlaceholder')}
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>{t('filters.statusFilter')}</InputLabel>
          <Select
            value={filter}
            label={t('filters.statusFilter')}
            onChange={handleFilterChange}
          >
            <MenuItem value="all">
              {t('status.all')} ({tasks.length})
            </MenuItem>
            <MenuItem value={TaskStatus.TODO}>
              {t('status.todo')} ({todoCount})
            </MenuItem>
            <MenuItem value={TaskStatus.IN_PROGRESS}>
              {t('status.inProgress')} ({inProgressCount})
            </MenuItem>
            <MenuItem value={TaskStatus.DONE}>
              {t('status.done')} ({doneCount})
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {searchQuery && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t('filters.searchQuery')}: &quot;{searchQuery}&quot;
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TaskFilters;
import { Box, Button, FormControl, Modal, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface FilterModalProps {
  open: boolean;
  handleClose: () => void;
  onFilter: (filters: FilterOptions) => void;
}

interface FilterOptions {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export const FilterModal: React.FC<FilterModalProps> = ({ open, handleClose, onFilter }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleApplyFilter = () => {
    onFilter({ startDate, endDate });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Фильтрация задач
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <DatePicker
              label="Дата начала"
              value={startDate}
              onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <DatePicker
              label="Дата окончания"
              value={endDate}
              onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </FormControl>
        </LocalizationProvider>

        <Button variant="contained" onClick={handleApplyFilter} fullWidth sx={{ mt: 2 }}>
          Применить фильтры
        </Button>
      </Box>
    </Modal>
  );
};

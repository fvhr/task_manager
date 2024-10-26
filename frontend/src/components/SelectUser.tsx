import { FormControl, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: '1', label: 'Задача 1' },
  { value: '2', label: 'Задача 2' },
  { value: '3', label: 'Задача 3' },
  { value: '4', label: 'Задача 4' },
];

export const SelectUser = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <FormControl fullWidth sx={{ width: '20ch' }} variant="outlined">
      <Select
        value={selectedValue}
        onChange={handleChange}
        renderValue={(selected) => {
          const selectedOption = options.find((option) => option.value === selected);
          return selectedOption ? selectedOption.label : '';
        }}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

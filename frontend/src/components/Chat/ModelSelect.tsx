import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MemoryIcon from '@mui/icons-material/Memory';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import DnsIcon from '@mui/icons-material/Dns';
import Box from '@mui/material/Box';

interface ModelSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const options = [
  { value: 'azure', label: 'GPU', icon: <MemoryIcon sx={{ color: '#1976d2' }} /> },
  { value: 'serverless', label: 'Cloud', icon: <CloudQueueIcon sx={{ color: '#43a047' }} /> },
  { value: 'local', label: 'CPU', icon: <DnsIcon sx={{ color: '#fbc02d' }} /> },
];

const ModelSelect: React.FC<ModelSelectProps> = ({ value, onChange, disabled }) => (
  <Paper elevation={2} sx={{ borderRadius: 2, minWidth: 80, background: '#f4f6fa', boxShadow: 'none', ml: 1 }}>
    <FormControl fullWidth size="small" variant="outlined">
      <InputLabel id="model-select-label">Model</InputLabel>
      <Select
        labelId="model-select-label"
        value={value}
        label="Model"
        onChange={e => onChange(e.target.value as string)}
        disabled={disabled}
        IconComponent={ArrowDropDownIcon}
        sx={{
          borderRadius: 2,
          background: '#f4f6fa',
          fontWeight: 500,
          fontSize: 15,
          minWidth: 80,
        }}
        renderValue={selected => {
          const opt = options.find(o => o.value === selected);
          return (
            <Box display="flex" alignItems="center" gap={1}>
              {opt?.icon}
              <span style={{ fontWeight: 500 }}>{opt?.label}</span>
            </Box>
          );
        }}
      >
        {options.map(opt => (
          <MenuItem key={opt.value} value={opt.value} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {opt.icon}
            <span style={{ fontWeight: 500 }}>{opt.label}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Paper>
);

export default ModelSelect;

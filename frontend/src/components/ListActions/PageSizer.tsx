import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { map } from 'lodash';
import React from 'react'
import { PAGE_SIZE_NUMBERS } from '../../consts';


interface PageSizerProps {
    pageSize: number;
    onPageSizeChange: (size: number) => void;

}

export default function PageSizer({ pageSize, onPageSizeChange }: PageSizerProps) {

    const onChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        onPageSizeChange(Number(value));
      };

      
  return (
    <div>
              {/* Page Size Selector */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="page-size-select-label">Page Size</InputLabel>
        <Select
          labelId="page-size-select-label"
          id="page-size-select"
          value={String(pageSize)}
          label="Page Size"
          onChange={onChange}
        >
          {map(PAGE_SIZE_NUMBERS, (pageNum: number) => (
            <MenuItem key={pageNum} value={pageNum}>{String(pageNum)}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

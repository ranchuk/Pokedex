import { Box, Radio, Typography } from '@mui/material'
import React from 'react'
import { SortOrder } from '../../types'


interface SortProps {
    onSort: (order: SortOrder) => void;
    sortValue: SortOrder;
  }

export default function SortControls({ sortValue, onSort }: SortProps) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
    <Typography variant="body1" color="text.primary">Sort By:</Typography>
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2">{SortOrder.Ascending.toUpperCase()}</Typography>
      <Radio
        checked={sortValue === SortOrder.Ascending}
        onChange={() => onSort(SortOrder.Ascending)}
      />
    </Box>
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2">{SortOrder.Descending.toUpperCase()}</Typography>
      <Radio
        checked={sortValue === SortOrder.Descending}
        onChange={() => onSort(SortOrder.Descending)}
      />
    </Box>
  </Box>
  )
}

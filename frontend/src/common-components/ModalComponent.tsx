import React from 'react'
import { Modal, Box, Card, CardContent, Typography, Button } from '@mui/material';

interface ModalComponentProps {
  isOpen: boolean;
  handleClose: (e: any) => void
  children: React.ReactNode;
}


export default function ModalComponent({isOpen, handleClose, children }: ModalComponentProps) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="pokemon-modal-title"
      aria-describedby="pokemon-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
        }}
      >
        {children}
        </Box>
    </Modal>
  )
}

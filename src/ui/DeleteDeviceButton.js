import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import React from 'react';
import { useNotify, useRecordContext, useRedirect } from 'react-admin';
import { Form } from 'react-final-form';
import { useDeleteDevice, useDeleteDeviceBulk } from '../lib/device';

export const DeleteDeviceButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const notify = useNotify();
  const redirect = useRedirect();
  const deleteDevice = useDeleteDevice();
  const deleteDeviceBulk = useDeleteDeviceBulk();
  const record = useRecordContext();

  const handleSubmit = async (values) => {
    if (props.selectedIds) {
      await deleteDeviceBulk(props.selectedIds);
    } else {
      await deleteDevice(record);
    }
    setOpen(false);
    notify('Device(s) successfully deleted');
    redirect(props.redirect);
  };

  return (
    <>
      <Tooltip title='Delete'>
        <Button
          onClick={() => setOpen(true)}
          variant={props.variant || 'contained'}
          color='error'
          size={props.size}
          sx={props.sx}
        >
          <DeleteIcon sx={{ mr: '4px' }} /> {props.children}
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'> Delete Device(s) </DialogTitle>
        <DialogContent>
          Note: this action will be irreversible
          <br />
          <br />
          <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Button variant='contained' color='primary' type='submit' disabled={submitting}>
                  Confirm Delete
                </Button>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDeviceButton;

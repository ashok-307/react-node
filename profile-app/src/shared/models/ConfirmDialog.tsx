import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface ConfirmDialogProps {
    onClose: (value?: any) => void;
    open: boolean;
    data?: any;
    title?: string;
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
function ConfirmDialog(props: ConfirmDialogProps) {
    let { open, onClose, title } = props;
    const onButtonClose = (type: boolean) => {
        if (type) {
            onClose(true);
        } else {
            onClose();
        }
    }
    return (
        <Dialog onClose={() => false} disableEscapeKeyDown={true} open={open} TransitionComponent={Transition} keepMounted>
            <DialogTitle><i className="fa fa-exclamation-triangle"></i> {' '} {title || 'Warning !'}</DialogTitle>
            <DialogActions>
                <Button onClick={() => onButtonClose(true)} variant="contained">Yes</Button>
                <Button onClick={() => onButtonClose(false)} variant="outlined">No</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;

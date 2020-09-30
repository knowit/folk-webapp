import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';


export interface bigChartProps {
    open: boolean;
    onClose: () => void;
}

const DialogBox= withStyles(() => ({
    paper: {
        width: '950px',
        height: 'auto',
        borderRadius: '0px', 
    }
}))(Dialog);


export const BigChart:React.FC<{open:boolean, onClose:() => void}> = ({onClose,open, children}) => {
    return (
        <DialogBox onClose={()=>onClose()} open = {open} maxWidth={false}>
            {children}
        </DialogBox>
        
    ); 
    
}
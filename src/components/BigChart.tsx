import React, { Children } from 'react'
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';


export interface bigChartProps {
    open: boolean;
    onClose: () => void;
}

const DialogBox= withStyles(() => ({
    paper: {
        backgroundColor: '#f1f0ed',
        width: '950px',
        height: '613px',
        borderRadius: '0px', 
    }
}))(Dialog);


export const BigChart:React.FC<{open:boolean, onClose:() => void}> = ({onClose,open, children}) => {
    return (
        <DialogBox onClose={()=>onClose()} open = {open} maxWidth={false}>
            <div>
                {children}
            </div>
        </DialogBox>
        
    ); 
    
}
import React  from 'react';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';


const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#F2F2F2',
    color: '#333333',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #E4E1DB',
  },
  arrow: {
    color:  '#F2F2F2'
  },
}))(Tooltip);


const useBoxStyle = makeStyles({
  box:{
    overflow:'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

 

export default function CharacterLimitBox({ text }: { text: string;}) {
  const classes = useBoxStyle();
  return (
    <HtmlTooltip title = {text} arrow placement="top">
      <div className = {classes.box}>
        {text}
      </div>
    </HtmlTooltip>
  );
}

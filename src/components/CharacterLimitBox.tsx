import React  from 'react';
import { withStyles } from '@material-ui/core/styles';
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

export default function CharacterLimitBox({ text, lim }: { text: string; lim: number }) {
  return (
    text.length > lim ? 
      <HtmlTooltip title = {text} arrow placement="top">
        <div>
          {text.substr(0,lim-2)}
           ...
        </div>
      </HtmlTooltip>
    : 
      <>{text}</>
  );
}

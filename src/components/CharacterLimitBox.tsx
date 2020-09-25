import React, {useState, useCallback, Ref} from 'react'
import { withStyles} from '@material-ui/core/styles';
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

  
function isEllipsisActive(e: HTMLSpanElement):boolean {
  return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
}; 

export default function CharacterLimitBox({text}: {text: string}){

  const [overflowActive, setOverflowActive] = useState(false);
  const measuredRef = useCallback(node => {
    setOverflowActive(isEllipsisActive(node));
  }, []);
  return  <div
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}
            ref={measuredRef}
          >
            <HtmlTooltip title = {text} arrow placement="top" disableHoverListener = {!overflowActive}>
                <span>
                  {text}
                </span>
              </HtmlTooltip> 
          </div>
    
}
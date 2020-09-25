import React, {useState, useEffect} from 'react'
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

  
function isEllipsisActive(e:any):boolean {
    return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
};

export default function CharacterLimitBox({text}: {text: string}){
  var span: HTMLSpanElement | null | undefined;
  const [overflowActive, setOverflowActive] = useState(false);
    
  useEffect(()=>{
      setOverflowActive(isEllipsisActive(span));
  });
    
    return  <div
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden"
              }}
              ref={ref => (span = ref)}
            >
                <HtmlTooltip title = {text} arrow placement="top" disableHoverListener = {!overflowActive}>
                  <span>
                    {text}
                  </span>
                </HtmlTooltip> 
            </div>
    
  }
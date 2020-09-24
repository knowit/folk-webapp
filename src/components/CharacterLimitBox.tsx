import * as React  from 'react';
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

 

 function CharacterLimitBox1({ text }: { text: string;}) {
  const classes = useBoxStyle();
  return (
    <HtmlTooltip title = {text} arrow placement="top">
      <div className = {classes.box}>
        {text}
      </div>
    </HtmlTooltip>
  );
}


interface Props {
  text:string;
  lim?:number;
}

interface State {
  overflowActive:boolean;
}
const initialState: State = {
  overflowActive: false
};

export default class CharacterLimitBox extends React.Component<Props, State> {
  span: HTMLSpanElement | null | undefined;
  constructor(props:Props) {
    super(props);
    this.state = initialState
  }

 isEllipsisActive(e:any):boolean {
  return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
}

componentDidMount():void {
  this.setState({ overflowActive: this.isEllipsisActive(this.span) });
}
  render(){
    return  <div
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}
            ref={ref => (this.span = ref)}
            >
             <HtmlTooltip title = {this.props.text} arrow placement="top">
                <span>
                  {this.props.text}
                </span>
              </HtmlTooltip>
              {console.log(this.state.overflowActive)}
          </div>
  }
}




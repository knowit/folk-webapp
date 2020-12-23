import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(() =>
  createStyles({
    gridHeaderRoot: {
      minHeight: '55.3px',
      backgroundColor: '#ffffff',
      borderBottom: 'solid 1px #e0ded7',
      padding: '0px 15px 0px 15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
      flexWrap: 'wrap',
    },
    removeAllTag:{
      padding: '1px 15px 1px 1px',
    },
    skillTag:{
      padding:'1px 1px 1px 15px',
    },
    tag: {
      display: 'flex',
      alignItems: 'center',
      height: '24px',
      margin: '2px',
      lineHeight: '22px',
      backgroundColor: '#fafafa',
      border: '1px solid #e8e8e8',
      boxSizing: 'content-box',
      outline: 0,
      overflow: 'hidden',
      '&:hover':{
        borderColor: 'rgb(250, 192, 177)',
        backgroundColor: '#fac0b11f',
      },
      '&:span':{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      '&:svg': {
        fontSize: '12px',
        cursor: 'pointer',
        padding: '4px',
      }
    }
  })
);


const Tag =({ label, onDelete}:{label:string, onDelete:()=>void}) => {
  const classes = useStyles();
  return(
    <div className = {[classes.tag,classes.skillTag].join(" ")}  onClick={onDelete} >
      <span>{label}</span>
      <CloseIcon style={{height:'10px', width:'10px', marginLeft:'10px', marginBottom:'10px',  backgroundColor: '#e4e1db'}}/>
    </div>
  );
}

const RemoveAllTag = (onDelete:{onDelete:()=>void})=> {
  const classes = useStyles();
  return(
    <div className = {[classes.tag,classes.removeAllTag].join(" ")}  onClick={onDelete.onDelete} >
      <CloseIcon/> 
      <span>Fjern alle</span>
    </div>
  );
}
  
export function FilterHeader(filters:{filterList:string[], setFilterList:Dispatch<SetStateAction<string[]>>}) {
  const classes = useStyles();
  const filterList = filters.filterList
  const setFilterList = filters.setFilterList
  
  return (
    <div className={classes.gridHeaderRoot}>
      {filterList.length >1 && <RemoveAllTag onDelete={()=> setFilterList([])}/>}
      {filterList.map(skill =>(
        <Tag key={skill} label = {skill} onDelete={()=> setFilterList(filterList.filter(filter => filter !== skill))}/>
      ))}
    </div>
    );
  }
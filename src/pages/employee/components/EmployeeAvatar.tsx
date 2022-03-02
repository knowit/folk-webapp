import * as React from 'react'
import { Avatar, makeStyles } from '@material-ui/core'
import { ReactComponent as FallbackUserIcon } from '../../../assets/fallback_user.svg'
import { CircleSkeleton } from '../../../components/skeletons/CircleSkeleton'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '150px',
    height: '150px',
  },
  avatar: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  avatarFallback: {
    width: '70%',
    height: '70%',
    '& circle': { fill: 'transparent' },
  },
}))

interface Props {
  imageUrl?: string
  isLoading?: boolean
}

export function EmployeeAvatar({ imageUrl, isLoading }: Props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircleSkeleton height="100%" width="100%" />
      ) : (
        <Avatar src={imageUrl} className={classes.avatar} alt="">
          <FallbackUserIcon className={classes.avatarFallback} />
        </Avatar>
      )}
    </div>
  )
}

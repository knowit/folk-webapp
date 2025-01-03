import React from 'react'
import { Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import FallbackUserIcon from '../../../assets/fallback_user.svg'
import { CircleSkeleton } from '../../../components/skeletons/CircleSkeleton'

const ComponentRoot = styled('div')(() => ({
  width: '150px',
  height: '150px',
}))
const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.default,
}))
const AvatarFallbackStyled = styled(FallbackUserIcon)(() => ({
  width: '70%',
  height: '70%',
  '& circle': { fill: 'transparent' },
}))

interface Props {
  imageUrl?: string
  isLoading?: boolean
}

export function EmployeeAvatar({ imageUrl, isLoading }: Props) {
  return (
    <ComponentRoot>
      {isLoading ? (
        <CircleSkeleton height="100%" width="100%" />
      ) : (
        <AvatarStyled src={imageUrl} alt="">
          <AvatarFallbackStyled />
        </AvatarStyled>
      )}
    </ComponentRoot>
  )
}

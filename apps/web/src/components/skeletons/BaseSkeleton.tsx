import * as React from 'react'
import { Skeleton, SkeletonTypeMap } from '@mui/material'

export type SkeletonProps = Pick<SkeletonTypeMap['props'], 'width' | 'height'>

interface BaseSkeletonProps extends SkeletonProps {
  variant?: SkeletonTypeMap['props']['variant']
}

/**
 * Base skeleton component that sets the default animation style.
 * Please use dedicated skeleton components (LineSkeleton, CircleSkeleton etc.).
 */
export function BaseSkeleton(props: BaseSkeletonProps) {
  return <Skeleton animation="wave" {...props} />
}

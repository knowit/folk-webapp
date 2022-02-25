import * as React from 'react'
import { Skeleton } from '@material-ui/lab'
import { SkeletonTypeMap } from '@material-ui/lab/Skeleton/Skeleton'

export interface SkeletonProps {
  height?: number | string
  width?: number | string
}

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

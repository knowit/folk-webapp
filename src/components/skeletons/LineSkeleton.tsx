import * as React from 'react'
import { BaseSkeleton, SkeletonProps } from './BaseSkeleton'

export function LineSkeleton(props: SkeletonProps) {
  return <BaseSkeleton variant="text" {...props} />
}

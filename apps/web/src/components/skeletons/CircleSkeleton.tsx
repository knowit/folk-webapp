import * as React from 'react'
import { BaseSkeleton, SkeletonProps } from './BaseSkeleton'

export function CircleSkeleton(props: SkeletonProps) {
  return <BaseSkeleton variant="circle" {...props} />
}

import * as React from 'react'
import { LineSkeleton } from './LineSkeleton'

const lineWidths = [70, 80, 65, 75, 70, 65, 70, 80, 67, 60]

function getLineWidth(index: number) {
  return lineWidths[index % lineWidths.length]
}

interface MultiLineSkeletonProps {
  lines?: number
  lineHeight?: number | string
}

export function MultiLineSkeleton({
  lines = 3,
  lineHeight = '1.5em',
}: MultiLineSkeletonProps) {
  return (
    <>
      {Array.from({ length: lines }).map((_, index) => (
        <LineSkeleton
          key={index}
          width={`${getLineWidth(index)}%`}
          height={lineHeight}
        />
      ))}
    </>
  )
}

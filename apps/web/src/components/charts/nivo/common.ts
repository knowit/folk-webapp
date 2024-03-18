import { Colors } from '@nivo/core'

export const chartColors: Colors = [
  '#918FEB',
  '#E8E578',
  '#7CD6EE',
  '#F18577',
  '#50BF9E',
  '#E17BBC',
  '#DCA35E',
  '#698EAF',
  '#919191',
  '#AAB863',
]

export interface IsBigProps {
  isBig: boolean
  setIsBig?: (val: boolean) => void
  legendWidth?: number
}

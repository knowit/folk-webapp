import React, { useState } from 'react'
import { DownloadIcon } from '../../../assets/Icons'
import { styled } from '@mui/material/styles'
import { NoData } from '../../ErrorText'
import * as ExcelJS from 'exceljs'
import { FilterObject } from '../../filter/FilterUtil'

const DownloadStyled = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'left',
}))

interface FilteredDownloadProps {
  filters: FilterObject[]
  names: string[]
}

export default function FilteredDownloadCell({
  filters,
  names,
}: FilteredDownloadProps) {
  const handleDownload = () => {
    createXlsLinks(rows, 'title')
  }

  const rows = []
  filters.forEach((filter) => {
    const columns: string[] = []
    columns.push(filter.label)
    filter.filters.forEach((entry) => {
      columns.push(entry.value + ':' + entry.threshold)
    })
    rows.push(columns)
  })
  rows.push([])
  rows.push(names)

  return filters ? (
    <>
      <DownloadStyled>
        Last ned filtertreff
        <DownloadIcon onClick={handleDownload} />
      </DownloadStyled>
    </>
  ) : (
    <NoData />
  )
}

export function createXlsLinks(rows: string[][], filename: string) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet 1')
  // rows.forEach((row) => worksheet.addRow(row))
  worksheet.addRows(rows)
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename + '.xlsx'
    link.click()
  })
}

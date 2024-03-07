import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from '@mui/material'
import { IconBaseStyle } from '../../assets/Icons'
import { ReactNode, useState } from 'react'
import { CheckBoxHeader, MUITableConfig, MUITableProps } from './tableTypes'
import { useMatomo } from '@jonkoops/matomo-tracker-react'

export const HeaderRoot = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  fontSize: 16,
  height: '100%',
  width: '100%',
  padding: 0,
  cursor: 'pointer',
}))

export const HeaderTitle = styled('div')(() => ({
  justifyContent: 'space-between',
  display: 'flex',
  width: '100%',
  paddingRight: 15,
}))

const CheckboxContainer = styled('div')(() => ({
  width: '60%',
}))

const FormControlLabelStyled = styled(FormControlLabel)(() => ({
  marginRight: 0,
}))

const CheckboxStyled = styled(Checkbox)(() => IconBaseStyle)

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  borderLeft: `1px solid ${theme.palette.background.paper}`,
  padding: 0,
  paddingLeft: '15px',
  paddingRight: '15px',
}))

export const CellCheckbox = (checkBox: CheckBoxHeader) => (
  <CheckboxContainer>
    <FormControlLabelStyled
      control={
        <CheckboxStyled disableRipple onChange={checkBox.changeHandler} />
      }
      label={checkBox.label}
      checked={checkBox.checked}
    />
  </CheckboxContainer>
)

function Row<T>(props: {
  config: MUITableConfig<T>[]
  rowData: T
  keyFn: (rowData: T) => string
  collapsable: (rowData: T) => ReactNode
}) {
  const { collapsable, config, rowData, keyFn } = props
  const [open, setOpen] = useState(false)
  const { trackEvent } = useMatomo()

  const toggle = () => {
    if (!open) {
      trackEvent({ category: 'user-details', action: 'click-event' })
    }
    setOpen((prev) => !prev)
  }
  const rowStyle = {
    height: '70px',
  }

  const additionalCellStyle = (column: MUITableConfig<T>) => {
    let style: React.CSSProperties = {}

    if (column.additionalCellStyle) {
      style = { ...column.additionalCellStyle }
    }

    if (column.width) {
      style.width = `${column.width}px`
    }

    return style
  }

  return (
    <>
      <TableRow style={{ ...rowStyle }} key={keyFn(rowData)}>
        {(config || []).map((column, index) => (
          <TableCellStyled
            style={additionalCellStyle(column)}
            key={column.label}
          >
            {column.render(rowData, index === 0 ? toggle : null, open)}
          </TableCellStyled>
        ))}
      </TableRow>
      {collapsable ? (
        <TableRow key={`collapse-${keyFn(rowData)}`}>
          <TableCell style={{ padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box>{collapsable(rowData)}</Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  )
}

const MUITable = <T extends object>({
  data,
  config,
  keyFn,
  collapsable,
}: MUITableProps<T>) => {
  const renderHeader = (
    <TableRow
      style={{
        height: '70px',
      }}
      key="header-row"
    >
      {(config || []).map((column, index) =>
        column.header ? (
          column.header
        ) : (
          <TableCellStyled key={index}>
            <HeaderRoot>
              <HeaderTitle>{column.label}</HeaderTitle>
              {column.checkBox ? <CellCheckbox {...column.checkBox} /> : null}
            </HeaderRoot>
          </TableCellStyled>
        )
      )}
    </TableRow>
  )

  const renderedRows = (data || []).map((rowData) => {
    return (
      <Row
        key={keyFn(rowData)}
        config={config}
        rowData={rowData}
        collapsable={collapsable}
        keyFn={keyFn}
      />
    )
  })

  return (
    <Table>
      <TableHead>{renderHeader}</TableHead>
      <TableBody>{renderedRows}</TableBody>
    </Table>
  )
}

export default MUITable

import { TableContainer } from '@mui/material'
import {
  ConsultantInfo,
  Customer,
  CvLinks,
  EmployeeTableRow,
  ProjectStatus,
} from '../../../api/data/employee/employeeApiTypes'
import SortableTable, {
  getSearchableColumns,
} from '../../../components/sortableTable/SortableMUITable'
import {
  CustomerStatusCell,
  CvCell,
  ProjectStatusCell,
} from '../../../components/sortableTable/DataCells'
import { EmployeeTableExpandedInfo } from './EmployeeTableExpandedInfo'
import ConsultantCell from '../../../components/sortableTable/cells/ConsultantCell'
import { EmployeeForCustomerList } from '../../../api/data/customer/customerApiTypes'
import {
  CheckBoxHeader,
  MUITableConfig,
  SortOrder,
} from '../../../components/sortableTable/tableTypes'

export type EmployeeRow = {
  rowId: string
  name: string
  employeeInfo: ConsultantInfo
  jobTitle: string | null
  projectStatus: ProjectStatus
  primaryCustomer: Customer | null
  cvLinks: CvLinks
  city: string
}

export type EmployeeCustomerRow = {
  rowId: string
  name: string
  employeeInfo: ConsultantInfo
  jobTitle: string | null
  customerAndProject: string
  cvLinks: CvLinks
}

export const getEmployeeTableConfig = (checkBox?: CheckBoxHeader) =>
  [
    {
      label: 'Konsulent',
      render: (row: EmployeeRow, toggle, open) => {
        return (
          <ConsultantCell
            data={row.employeeInfo}
            id={row.employeeInfo.user_id}
            isExpanded={open}
            toggleExpand={(id) => toggle(id)}
          />
        )
      },
      width: 395,
      additionalCellStyle: {
        paddingLeft: 0,
        paddingRight: 0,
      },
      checkBox: checkBox,
      sortValue: (row: EmployeeRow) => row.employeeInfo.name,
      searchValue: (consultant: ConsultantInfo) => consultant.name,
    },
    {
      label: 'Tittel',
      width: 222,
      render: (row: EmployeeRow) => row.jobTitle,
      sortValue: (row: EmployeeRow) => row.jobTitle,
      searchValue: (jobTitle: string) => jobTitle,
    },
    {
      label: 'Status',
      width: 90,
      render: (row: EmployeeRow) => (
        <ProjectStatusCell data={row.projectStatus} />
      ),
    },
    {
      label: 'Kunde',
      render: (row: EmployeeRow) => (
        <CustomerStatusCell
          data={row.primaryCustomer}
          role={row.employeeInfo.role}
        />
      ),
      width: 337,
      sortValue: (row: EmployeeRow) => row.primaryCustomer.customer ?? '',
      searchValue: (customerProject: Customer) => customerProject.customer,
    },
    {
      label: 'Kontor',
      width: 53,
      render: (row: EmployeeRow) => row.city,
      sortValue: (row: EmployeeRow) => row.city,
      searchValue: (row: EmployeeRow) => row.city,
    },
    {
      label: 'CV',
      width: 53,
      render: (row: EmployeeRow) => (
        <CvCell name={row.employeeInfo.name} data={row.cvLinks} />
      ),
    },
  ] as MUITableConfig<EmployeeRow>[]

export const getEmployeeSearchableColumns = () =>
  getSearchableColumns(getEmployeeTableConfig())
const keyFn = (row: EmployeeRow | EmployeeCustomerRow) => row.rowId
const collapsable = (row: EmployeeRow | EmployeeCustomerRow) => (
  <EmployeeTableExpandedInfo data={{ email: row.employeeInfo.email }} />
)

export const EmployeeTableConfig = (checkBox?: CheckBoxHeader) => {
  return { tableConfig: getEmployeeTableConfig(checkBox), keyFn, collapsable }
}

const employeeForCustomerConfig = [
  {
    label: 'Konsulent',
    render: (row: EmployeeCustomerRow, toggle, open) => {
      return (
        <ConsultantCell
          data={row.employeeInfo}
          id={row.employeeInfo.user_id}
          isExpanded={open}
          toggleExpand={(id) => toggle(id)}
        />
      )
    },
    width: 395,
    sortValue: (column: ConsultantInfo) => column.name,
    searchValue: (consultant: ConsultantInfo) => consultant.name,
  },
  {
    label: 'Tittel',
    width: 222,
    render: (row: EmployeeCustomerRow) => row.jobTitle,
    sortValue: (row: EmployeeCustomerRow) => row.jobTitle,
    searchValue: (jobTitle: string) => jobTitle,
  },
  {
    label: 'Kunde',
    render: (row: EmployeeCustomerRow) => row.customerAndProject,
    width: 337,
    sortValue: (row: EmployeeCustomerRow) => row.customerAndProject,
    searchValue: (customer: string) => customer ?? '',
  },
  {
    label: 'CV',
    width: 53,
    render: (row: EmployeeCustomerRow) => (
      <CvCell name={row.employeeInfo.name} data={row.cvLinks} />
    ),
  },
] as MUITableConfig<EmployeeCustomerRow>[]

export const SortableEmployeeTable = (props: {
  checkBox?: CheckBoxHeader
  data: EmployeeTableRow[]
}) => {
  const { tableConfig, keyFn, collapsable } = EmployeeTableConfig(
    props.checkBox
  )
  const employeeRows = props.data?.map(transformEmployeeTableRow)
  const initialSort = { sortOrder: SortOrder.Asc, sortBy: tableConfig[0].label }

  return (
    <TableContainer>
      <SortableTable<EmployeeRow>
        data={employeeRows}
        config={tableConfig}
        keyFn={keyFn}
        collapsable={collapsable}
        initialSort={initialSort}
      />
    </TableContainer>
  )
}

export const getEmployeeForCustomerSearchableColumns = () =>
  getSearchableColumns(employeeForCustomerConfig)

export const EmployeeTableForCustomer = (props: {
  data: EmployeeForCustomerList[]
}) => {
  const employeeRows = props.data?.map(transformEmployeeForCustomerList)
  const initialSort = {
    sortOrder: SortOrder.Asc,
    sortBy: employeeForCustomerConfig[0].label,
  }

  return (
    <TableContainer>
      <SortableTable<EmployeeCustomerRow>
        data={employeeRows}
        config={employeeForCustomerConfig}
        keyFn={keyFn}
        collapsable={collapsable}
        initialSort={initialSort}
      />
    </TableContainer>
  )
}

function transformEmployeeForCustomerList(row: EmployeeForCustomerList) {
  const { rowId, rowData } = row

  return {
    rowId,
    name: (rowData[0] as ConsultantInfo).name,
    employeeInfo: rowData[0],
    jobTitle: rowData[1],
    customerAndProject: rowData[2],
    cvLinks: rowData[3],
  } as EmployeeCustomerRow
}

function transformEmployeeTableRow(employeeTableRow: EmployeeTableRow) {
  const rowData = employeeTableRow['rowData']
  const rowId = employeeTableRow['rowId']
  return {
    rowId,
    name: (rowData[0] as ConsultantInfo).name,
    employeeInfo: rowData[0],
    jobTitle: rowData[1],
    projectStatus: rowData[2],
    primaryCustomer: rowData[3],
    customer: (rowData[3] as Customer)?.customer,
    cvLinks: rowData[4],
    city: (rowData[0] as ConsultantInfo).city,
  } as EmployeeRow
}

import { SingularChartData } from '../../../../../packages/folk-common/types/chartTypes'
import React, { useEffect, useState } from 'react'
import { GridItem } from '../gridItem/GridItem'
import { GridItemHeader } from '../gridItem/GridItemHeader'
import DropdownPicker from './DropdownPicker'
import { GridItemContent } from '../gridItem/GridItemContent'
import { ChartDisplayOptions } from './ChartDisplayOptions'
import { ToggleBigChartButton } from './ToggleBigChartButton'
import BigChart from './BigChart'
import { SingularChart } from './ChartCard'
import useFilteredData, {
  ChartFilterType,
} from './chartFilters/useFilteredData'
import {
  Checkbox,
  Fade,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import { SliceTooltip } from '@nivo/line'
import { makeStyles } from '@material-ui/core/styles'
import { MenuProps as MenuPropsType } from '@material-ui/core/Menu'

interface SingularChartCardProps {
  title: string
  description?: string
  fullSize: boolean
  data: SingularChartData
  showFilter?: boolean
  filterType?: ChartFilterType
  isHorizontal?: boolean
  sliceTooltip?: SliceTooltip
}

interface CustomerFilter {
  id: number
  name: string
  checked: boolean
}

const useBigStyles = makeStyles({
  menuPaper: ({ width }: { width: number }) => ({
    borderRadius: 0,
    width,
    backgroundColor: '#F1F0ED',
    marginLeft: -1,
    maxHeight: 340,
  }),
  menuList: {
    borderLeft: '1px solid white',
    borderRight: '1px solid white',
    borderTop: '1px solid white',
  },
})

const SingularChartCard = ({
  title,
  description,
  fullSize = false,
  showFilter,
  filterType,
  data,
  isHorizontal = false,
  ...props
}: SingularChartCardProps) => {
  const [isBig, setIsBig] = useState(false)
  const { filterOptions, getFilteredData, setSelectedFilter, selectedFilter } =
    useFilteredData(filterType, data)
  const chartData: SingularChartData = showFilter ? getFilteredData() : data
  const allCustomers: CustomerFilter[] = chartData.data
    .map((item, index) => {
      if (showFilter) {
        if (item.id !== undefined)
          return { id: index, name: item.id, checked: true }
        else if (item.customer !== undefined)
          return { id: index, name: item.customer, checked: true }
      }
    })
    ?.filter((item) => item !== undefined)
  const classes = useBigStyles({ width: 60 })
  const [filteredCustomers, setFilteredCustomers] =
    useState<CustomerFilter[]>(allCustomers)
  const [graphData, setGraphData] = useState<SingularChartData>(
    chartData.type === 'BarChart'
      ? {
          ...chartData,
          data: chartData.data
            .sort((a, b) => a.hours - b.hours)
            .filter((customer) => customer.hours > 0),
        }
      : chartData
  )

  const isAllSelected =
    graphData.data.length > 0 &&
    graphData.data.length === filteredCustomers.length

  const handleFilterChange = (event) => {
    if (event.target.value[event.target.value.length - 1] === 'all') {
      if (isAllSelected) {
        const tempCustomers: CustomerFilter[] = filteredCustomers.map(
          (customer) => {
            if (customer && customer.checked)
              return { id: customer.id, name: customer.name, checked: false }
            return customer
          }
        )
        setFilteredCustomers(tempCustomers)
      } else {
        const tempCustomers: CustomerFilter[] = filteredCustomers.map(
          (customer) => {
            if (customer && !customer.checked)
              return { id: customer.id, name: customer.name, checked: true }
            return customer
          }
        )
        setFilteredCustomers(tempCustomers)
      }
    } else {
      const currentFilteredCustomers = [...filteredCustomers]
      const customerName = event.target.value[0]
      const clickedCustomer = filteredCustomers.find(
        (tempCustomer) => tempCustomer.name === customerName
      )
      currentFilteredCustomers[clickedCustomer.id] = {
        id: clickedCustomer.id,
        name: clickedCustomer.name,
        checked: !clickedCustomer.checked,
      }
      setFilteredCustomers(currentFilteredCustomers)
    }
  }

  useEffect(() => {
    let isBarChart = false
    const newData = chartData.data.filter((customer) => {
      if (showFilter && filteredCustomers.length > 0) {
        if (customer.id !== undefined) {
          const currentCustomer = filteredCustomers.find(
            (curr) => curr.name === customer.id
          )
          if (currentCustomer.checked) {
            return { id: customer.id, data: customer.data }
          }
        } else if (customer.customer !== undefined) {
          isBarChart = true
          const currentCustomer = filteredCustomers.find(
            (curr) => curr.name === customer.customer
          )
          if (currentCustomer.checked) {
            return { customer: customer.customer, hours: customer.hours }
          }
        }
      }
    })
    if (isBarChart) {
      newData
        .sort((a, b) => a.hours - b.hours)
        .filter((customer) => customer.hours > 0)
    }

    const newGraph = { ...chartData, data: newData } as SingularChartData
    setGraphData(newGraph)
  }, [filteredCustomers, showFilter])

  useEffect(() => {
    console.log('Chartdata: ', chartData)
  }, [chartData])

  const selectAllHandler = () => {
    if (isAllSelected) {
      setFilteredCustomers([])
    } else {
      const tempCustomers: CustomerFilter[] = filteredCustomers.map(
        (customer) => {
          if (!customer.checked) return { ...customer, checked: true }
        }
      )
      setFilteredCustomers(tempCustomers)
    }
  }

  const MenuProps: Partial<MenuPropsType> = {
    TransitionComponent: Fade,
    MenuListProps: {
      disablePadding: true,
      className: classes.menuList,
    },
    PaperProps: {
      className: classes.menuPaper,
    },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    elevation: 0,
  }

  return (
    <GridItem fullSize={fullSize}>
      <GridItemHeader title={title} description={description}>
        {showFilter && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-between',
            }}
          >
            <DropdownPicker
              values={filterOptions}
              selected={selectedFilter}
              onChange={setSelectedFilter}
            />
            <div style={{ width: '60%' }}>
              <FormControl style={{ height: '100%', width: '100%' }}>
                <InputLabel
                  style={{
                    zIndex: '1',
                    color: 'black',
                    paddingLeft: '12px',
                    paddingRight: '24px',
                  }}
                  htmlFor="grouped-native-select"
                >
                  Velg kundefilter
                </InputLabel>
                <Select
                  multiple
                  defaultValue="Velg kundefilter"
                  value={[]}
                  onChange={handleFilterChange}
                  id="grouped-native-select"
                  input={<OutlinedInput />}
                  style={{ backgroundColor: '#F1F0ED' }}
                  MenuProps={MenuProps}
                >
                  <MenuItem value={'all'}>
                    <Checkbox
                      checked={isAllSelected}
                      onSelect={selectAllHandler}
                    />
                    <ListItemText primary={'Velg alle'} />
                  </MenuItem>
                  {filteredCustomers?.map((customer) => (
                    <MenuItem key={customer.id} value={customer.name}>
                      <Checkbox checked={customer.checked} />
                      <ListItemText primary={customer.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        )}
      </GridItemHeader>
      <GridItemContent>
        {/* Sub header containing only the increase size-button */}
        <ChartDisplayOptions>
          <ToggleBigChartButton big={isBig} onChange={() => setIsBig(!isBig)} />
        </ChartDisplayOptions>

        {/* The small chart */}
        <SingularChart
          isBig={false}
          chartData={graphData}
          isHorizontal={isHorizontal}
          {...props}
        />

        {/* The big chart */}
        <BigChart open={isBig} onClose={() => setIsBig(false)}>
          <SingularChart
            isBig={isBig}
            chartData={graphData}
            isHorizontal={isHorizontal}
            {...props}
          />
        </BigChart>
      </GridItemContent>
    </GridItem>
  )
}

export default SingularChartCard

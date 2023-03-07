import { SingularChartData } from '../../../../../packages/folk-common/types/chartTypes'
import React, { useState } from 'react'
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
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'

interface SingularChartCardProps {
  title: string
  description?: string
  fullSize: boolean
  data: SingularChartData
  showFilter?: boolean
  filterType?: ChartFilterType
  isHorizontal?: boolean
}

const SingularChartCard = ({
  title,
  description,
  fullSize = false,
  showFilter,
  filterType,
  data,
  isHorizontal = false,
}: SingularChartCardProps) => {
  const [isBig, setIsBig] = useState(false)
  const { filterOptions, getFilteredData, setSelectedFilter, selectedFilter } =
    useFilteredData(filterType, data)
  const chartData: SingularChartData = showFilter ? getFilteredData() : data
  const allCustomers = chartData.data
    .map((item) => {
      if (showFilter) {
        //Datatype er forkjellig på de to grafene. Kundenavn ligger på .id på den ene grafen og på .customer på den andre grafen
        if (item.id !== undefined) return item.id
        else if (item.customer !== undefined) return item.customer
      }
    })
    .filter((item) => item !== undefined)

  const [customerFilter, setCustomerFilter] = useState<string[]>(allCustomers)

  return (
    <GridItem fullSize={fullSize}>
      <GridItemHeader title={title} description={description}>
        {showFilter && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '60%',
              justifyContent: 'space-between',
            }}
          >
            <DropdownPicker
              values={filterOptions}
              selected={selectedFilter}
              onChange={setSelectedFilter}
            />
            <div style={{ width: '50%' }}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel htmlFor="grouped-native-select">
                  Velg kundefilter
                </InputLabel>
                <Select
                  multiple
                  defaultValue="Velg kundefilter"
                  value={[]}
                  id="grouped-native-select"
                  input={<OutlinedInput />}
                  style={{ backgroundColor: '#F1F0ED' }}
                >
                  {customerFilter.map((variant) => (
                    <MenuItem key={variant} value={variant}>
                      <Checkbox checked={false} />
                      <ListItemText primary={variant} />
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
          chartData={{
            data: chartData.data.sort((a, b) => a.hours - b.hours),
            ...chartData,
          }}
          isHorizontal={isHorizontal}
        />

        {/* The big chart */}
        <BigChart open={isBig} onClose={() => setIsBig(false)}>
          <SingularChart
            isBig={isBig}
            chartData={chartData}
            isHorizontal={isHorizontal}
          />
        </BigChart>
      </GridItemContent>
    </GridItem>
  )
}

export default SingularChartCard

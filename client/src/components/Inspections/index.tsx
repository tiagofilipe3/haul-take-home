import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { GridValueGetterParams } from '@mui/x-data-grid/models/params/gridCellParams'
import { Flex } from 'rebass'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as dayjs from 'dayjs'

import { TInspection } from '../../api/types.ts'
import { fetchInspectionList } from '../../api'
import { Container, StyledDataGrid as DataGrid } from './styles.ts'

const columns: GridColDef[] = [
  {
    field: 'inspectionDate',
    headerName: 'Date',
    valueGetter: (params: GridValueGetterParams) =>
      dayjs(params.row?.inspection?.inspectionDate).format('MM/DD/YYYY'),
    width: 200,
  },
  {
    field: 'reportNumber',
    headerName: 'Inspection Number',
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.inspection?.reportNumber,
    width: 250,
  },
  {
    field: 'vehiclePlate',
    headerName: 'Vehicle Plate',
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.inspection?.vehiclePlate,
    width: 200,
  },
  { field: 'BASIC', headerName: 'BASIC', width: 230 },
  {
    field: 'weight',
    headerName: 'Weight',
    valueGetter: (params: GridValueGetterParams) =>
      params.row?.inspection?.timeWeight,
    width: 200,
  },
]

const Inspections = () => {
  const [inspections, setInspections] = useState<TInspection[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  })
  const [basic, setBasic] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    getInspections()
  }, [paginationModel])

  useEffect(() => {
    getInspections()
  }, [basic])

  const getInspections = async () => {
    const data = await fetchInspectionList(
      paginationModel.page,
      paginationModel.pageSize,
      basic
    )
    setInspections(data.inspections)
    setRowCount(data.totalCount)
  }

  const handleRowClick = (params: number[]) => {
    const inspection: TInspection | undefined = inspections.find(
      (inspection) => inspection.id === params[0]
    )

    if (inspection) {
      navigate('/detail', { state: { id: inspection.inspectionId } })
    }
  }

  const handleClearFilters = () => {
    setBasic(null)
    getInspections()
  }

  return (
    <Flex
      flexDirection="column"
      m="20px"
      width="60%"
      height="100%"
      justifyContent="center"
    >
      <Typography variant="h5" fontWeight="600" mb="10px" mt="10px">
        DOT Inspections
      </Typography>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex
            mb="10px"
            mt="10px"
            ml="5px"
            alignItems="center"
            backgroundColor="#f7f8f9"
            width="fit-content"
            padding="10px"
          >
            <FormControl sx={{ minWidth: 150, mr: '10px' }}>
              <InputLabel>BASIC</InputLabel>
              <Select
                label="BASIC"
                autoWidth
                value={basic}
                onChange={(e) => {
                  setBasic(e.target.value as string)
                }}
              >
                <MenuItem value="Vehicle Maintenance">
                  Vehicle Maintenance
                </MenuItem>
                <MenuItem value="Unsafe Driving">Unsafe Driving</MenuItem>
                <MenuItem value="HOS Compliance">HOS Compliance</MenuItem>
                <MenuItem value="Driver Fitness">Driver Fitness</MenuItem>
                <MenuItem value="">None</MenuItem>
              </Select>
            </FormControl>
          </Flex>
          <Flex mr="20px">
            <Button
              variant="text"
              onClick={handleClearFilters}
              sx={{
                color: '#213547',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: '16px',
              }}
            >
              Clear filters
            </Button>
          </Flex>
        </Flex>
        <DataGrid
          columns={columns}
          rows={inspections}
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          onRowSelectionModelChange={(params) =>
            handleRowClick(params as number[])
          }
        />
      </Container>
    </Flex>
  )
}

export { Inspections }

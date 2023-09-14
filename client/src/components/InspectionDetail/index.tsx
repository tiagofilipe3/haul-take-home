import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Flex } from 'rebass'
import * as dayjs from 'dayjs'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { TInspectionDetail } from '../../api/types.ts'
import { fetchInspection } from '../../api'
import {
  DetailsContainer,
  InfoIcon,
  InspectionContainer,
  RoundTruck,
  StyledTextField as TextField,
  VehicleInfo,
  VehiclesContainer,
  VehicleYearMake,
  StyledTableContainer as TableContainer,
} from './styles.ts'

const InspectionDetail = () => {
  const { state } = useLocation()
  const [inspectionDetail, setInspectionDetail] =
    useState<TInspectionDetail | null>(null)

  const { inspection, violations, vehicles } = inspectionDetail || {}
  const [isFetching, setIsFetching] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setIsFetching(true)
    getInspection()
  }, [state.id])

  const getInspection = async () => {
    const data = await fetchInspection(state.id)
    setInspectionDetail(data)
    setIsFetching(false)
  }

  return !isFetching ? (
    inspection && violations && vehicles && (
      <DetailsContainer>
        <Flex alignItems="center">
          <ArrowBackIcon
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          />
          <Typography
            variant="h5"
            fontWeight="600"
            mb="10px"
            mt="10px"
            ml="10px"
          >
            {inspection.reportNumber}
          </Typography>
        </Flex>
        <Flex>
          <InspectionContainer>
            <Typography color="#8f8a8a" fontSize="22px" fontWeight="400">
              Inspection Overview
            </Typography>
            <Flex mt="15px" justifyContent="space-between" flexWrap="wrap">
              <TextField
                label="Report Number"
                variant="filled"
                value={inspection.reportNumber}
                disabled
              />
              <TextField
                label="Date"
                variant="filled"
                value={dayjs(inspection.inspectionDate).format('MM/DD/YYYY')}
                disabled
              />
              <TextField
                label="Report State"
                variant="filled"
                value={inspection.reportState}
                disabled
              />
              <TextField
                label="Level"
                variant="filled"
                value={inspection.level}
                disabled
              />
              <TextField
                label="Weight"
                variant="filled"
                value={inspection.timeWeight}
                disabled
              />
              <TextField
                label="Hazmat Placard Required"
                variant="filled"
                value={inspection.placarableHMVehInsp}
                disabled
              />
            </Flex>
            <Typography
              color="#8f8a8a"
              fontSize="22px"
              fontWeight="400"
              mt="25px"
            >
              Vehicle Information
            </Typography>
            <TableContainer sx={{ mt: '15px' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Unit</TableCell>
                    <TableCell align="center">Type</TableCell>
                    <TableCell align="center">Plate State</TableCell>
                    <TableCell align="center">Plate Number</TableCell>
                    <TableCell align="center">VIN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicles.map(
                    ({
                      vehicleIdNumber,
                      unit,
                      unitType,
                      licenseState,
                      licenseNumber,
                    }) => (
                      <TableRow
                        key={vehicleIdNumber}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {unit}
                        </TableCell>
                        <TableCell align="center">{unitType}</TableCell>
                        <TableCell align="center">{licenseState}</TableCell>
                        <TableCell align="center">{licenseNumber}</TableCell>
                        <TableCell align="center">{vehicleIdNumber}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              color="#8f8a8a"
              fontSize="22px"
              fontWeight="400"
              mt="25px"
            >
              Violations
            </Typography>
            <TableContainer sx={{ mt: '15px' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell align="center">Unit</TableCell>
                    <TableCell align="center">OOS</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">BASIC</TableCell>
                    <TableCell align="center">Time Severety weight</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {violations.map(
                    ({
                      id,
                      code,
                      unit,
                      oos,
                      description,
                      BASIC,
                      time_severity_weight,
                    }) => (
                      <TableRow
                        key={id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {code}
                        </TableCell>
                        <TableCell align="center">
                          {isNaN(unit) ? 'Driver' : unit}
                        </TableCell>
                        <TableCell align="center">{oos}</TableCell>
                        <TableCell align="center">{description}</TableCell>
                        <TableCell align="center">{BASIC}</TableCell>
                        <TableCell align="center">
                          {time_severity_weight}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </InspectionContainer>
          <VehiclesContainer>
            {vehicles.map(
              ({
                unit,
                licenseNumber,
                vehicleIdNumber,
                vehicleYear,
                vehicleMake,
              }) => (
                <VehicleInfo key={vehicleIdNumber}>
                  <Flex>
                    <RoundTruck />
                    <Flex flexDirection="column">
                      <Flex alignItems="center" ml="10px" mb="5px">
                        <InfoIcon />
                        {unit === 1 ? 'Truck' : 'Trailer'}
                      </Flex>
                      <Flex alignItems="center" ml="10px">
                        <InfoIcon />
                        {licenseNumber}
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center" ml="10px" mt="10px">
                    <InfoIcon />
                    {vehicleIdNumber}
                  </Flex>
                  {vehicleYear && vehicleMake && (
                    <Flex alignItems="center" ml="10px" mt="10px">
                      <InfoIcon />
                      <VehicleYearMake>
                        {vehicleYear} {vehicleMake.toLowerCase()}
                      </VehicleYearMake>
                    </Flex>
                  )}
                </VehicleInfo>
              )
            )}
          </VehiclesContainer>
        </Flex>
      </DetailsContainer>
    )
  ) : (
    <Typography variant="h5" fontWeight="600" mb="10px" mt="10px">
      Loading...
    </Typography>
  )
}

export default InspectionDetail

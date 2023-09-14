import { TableContainer, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { Container } from '../Inspections/styles.ts'

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 65%;
  height: 100%;
  justify-content: center;
`

const InspectionContainer = styled(Container)`
  width: 70%;
`

const VehiclesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`

const StyledTextField = styled(TextField)`
  width: calc(50% - 10px);
  margin-right: 10px;
  margin-bottom: 10px;

  & .Mui-disabled {
    background-color: #f7f8f9;
  }

  & .MuiFilledInput-root.Mui-disabled:before {
    border-bottom-style: none;
  }

  & .MuiInputBase-root,
  & .MuiInputBase-input {
    border-radius: 10px;
  }
`

const RoundTruck = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url('/truck.svg');
  background-size: cover;
`

const InfoIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url('/info.svg');
  background-size: cover;
  margin-right: 8px;
`

const VehicleInfo = styled(Container)`
  margin-left: 20px;
  height: fit-content;
  margin-bottom: 20px;
`

const VehicleYearMake = styled.div`
  text-transform: capitalize;
`

const StyledTableContainer = styled(TableContainer)`
  border: 1.5px solid #f3e9e9;
  border-radius: 5px;
  background-color: #f7f8f9;
  padding: 0 10px;

  & .MuiTableCell-head {
    color: #8f8a8a;
  }

  & .MuiTableCell-body {
    font-weight: 500;
  }
`

export {
  StyledTextField,
  RoundTruck,
  VehicleInfo,
  InfoIcon,
  InspectionContainer,
  VehiclesContainer,
  DetailsContainer,
  VehicleYearMake,
  StyledTableContainer,
}

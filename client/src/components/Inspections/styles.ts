import styled from '@emotion/styled'
import { DataGrid } from '@mui/x-data-grid'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
`

const StyledDataGrid = styled(DataGrid)`
  font-size: 16px;
  border: none;

  & .MuiDataGrid-row {
    cursor: pointer;
  }
`

const Label = styled.div`
  font-weight: 600;
`

export { Container, StyledDataGrid, Label }

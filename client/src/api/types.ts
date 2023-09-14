type TViolation = {
  id: number
  inspectionId: number
  code: string
  description: string
  oos: string
  time_severity_weight: number
  BASIC: string
  unit: number
  convicted_of_dif_charge: string
  inspection: TInspection
}

type TInspection = {
  id: number
  inspectionId: number
  inspectionDate: string
  reportState: string
  reportNumber: string
  level: number
  timeWeight: number
  placarableHMVehInsp: string
  HMInspection: string
  vehiclePlate: string | number
}

type TVehicle = {
  inspectionId: number
  unit: number
  vehicleIdNumber: string
  unitType: string
  licenseState: string
  licenseNumber: string
  vehicleYear: string
  vehicleMake: string
}

type TInspectionDetail = {
  inspection: TInspection
  violations: TViolation[]
  vehicles: TVehicle[]
}

export type { TInspection, TViolation, TVehicle, TInspectionDetail }

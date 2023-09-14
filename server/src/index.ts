import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import bodyparser from 'body-parser'

//json-server
import jsonServer from 'json-server'
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

import { TVehicle, TVehicleInfo, TViolation } from './types.js'

const app = express()
app.use(bodyparser.json())
const port = 3001

server.use(middlewares)
server.use(router)
server.listen(3002, () => {
  console.log('JSON Server is running')
})

app.use(cors())

app.get('/inspections', async (req, res) => {
  const { page, limit, basic } = req.query

  const inspections = await fetch(
    `http://localhost:3002/violations?_expand=inspection&_page=${page}&_limit=${limit}${
      basic ? `&BASIC=${basic}` : ''
    }`
  )
  const totalCount = Number(inspections.headers.get('X-Total-Count')) | 0

  const inspectionsJson = await inspections.json()
  res.set('Access-Control-Expose-Headers', 'X-Total-Count')
  res.set('X-Total-Count', totalCount.toString())
  res.json(inspectionsJson)
})

app.get('/inspections/:id', async (req, res) => {
  const { id } = req.params

  const inspectionReq = await fetch(`http://localhost:3002/inspections/${id}`)

  const inspection = await inspectionReq.json()

  const violationReq = await fetch(
    `http://localhost:3002/violations/?inspectionId=${id}`
  )
  const violations = (await violationReq.json()) as TViolation

  const vehiclesReq = await fetch(
    `http://localhost:3002/vehicles/?inspectionId=${id}`
  )
  const vehicles = (await vehiclesReq.json()) as TVehicle[]

  const asyncVehiclesInfo = await Promise.all(
    vehicles.map(async (vehicle: TVehicle) => {
      const vehicleInfoReq = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vehicle.vehicleIdNumber}?format=json`
      )
      const vehicleInfoJson = (await vehicleInfoReq.json()) as TVehicleInfo

      const vehicleYear = vehicleInfoJson.Results.find(
        (item) => item.Variable === 'Model Year'
      )

      const vehicleMake = vehicleInfoJson.Results.find(
        (item) => item.Variable === 'Make'
      )

      return {
        ...vehicle,
        vehicleYear: vehicleYear?.Value,
        vehicleMake: vehicleMake?.Value,
      }
    })
  )

  res.send({ inspection, violations, vehicles: asyncVehiclesInfo })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

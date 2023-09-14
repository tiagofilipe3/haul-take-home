import { TInspection } from './types.ts'

const fetchInspectionList = async (
  page: number,
  limit: number,
  basic: string | null
) => {
  const res = await fetch(
    `http://localhost:3001/inspections?page=${page}&limit=${limit}${
      basic ? `&basic=${basic}` : ''
    }`,
    { method: 'GET' }
  )

  const inspections: TInspection[] = await res.json()
  const totalCount = Number(res.headers.get('X-Total-Count')) | 0

  return { inspections, totalCount }
}

const fetchInspection = async (id: number) => {
  const res = await fetch(`http://localhost:3001/inspections/${id}`)
  return await res.json()
}

export { fetchInspectionList, fetchInspection }

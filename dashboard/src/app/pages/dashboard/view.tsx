import ReactEcharts from 'echarts-for-react'
import { useGetPieChartQuery } from '../../store/chart'

export default function View() {
  const { data: pieseries } = useGetPieChartQuery('3ad4356f-91c6-469a-a0ba-1f26bd78fd29')

  return (
    <div className="flex flex-col text-3xl capitalize">
      <span className="font-semibold">Hello,</span>
      <span>User!</span>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Income</h5>
          <ReactEcharts
            option={{
              series: pieseries,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  )
}

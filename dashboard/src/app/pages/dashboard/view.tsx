import ReactEcharts from 'echarts-for-react'
import { useLazyGetExpenseChartQuery, useLazyGetIncomeChartQuery } from '../../store/chart'
import { authSelector, useLazyUploadCSVQuery } from '../../store/auth'
import { useAppSelector } from '../../hooks'
import { useEffect } from 'react'

export default function View() {
  const { id: userId, isDataAvailable } = useAppSelector(authSelector)
  const [getIncomeData, { data: incomeseries = { series: {} } }] = useLazyGetIncomeChartQuery()
  const [getExpenseData, { data: expenseseries = { series: {} } }] = useLazyGetExpenseChartQuery()
  const [uploadCSV] = useLazyUploadCSVQuery()

  useEffect(() => {
    getIncomeData(userId, false)
    getExpenseData(userId, false)
  }, [userId])

  const handleFileChange = (e: any) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', e.target.files[0])
    uploadCSV({ userId, formData }).then(({ isSuccess }) => {
      if (isSuccess) {
        window.location.reload()
      }
    })
  }

  return (
    <div className="flex flex-col text-3xl capitalize">
      <span className="font-semibold">Hello,</span>
      <span>User!</span>
      {isDataAvailable ? (
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Income</h5>
            <ReactEcharts
              option={{
                series: incomeseries.series,
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Expense</h5>
            <ReactEcharts
              option={{
                series: expenseseries.series,
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-lg border border-gray-200 bg-white p-6 shadow">
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-[50vh] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-3 h-10 w-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">CSV (MAX. 100MB)</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

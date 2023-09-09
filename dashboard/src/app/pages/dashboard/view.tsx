import ReactEcharts from 'echarts-for-react'
import {
  useLazyGetExpenseChartQuery,
  useLazyGetIncomeChartQuery,
  useLazyGetMonthWiseSummaryQuery,
} from '../../store/chart'
import { authSelector, setIsDataAvailable, useUploadCSVMutation } from '../../store/auth'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useEffect } from 'react'

export default function View() {
  const dispatch = useAppDispatch()
  const { id: userId, name, isDataAvailable } = useAppSelector(authSelector)
  const [getIncomeData, { data: incomeseries = { series: {} } }] = useLazyGetIncomeChartQuery()
  const [getExpenseData, { data: expenseseries = { series: {} } }] = useLazyGetExpenseChartQuery()
  const [getSummaryData, { data: summary = {} }] = useLazyGetMonthWiseSummaryQuery()
  const [uploadCSV, { isLoading: isUploading }] = useUploadCSVMutation()

  useEffect(() => {
    if (isDataAvailable) {
      getIncomeData(userId, false)
      getExpenseData(userId, false)
      getSummaryData(userId, false)
    }
  }, [userId])

  const handleFileChange = async (e: any) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', e.target.files[0])
    try {
      const payload = await uploadCSV({ userId, formData }).unwrap()
      dispatch(setIsDataAvailable())
      window.location.reload()
    } catch (error) {
      console.error('rejected', error)
    }
  }

  return (
    <div className="flex flex-col text-3xl capitalize">
      <span className="font-semibold">Hello,</span>
      <span>{name}!</span>
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
          <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Summary</h5>
            <ReactEcharts
              option={{
                ...summary,
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                  orient: 'vertical',
                  right: 10,
                  top: 'center',
                  data: [
                    {
                      name: 'Savings',
                      icon: 'rect',
                    },
                    {
                      name: 'Expenses',
                      icon: 'rect',
                    },
                  ],
                },
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
              {isUploading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="mr-2 inline h-10 w-10 animate-spin fill-primary text-gray-200"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-3 h-10 w-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">CSV (MAX. 100MB)</p>
                </div>
              )}

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

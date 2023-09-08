import { useRouteError } from 'react-router-dom'

interface ErrorType {
  statusText: string
  message: string
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorType

  return (
    <section id="error-page" className="relative z-10 bg-white py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[400px] text-center">
              <h2 className="mb-2 text-[50px] font-bold leading-none text-primary sm:text-[80px] md:text-[100px]">
                Oops!
              </h2>
              <h4 className="mb-3 text-[22px] font-semibold leading-tight text-primary">
                Sorry, an unexpected error has occurred.
              </h4>
              <p className="mb-8 text-lg text-primary">{error.statusText || error.message}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

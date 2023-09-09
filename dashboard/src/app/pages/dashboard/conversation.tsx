import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  addAnswer,
  addQuestion,
  consultationSelector,
  useGetAnswersMutation,
} from '../../store/consultation'

function ChatBubble({ question, answer, time }: any) {
  return answer !== undefined ? (
    <div key={answer} className="message mb-4 flex">
      <div className="flex-2">
        <div className="relative h-12 w-12">
          <img className="mx-auto h-12 w-12 rounded-full" src="ai-image.png" alt="chat-user" />
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="inline-block max-w-xl rounded-lg bg-gray-300 p-2 px-6 text-gray-700">
          <span>{answer}</span>
        </div>
        <div className="pl-4">
          <small className="text-gray-500">{time}</small>
        </div>
      </div>
    </div>
  ) : (
    <div key={question} className="message me mb-4 flex text-right">
      <div className="flex-1 px-2">
        <div className="inline-block max-w-xl rounded-lg bg-primaryLight p-2 px-6 text-white">
          <span>{question}</span>
        </div>
        <div className="pr-4">
          <small className="text-gray-500">{time}</small>
        </div>
      </div>
    </div>
  )
}

export default function Conversation() {
  const dispatch = useAppDispatch()
  const consultations = useAppSelector(consultationSelector)
  const [query, setQuery] = useState('')
  const [getAnswer] = useGetAnswersMutation()

  const handleSend = async () => {
    try {
      dispatch(addQuestion(query))
      setQuery('')
      const payload = await getAnswer(query).unwrap()
      dispatch(addAnswer(payload.answer))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="h-full w-full flex-1 bg-gray-100">
      <div className="main-body container m-auto flex h-full w-11/12 flex-col">
        <div className="flex-2 flex flex-row py-4"></div>
        <div className="main flex flex-1 flex-col">
          <div className="heading flex-2 hidden lg:block">
            <h1 className="mb-4 text-3xl text-gray-700">Ask your query</h1>
          </div>
          <div className="flex h-full flex-1">
            <div className="chat-area flex flex-1 flex-col">
              <div className="flex-3">
                <h2 className="mb-8 border-b-2 border-gray-200 py-1 text-xl">
                  Chatting with <b>FinAItic Assistant</b>
                </h2>
              </div>
              <div className="h-[65vh] w-full overflow-y-auto">
                <div className="messages flex-1">{consultations.map(ChatBubble)}</div>
              </div>
              <div className="flex-2 pb-10 pt-4">
                <div className="write flex rounded-lg bg-white shadow">
                  <div className="flex-1">
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      name="question"
                      className="block w-full bg-transparent px-4 py-4 outline-none"
                      rows={1}
                      placeholder="Type a question..."
                      onKeyUp={(e) => e.key == 'Enter' && handleSend()}
                    ></textarea>
                  </div>
                  <div className="flex-2 flex content-center items-center p-2">
                    <div className="flex flex-row justify-end">
                      <button
                        className="inline-block h-10 w-20 flex-row justify-center rounded-lg bg-primary text-white"
                        onClick={handleSend}
                      >
                        <span className="inline-block align-text-bottom">
                          <svg
                            className="ml-1 h-6 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 495.003 495.003"
                          >
                            <g id="XMLID_51_">
                              <path
                                id="XMLID_53_"
                                d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616
		l-67.6-32.22V456.687z"
                              />
                              <path
                                id="XMLID_52_"
                                d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422
		c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414
		l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956
		L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
                              />
                            </g>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

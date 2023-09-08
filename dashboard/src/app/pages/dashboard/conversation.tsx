function ChatBubble({ isAi }: any) {
  return isAi ? (
    <div className="message mb-4 flex">
      <div className="flex-2">
        <div className="relative h-12 w-12">
          <img className="mx-auto h-12 w-12 rounded-full" src="ai-image.png" alt="chat-user" />
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="inline-block rounded-full bg-gray-300 p-2 px-6 text-gray-700">
          <span>All</span>
        </div>
        <div className="pl-4">
          <small className="text-gray-500">15 April</small>
        </div>
      </div>
    </div>
  ) : (
    <div className="message me mb-4 flex text-right">
      <div className="flex-1 px-2">
        <div className="inline-block rounded-full bg-blue-600 p-2 px-6 text-white">
          <span>It's true</span>
        </div>
        <div className="pr-4">
          <small className="text-gray-500">15 April</small>
        </div>
      </div>
    </div>
  )
}

export default function Conversation() {
  return (
    <div className="h-full w-full flex-1 bg-gray-100">
      <div className="main-body container m-auto flex h-full w-11/12 flex-col">
        <div className="flex-2 flex flex-row py-4"></div>
        <div className="main flex flex-1 flex-col">
          <div className="heading flex-2 hidden lg:block">
            <h1 className="mb-4 text-3xl text-gray-700">Conversation</h1>
          </div>

          <div className="flex h-full flex-1">
            <div className="chat-area flex flex-1 flex-col">
              <div className="flex-3">
                <h2 className="mb-8 border-b-2 border-gray-200 py-1 text-xl">
                  Chatting with <b>FinAItic GPT</b>
                </h2>
              </div>
              <div className="h-[65vh] w-full overflow-y-auto">
                <div className="messages flex-1">
                  {ChatBubble({ isAi: true })} {ChatBubble({ isAi: false })}
                </div>
              </div>
              <div className="flex-2 pb-10 pt-4">
                <div className="write flex rounded-lg bg-white shadow">
                  <div className="flex-3 flex content-center items-center p-4 pr-0 text-center">
                    <span className="block text-center text-gray-400 hover:text-gray-800">
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                      >
                        <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      name="message"
                      className="block w-full bg-transparent px-4 py-4 outline-none"
                      rows={1}
                      placeholder="Type a message..."
                    ></textarea>
                  </div>
                  <div className="flex-2 flex w-32 content-center items-center p-2">
                    <div className="flex-1 text-center">
                      <span className="text-gray-400 hover:text-gray-800">
                        <span className="inline-block align-text-bottom">
                          <svg
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                          >
                            <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                          </svg>
                        </span>
                      </span>
                    </div>
                    <div className="flex-1">
                      <button className="inline-block h-10 w-10 rounded-full bg-blue-400">
                        <span className="inline-block align-text-bottom">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 text-white"
                          >
                            <path d="M5 13l4 4L19 7"></path>
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

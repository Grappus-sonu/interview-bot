"use client"

import cx from "classnames"
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import useSocket from '@/hooks/useSocket'

const ChatThreadItem = ({children, sent}: any) => (
  <div className={cx('max-w-[calc(100%-100px)] w-full break-words', sent ? 'ml-auto' : 'mr-auto')}>
    <div className={cx('text-black p-3 rounded-lg w-full', sent ? 'bg-green-200 ' : 'bg-white')}>
      {children}
    </div>
  </div>
)

export default function Home() {
  const socket = useSocket({
    baseurl: "https://openmediavault-1.hawk-pike.ts.net/",
    events: {
      connect: onConnected,
      disconnect: (event) => {console.log("disconnected", event)},
      init: (event) => {console.log("init", event)},
      "interviewer-response": onInterviewerResponse,
      "interviewee-response": onIntervieweeResponse,
    }
  })
  const searchParams = useSearchParams();
  const interviewId = searchParams?.get('interviewId');
  const clientId = searchParams?.get('clientId');
  const [startInterview, setStartInterview] = useState<boolean>(false);
  const [chatThread, setChatThread] = useState<any>([]);
  const [value, setValue] = useState("");

  const onChange = (event: any) => {setValue(event.target.value)}

  const onSubmit = async (event: any) => {
    event.preventDefault();
    socket.emit("interviewee-response", {
      messageType: "interviewee-response",
      interviewId,
      payload: {content: value}
    });
    setValue("")
  }

  const onClickJoinInterview = () => setStartInterview(true)

  function onInterviewerResponse (event: any) {
    setChatThread((prev: any) => [{
      from: "RECEIVER",
      content: event
    }, ...prev])
  }

  function onIntervieweeResponse (event: any) {
    setChatThread((prev: any) => [{
      from: "SENDER",
      content: event
    }, ...prev])
  }

  function onConnected (event: any) {
    console.log("connected", event)
    socket.emit("join-interview", {
      interviewId,
      clientId
    });
  }

  return (
    <main className="h-screen p-24 flex flex-col items-stretch">
      {interviewId && clientId ? (
        <>
        {startInterview ? (
          <form className='flex flex-col h-full w-full max-w-lg mx-auto' onSubmit={onSubmit}>
            <div className='py-10 h-full flex flex-col-reverse w-full gap-10  overflow-y-scroll'>
              {chatThread.map((item: any, idx: number) => (
                <ChatThreadItem sent={item?.from === "SENDER"} key={idx}>
                  {item?.content}
                </ChatThreadItem>
              ))}
            </div>
            <div className='w-full flex'>
              <input className='px-3 w-full rounded-l text-black' onChange={onChange} value={value}/>
              <button type='submit' className='px-4 py-1.5 bg-blue-500 text-lg rounded-r uppercase font-medium'>send</button>
            </div>
          </form>
        ): (
          <div className='bg-slate-800 p-3'>
            <button onClick={onClickJoinInterview}>Join Interview</button>
          </div>
        )}
        </>
      ) : (
        <div>Please Provide the Client Id & Interview Id</div>
      )}
    </main>
  )
}

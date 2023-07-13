'use client'
import cx from "classnames"
import { useEffect, useState } from 'react'
import { CgAdd } from "react-icons/cg"
import useSocket from '@/hooks/useSocket';
import {ChatThreadItem, GPTAnalysis, Insights, InterviewTimeline, LiveAnalysis} from "./pageComponents"
import { useSearchParams } from "next/navigation"

export default function Page() {

  return (
    <div className='flex flex-col h-full'>
      <div className='p-4 h-screen grid gap-4' style={{gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "4fr 1fr"}}>
        <section className='w-full' style={{gridRow: '1/2', gridColumn: '1/2'}}>
          <Conversation/>
        </section>
        <section className='w-full flex flex-col gap-4' style={{gridRow: '1/2', gridColumn: '2/3'}}>
          <LiveAnalysis />
          <Insights />
        </section>
        <section className='w-full min-h-0' style={{gridRow: '1/2', gridColumn: '3/4'}}>
          <GPTAnalysis />
        </section>
        <section className='w-full px-10 flex items-center' style={{gridRow: '2/3', gridColumn: '1/4'}}>
          <InterviewTimeline timeline={timeline}/>
        </section>
      </div>
    </div>
  )
}

const Conversation = ({}: any) => {
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

  const [chatThread, setChatThread] = useState<any>([]);
  const searchParams = useSearchParams();
  const interviewId = searchParams?.get('interviewId');
  const clientId = searchParams?.get('clientId');

  const [value, setValue] = useState("");

  const onChange = (event: any) => {setValue(event.target.value)}

  const onSubmit = async (event: any) => {
    event.preventDefault();
    socket.emit("interviewer-response", {
      messageType: "interviewer-response",
      interviewId,
      payload: {content: value},
    });
    setValue("")
  }

  function onConnected (event: any) {
    socket.emit("join-interview", { interviewId, clientId })
  }

  function onInterviewerResponse (event: any) {
    setChatThread((prev: any) => [{
      from: "SENDER",
      content: event
    }, ...prev])
  }

  function onIntervieweeResponse (event: any) {
    setChatThread((prev: any) => [{
      from: "RECEIVER",
      content: event
    }, ...prev])
  }

  console.log("chatThread", chatThread)
  return (
    <div className='h-full'>
      <form className='flex flex-col h-full w-full max-w-lg mx-auto' onSubmit={onSubmit}>
        <div className='py-10 h-full flex flex-col-reverse w-full gap-10 overflow-y-scroll'>
          {chatThread.map((item: any, idx: number) => (
            <ChatThreadItem sent={item?.from === "SENDER"} key={idx}>
              {item?.content}
            </ChatThreadItem>
          ))}
        </div>
        <div className='w-full flex px-2'>
          <input className='w-full rounded-l text-black px-3' onChange={onChange} value={value} type="text" placeholder='Type your message here...'/>
          <button type='submit' className='px-4 py-1.5 bg-blue-500 text-lg rounded-r uppercase font-medium'>send</button>
        </div>
      </form>
    </div>
  )
}



const timeline = [
  {
    id: 1,
    title: "Introduction",
  },
  {
    id: 2,
    title: "Add CheckPoint",
    icon: <CgAdd /> 
  },
  {
    id: 3,
    title: "Design Questions"
  },
  {
    id: 4,
    title: "Coding Questions"
  },
  {
    id: 5,
    title: "Interview End"
  }
]

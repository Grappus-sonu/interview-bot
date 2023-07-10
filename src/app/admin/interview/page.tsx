'use client'
import cx from "classnames"
import { useEffect, useState } from 'react'
import { BsFillBrightnessHighFill } from "react-icons/bs"
import { LuTimer, LuLogOut } from "react-icons/lu"
import { TbMicrophone2 } from "react-icons/tb"
import { CgCommunity, CgAdd } from "react-icons/cg"
import useSocket from '@/hooks/useSocket';
import {GPTAnalysis, Insights, ChatThreadItem, InterviewTimeline, LiveAnalysis, Personality, QuestionAnswer} from "./pageComponents"

export default function Page() {
  
  return (
    <div className='flex flex-col h-full'>
      <div className='p-4 h-screen grid gap-4' style={{gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "4fr 1fr"}}>
        <section className='w-full' style={{gridRow: '1/2', gridColumn: '1/2'}}>
          <Conversation />
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


const Conversation = () => {
  // const socket = useContext<any>(InterviewerContext);
  const [chatThread, setChatThread] = useState<any>(["abc", "bcvd"]);
  const socket = useSocket({
    baseurl: "https://openmediavault-1.hawk-pike.ts.net/",
    events: {
      connect: (event) => {console.log("connected", event)},
      disconnect: (event) => {console.log("disconnected", event)},
      init: (event) => {console.log("init", event)},
      "interviewer-response": onChatThread,
      "interviewee-response": onChatThread,
    }
  })

  const [value, setValue] = useState("");

  const onChange = (event: any) => {setValue(event.target.value)}

  const onSubmit = async (event: any) => {
    event.preventDefault();
    socket.emit("interviewee-response", {
      messageType: "interviewer-response",
      interviewId: "dd8a50e0-822e-47b3-a784-648265bad6d3",
      payload: {content: value},
    });
    setValue("")
  }

  function onChatThread (event: any) {
    setChatThread((prev: any) => [event, ...prev])
  }

  useEffect(() => {
    socket.emit("join-interview", {
      interviewId: "dd8a50e0-822e-47b3-a784-648265bad6d3",
      clientId: "9ebea1c3-05ca-4a9e-883f-194746c9777f"
    });
  }, [])

  return (
    <div className='h-full'>
      <form className='flex flex-col h-full w-full max-w-lg mx-auto' onSubmit={onSubmit}>
        <div className='py-10 h-full flex flex-col-reverse w-full gap-10 overflow-y-scroll'>
          {
            chatThread.map((item: any, idx: number) => (
              <div key={item} className={cx('max-w-[calc(100%-100px)] w-full break-words ml-auto')}>
                <div className={cx('text-black p-3 rounded-lg w-full bg-white')}>
                  {item}
                </div>
                {idx === chatThread.length &&
                  <div className='flex mt-2 gap-2'>
                    {['probe', 'move on', 'suggest'].map((ele: any) => (
                      <button type='button' className='uppercase text-xs font-semibold leading-none px-3 py-1 bg-slate-600 rounded' key={ele}>{ele}</button>
                    ))}
                  </div>
                }
              </div>
            ))
          }
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

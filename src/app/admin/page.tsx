'use client'
import Image from 'next/image'
import cx from "classnames"
import { LineChart, Line } from 'recharts';
import { BsFillBrightnessHighFill } from "react-icons/bs"
import { LuTimer, LuLogOut } from "react-icons/lu"
import { TbMicrophone2 } from "react-icons/tb"
import { CgCommunity, CgAdd } from "react-icons/cg"
import { Fragment } from 'react';

const data = [
  {name: 'Page A', uv: 0, pv: 1400, amt: 1400},
  {name: 'Page B', uv: 500, pv: 1400, amt: 1400},
  {name: 'Page C', uv: 600, pv: 2400, amt: 2400}
];

export default function Page() {
  
  return (
    <main className="flex h-screen">
      <div className=''>
        <Header />
      </div>

      <div className='flex flex-col h-full'>
        <div className='p-4 h-full grid grid-cols-[2fr_1fr_1fr] gap-4'>
          <section className='w-full'>
            <h3>Chat</h3>
            <Conversation />
          </section>
          <section className='w-full'>
            <div className='mb-4'>
              <Insights />
            </div>
            <div className='mb-4'>
              <LiveAnalysis />
            </div>
            <div>
              <Personality />    
            </div>
          </section>
          <section className='w-full'>
            <div>
              <GPTAnalysis />
            </div>
          </section>
        </div>
        <div className=''>
          <InterviewTimeline timeline={timeline}/>
        </div>
      </div>
    </main>
  )
}

const Header = () => (
  <div className='p-1 flex flex-col justify-center items-center h-full border-r border-slate-600'>
    <div className='text-6xl'>
      <CgCommunity />
    </div>
    <div className='mt-auto'>
      <button className='text-xl p-4'><LuLogOut /></button>
    </div>
  </div>
)

const Personality = () => (
  <div className='bg-gray-700/30 backdrop-blur-sm rounded p-4'>
    <h3>Personality</h3>
    <div>
      <div>
        Interviewee Tone
      </div>
      <label>
        <div>
          Chat GPT Tone
        </div>
        <select>
          <option>Informal</option>
          <option>Optimistic</option>
          <option>Friendly</option>
          <option>Encouraging</option>
          <option>Cooperative</option>
        </select>
      </label>
    </div>
  </div>
)

const LiveAnalysis = () => (
  <div className='bg-gray-700/30 backdrop-blur-sm rounded p-4'>
    <h3>Live Analysis</h3>
    <div className='grid grid-cols-[1fr_2fr]'>
      <label className=''>Mood</label>
      <progress className='w-full' />
      <label className=''>Energy</label>
      <progress className='w-full'/>
      <label className=''>Confidence</label>
      <progress className='w-full'/>
      <label className=''>Relevancy</label>
      <progress className='w-full'/>
    </div>
  </div>
)

const Insights = () => (
  <div className='bg-gray-700/30 backdrop-blur-sm rounded p-4'>
    <h3>Insights</h3>
    <LineChart width={200} height={200} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#FFF" />
    </LineChart>
  </div>
)

const GPTAnalysis = () => (
  <div className='bg-gray-700/30 backdrop-blur-sm rounded p-4'>
    <h3 className='text-xl font-semibold mb-2'>GPT Analysis</h3>
    <div className='max-h-64 overflow-y-auto'>
      <QuestionAnswer />
      <hr className='bg-slate-700 h-px my-4 border-none'/>
      <QuestionAnswer />
      <hr className='bg-slate-700 h-px my-4 border-none'/>
      <QuestionAnswer />
      <hr className='bg-slate-700 h-px my-4 border-none'/>
      <QuestionAnswer />
    </div>
  </div>
)

const QuestionAnswer = () => (
  <div>
    <h6 className="flex gap-2 text-slate-300 font-semibold mb-1">
      <span className='w-4'>Q:</span>
      <span>{Question1}</span>
    </h6>
    <div className='flex gap-2 text-slate-400'>
      <span className='font-semibold w-4 inline-block'>A:</span>
      <p className="font-normal text-sm overflow-hidden text-ellipsis line-clamp-3 mb-2">{Answer1}</p>
    </div>
    <div className='flex justify-between'>
      {/* <button className='p-1 text-xs bg-blue-500 rounded-sm'>show more</button> */}
      <div className='flex gap-1'>
        <button title='Relevancy' className='p-1 rounded-full text-green-500'><BsFillBrightnessHighFill /></button>
        <button title="Time Taken" className='p-1 rounded-full text-blue-500'><LuTimer /></button>
        <button title="Tone" className='p-1 rounded-full text-red-500'><TbMicrophone2 /></button>
      </div>
    </div>
  </div>
)

const items = new Array(5).fill(0).map((item, idx) => item + idx)

const InterviewTimeline = ({timeline}: any) => (
  <div className='px-10 py-20'>
    <ol className="items-center sm:flex w-full justify-between">
      {timeline.map((item: any, idx: number) => (
        <Fragment key={item.id}>
          <li className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-blue-900 ring-8 ring-gray-900 shrink-0">
            <svg aria-hidden="true" className="w-3 h-3 text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
          </li>
          {idx !== timeline.length - 1 ? (
            <li className="w-full bg-gray-700 h-1 flex items-center group/item">
              <button type="button" title={item.title} className='mx-auto p-1 bg-blue-500 rounded-full invisible group-hover/item:visible group-hover/item:ease-in transition duration-150 ease-out'><CgAdd/></button>
            </li>
          ) : null}
        </Fragment>
      ))}
    </ol>
  </div>
)

const Question1 = "What makes you unique?"
const Answer1 = "I basically taught myself animation from scratch. I was immediately drawn to it in college, and with the limited resources available to me, I decided to take matters into my own hands—and that’s the approach I take in all aspects of my work as a video editor. I don’t just wait around for things to happen, and when I can, I’m always eager to step in and take on new projects, pick up new skills, or brainstorm new ideas."

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


const Conversation = () => {
  const chatThread = [
    {type: "RECEIVED", reciever: "John Doe", text: Answer1},
    {type: "SENT", sender: "Jane Dane", text: Question1},
  ]
  return (
    <div className='h-full'>
      <form className='flex flex-col h-full w-full max-w-lg mx-auto'>
        <div className='py-10 h-full flex flex-col-reverse w-full gap-10  overflow-y-scroll'>
          {
            chatThread.map((item: any, idx: number) => (
              <ChatThreadItem sent={item?.sender} key={idx} type={item.type}>{item.text}</ChatThreadItem>
            ))
          }
        </div>
        <div className='w-full flex'>
          <input className='w-full rounded-l text-black'/>
          <button type='submit' className='px-4 py-1.5 bg-blue-500 text-lg rounded-r uppercase font-medium'>send</button>
        </div>
      </form>
    </div>
  )
}

const ChatThreadItem = ({children, sent, type}: any) => (
  <div className={cx('max-w-[calc(100%-100px)] w-full break-words', sent ? 'ml-auto' : 'mr-auto')}>
    <div className={cx('text-black p-3 rounded-lg w-full', sent ? 'bg-green-200 ' : 'bg-white')}>
      {children}
    </div>
    {type === "RECEIVED" ? (
      <div className='flex mt-2 gap-2'>
        {['probe', 'move on', 'suggest'].map((item: any) => (
          <button type='button' className='uppercase text-xs font-semibold leading-none px-3 py-1 bg-slate-600 rounded' key={item}>{item}</button>
        ))}
      </div>
    ) : null}
  </div>
)

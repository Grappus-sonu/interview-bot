'use client'

import cx from "classnames"
import { useRouter } from "next/navigation";
import { useRef, useState } from 'react'
import { GoTrash } from 'react-icons/go'; 

export default function Page() {
  const router  = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [dialogData, setDialogData] = useState<{
    interviewId: string | number,
    clientId: string | number,
  } | null>(null)

  const onClickStartInterview =
    (interviewId: string, clientId:  string) =>
    (event: React.MouseEvent) => {
      dialogRef.current?.showModal()
      setDialogData({
        interviewId,
        clientId,            
      })
    }
  
  const onCloseDialog = () => {
    dialogRef.current?.close()
    setDialogData(null)
  }

  const onStartInterview = () => {
    router.push(`/admin/interview?interviewId=${dialogData?.interviewId}&clientId=${dialogData?.clientId}`)
    onCloseDialog()
  }
  
  return (
    <div className='w-full p-10'>
      <h3 className='text-4xl uppercase font-bold mb-10'>Interview</h3>
      <div className='h-full w-full grid grid-cols-[1fr_1fr_1fr] gap-4'>
        {InterviewList.map(interview => (
          <InterviewItem
            key={interview.id}
            onClickStartInterview={onClickStartInterview}
            {...interview} />
        ))}
      </div>
      <dialog ref={dialogRef} className='backdrop:bg-slate-500/70 rounded bg-slate-900 text-white p-6'>
        <header className='flex items-center justify-between mb-3'>
          <div className='text-2xl font-semibold'>Interview</div>
        </header>
        <div className=''>Do you want to start the interview?</div>
        <div className='mt-4 flex gap-4'>
          <button className='text-xs bg-blue-600 px-3 py-1 rounded' onClick={onStartInterview}>Yes</button>
          <button className='text-xs bg-red-600 px-3 py-1 rounded' onClick={onCloseDialog}>No</button>
        </div>
      </dialog>
    </div>
  )
}

const InterviewItem = ({ profile, name, time, duration, interviewId, clientId, onClickStartInterview }: any) => {
  return (
    <div className='bg-slate-900 text-white rounded p-3'>
      <header className='flex items-center justify-between mb-4'>
        <div className='text-2xl font-semibold'>{profile}</div>
        <button className='p-1 text-red-500 '>
          <GoTrash />
        </button>
      </header>
      <p className='text-slate-400 mb-3'></p>
      <ul className='mb-4'>
        <li className='flex gap-2 text-xs'>
          <div className='font-semibold text-slate-400'>Name:</div>
          <div>{name}</div>
        </li>
        <li className='flex gap-2 text-xs'>
          <div className='font-semibold text-slate-400'>Time:</div>
          <div>{time}</div>
        </li>
        <li className='flex gap-2 text-xs'>
          <div className='font-semibold text-slate-400'>Duration:</div>
          <div>{duration}</div>
        </li>
      </ul>
      <div className='flex gap-3'>
        <button className='text-xs bg-blue-600 px-3 py-1 rounded'>Candidate Profile</button>
        <button className='text-xs bg-green-600 px-3 py-1 rounded' onClick={onClickStartInterview(interviewId, clientId)}>Start Interview</button>
        <button className='text-xs bg-amber-600 px-3 py-1 rounded'>Reshedule</button>
      </div>
    </div>
  )
}

const InterviewList = [
  {
    id: 1,
    interviewId: "dd8a50e0-822e-47b3-a784-648265bad6d3",
    clientId: "9ebea1c3-05ca-4a9e-883f-194746c9777f",
    profile: 'Frontend Web Developer',
    name: 'John Doe',
    time: '31st March, 1:30 PM',
    duration: '45 mins',
  },
  {
    id: 2,
    interviewId: "dd8a50e0-822e-47b3-a784-648265bad6d3",
    clientId: "9ebea1c3-05ca-4a9e-883f-194746c9777f",
    profile: 'Backend Web Developer',
    name: 'John Doe',
    time: '31st March, 2:30 PM',
    duration: '30 mins',
  },
  {
    id: 3,
    interviewId: "dd8a50e0-822e-47b3-a784-648265bad6d3",
    clientId: "9ebea1c3-05ca-4a9e-883f-194746c9777f",
    profile: 'Software Engineer',
    name: 'Jane Doe',
    time: '31st March, 4:30 PM',
    duration: '1 hr',
  },
  {
    id: 4,
    interviewId: "dd8a50e0-822e-47b3-a784-648265bad6d3",
    clientId: "9ebea1c3-05ca-4a9e-883f-194746c9777f",
    profile: 'QA Engineer',
    name: 'Jane Doe',
    time: '31st March, 5:30 PM',
    duration: '1 hr',
  }
]
"use client"

import Image from 'next/image'
import cx from "classnames"
import { useState } from 'react'

const ChatThreadItem = ({children, sent}: any) => (
  <div className={cx('max-w-[calc(100%-100px)] w-full break-words', sent ? 'ml-auto' : 'mr-auto')}>
    <div className={cx('text-black p-3 rounded-lg w-full', sent ? 'bg-green-200 ' : 'bg-white')}>
      {children}
    </div>
  </div>
)

export default function Home() {
  const [chatThread, setChatThread] = useState<any>([]);
  const [value, setValue] = useState("");
  const [file, setFile] = useState("");

  const onChange = (event: any) => {
    setValue(event.target.value)
  }

  const onChangeFile = (event: any) => {
    setValue(event.target.value)
  }

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setValue("")
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "post",
      body: JSON.stringify({
        previousMessages: chatThread,
        text: value,
        sender: "Jane Dane"
      })
    });
    const json = await response.json();
    setChatThread(json);
  }

  return (
    <main className="h-screen p-24 flex flex-col items-stretch">
      <form className='flex flex-col h-full w-full max-w-lg mx-auto' onSubmit={onSubmit}>
        <div className='py-10 h-full flex flex-col-reverse w-full gap-10  overflow-y-scroll'>
          {
            chatThread.map((item: any, idx: number) => (
              <ChatThreadItem sent={item?.sender} key={idx}>{item.text}</ChatThreadItem>
            ))
          }
        </div>
        <div className='w-full flex'>
          <input className='w-full rounded-l text-black' onChange={onChange} value={value}/>
          <input type="file" className='rounded-l text-black' onChange={onChangeFile}/>
          <button type='submit' className='px-4 py-1.5 bg-blue-500 text-lg rounded-r uppercase font-medium'>send</button>
        </div>
      </form>
    </main>
  )
}

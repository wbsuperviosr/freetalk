import React from 'react'

export default function Navblock() {
  return (
    <div className='flex flex-row px-5 justify-between'>
      <div className='bg-gray-600 basis-5/12 rounded-lg px-5 py-5'>
        <ul className='list-disc list-inside text-white font-note font-bold text-sm'>
          <li>刑事时间线</li>
          <li>常见问题</li>
          <li>报警录音</li>
          <li>相关影音</li>
          <li>部分卷宗</li>
          <li>其它资料</li>
        </ul>
      </div>

      <div className='bg-gray-600 basis-5/12 rounded-lg px-5 py-5'>
        <ul className='list-disc list-inside text-white font-note font-bold text-sm'>
          <li>民事时间线</li>
          <li>常见问题</li>
          <li>有关人物</li>
          <li>有关善款</li>
          <li>有关舆论</li>
          <li>有关公器</li>
        </ul>
      </div>

    </div>
  )
}

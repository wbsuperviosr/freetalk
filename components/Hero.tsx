

import React from 'react'


function Hero() {
    return (
        <div className='container flex max-w-6xl mx-auto  border-y'>

            <div id='hero_text' className='flex flex-col justify-between'>
                <blockquote className='font-noto text-md text-center px-5 text-gray-700 pt-3 md:text-5xl md:pt-10'>
                    「所有的事情有因必有果。
                </blockquote>

                <blockquote className='font-noto text-md text-center px-5 text-gray-700 md:text-5xl md:pt-10'>
                    大家只看到了结果，且结果只是一面之词。」
                </blockquote>

                <p className='text-center text-gray-500 text-xs text-noto font-bold pt-1 tracking-widest'>---2017年8月30日</p>

                <p className='text-lg mb-2 text-center pt-3 px-3 font-noto font-bold text-gray-900 md:text-xl tracking-normal'>
                    我们尽可能保存每一个声音，每一个细节。历史的任何一粒尘埃，都不应该被遗忘。
                </p>

            </div>
        </div>
    )
}


export default Hero
import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import categories from "../categories.json"
import Header from "./Header"

categories.forEach(category => {
    return category.subcategory.sort((a, b) => {
        if (a.order == null) {
            return -1
        } else if (b.order == null) {
            return 1
        } else if (a.order == null && b.order == null) {
            return 0
        } else {
            return a.order - b.order
        }
    })
});


function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='max-w-3xl mx-auto'>
            <Head>
                <title>Express</title>
                <link rel="icon" href="/coca-leaves.png" />
            </Head>

            <Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js" strategy='beforeInteractive'></Script>
            <Script src="https://unpkg.com/flowbite@1.5.4/dist/flowbite.js"></Script>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-R3Q4QCQ774"></Script>
            <Script
                id='google-analytics'
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-R3Q4QCQ774', {
                page_path: window.location.pathname,
                });
                `,
                }}
            />
            <Header categories={categories} />
            <main>{children}</main>
        </div>
    )
}

export default Layout
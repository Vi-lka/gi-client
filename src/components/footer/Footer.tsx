import React from 'react'

export const revalidate = 3600;

export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer className="bg-background lg:pt-36 pt-32 pb-8">
            <div className="container md:w-5/6 mx-auto">

            </div>
            <div className="container md:w-5/6 mx-auto mt-16">
                <p className="text-sm font-medium text-muted">
                    © {year} Гуманитарный институт. Сибирский федеральный университет. Все права защищены.
                </p>
            </div>
        </footer>
    )
}

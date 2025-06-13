//footer of main page
import React from 'react'
import Link from 'next/link'
import { PiGlobeSimpleFill } from "react-icons/pi";
type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className="bg-background py-12 px-4 sm:px-6 lg:px-8 border-t mt-20 border-gray-200">
            
            <div className="max-w-7xl mx-auto ">
                <div className="flex gap-2">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center">
                        <PiGlobeSimpleFill className="h-6 w-6"/>
                            <span className="ml-2 text-xl font-bold text-primary">Tour Craft</span>
                        </div>
                        <p className="mt-2 text-sm text-ring w-[80%]">
                            Turn your social media content creation into a hassle-free experience with Tour Craft.
                        </p>
                    </div>
                    <div className='flex gap-20'>

                    <div>
                        <h3 className="text-sm font-semibold text-primarytracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/terms" className="text-base text-ring">
                                    Terms and Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-base text-ring">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/contact" className="text-base text-ring">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-primary tracking-wider uppercase">Features</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/templates" className="text-base text-ring">
                                    Design Templates
                                </Link>
                            </li>
                            <li>
                                <Link href="/ai-tools" className="text-base text-ring">
                                    AI Tools
                                </Link>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">
                        &copy; 2023 Tour Craft. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
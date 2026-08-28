import React from 'react'
import { nepshow } from '../../images'

function Footer() {
    return (
        <>
            <footer className="w-full">
                <div className="container mx-auto p-0 md:p-8 xl:px-0">
                    <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">
                        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                            <div className="space-y-4">
                                <div>
                                    <a href="/">
                                        <div className="flex items-center space-x-2 text-xl font-medium">
                                            <span>
                                                <img src={nepshow} alt="AI Logo"
                                                    className="w-20" />
                                            </span>
                                            <span className="text-white">& NIME</span>
                                        </div>

                                    </a>
                                </div>
                                <div className="max-w-md pr-16 text-md text-gray-200">Enhance productivity and
                                    market of National and International Movies and Entertainment by serving users with best experience.
                                </div>
                                <div className="flex space-x-2">
                                    <a href="" target="_blank" className="text-gray-200 hover:text-gray-200">
                                        <span className="sr-only">Linkedin</span><svg fill="currentColor" viewBox="0 0 24 24"
                                            className="h-6 w-6" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </a>
                                    <a href="" target="_blank" className="text-gray-200 hover:text-gray-200">
                                        <span className="sr-only">Twitter</span><svg fill="currentColor" viewBox="0 0 24 24"
                                            className="h-6 w-6" aria-hidden="true">
                                            <path
                                                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                                            </path>
                                        </svg>
                                    </a>
                                    <a href="" target="_blank" className="text-gray-200 hover:text-gray-200">
                                        <span className="sr-only">Telegram</span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-6"
                                        >
                                            <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                                        </svg>

                                    </a>
                                    <a href="" target="_blank" className="text-gray-200 hover:text-gray-200">
                                        <span className="sr-only">Instagram</span> <svg
                                            fill="currentColor"
                                            viewBox="0 0 16 16" className="h-6"
                                        >
                                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 00-1.417.923A3.927 3.927 0 00.42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 001.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 00-.923-1.417A3.911 3.911 0 0013.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 01-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 01-.92-.598 2.48 2.48 0 01-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 100 1.92.96.96 0 000-1.92zm-4.27 1.122a4.109 4.109 0 100 8.217 4.109 4.109 0 000-8.217zm0 1.441a2.667 2.667 0 110 5.334 2.667 2.667 0 010-5.334z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                                <div className="md:grid md:grid-cols-2 md:gap-8">
                                    <div>
                                        <h3 className="text-md font-semibold leading-6 text-white">Our Solutions</h3>
                                        <ul role="list" className="mt-6 space-y-4">
                                            <li>
                                                <a href="/aiplatform"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">AI Platform
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/aialgorithms"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">AI Algorithms
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/industryapplications"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">Industry
                                                    Applications
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-10 md:mt-0">
                                        <h3 className="text-md font-semibold leading-6 text-white">Use Cases</h3>
                                        <ul role="list" className="mt-6 space-y-4">
                                            <li>
                                                <a href="/predictiveanalysis"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">Predictive
                                                    Analysis
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/customerexperience"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">Customer
                                                    Experience
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/automation"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">Automation
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="md:grid md:grid-cols-2 md:gap-8">
                                    <div>
                                        <h3 className="text-md font-semibold leading-6 text-white">Resources</h3>
                                        <ul role="list" className="mt-6 space-y-4">
                                            <li>
                                                <a href="/pricing"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">Pricing
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/blog" className="text-md leading-6 text-gray-300 hover:text-gray-50">Blog
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/casestudies"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">Case Studies
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/terms" className="text-md leading-6 text-gray-300 hover:text-gray-50">Terms
                                                    of Service
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/privacy"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">Privacy Policy
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-10 md:mt-0">
                                        <h3 className="text-md font-semibold leading-6 text-white">Company</h3>
                                        <ul role="list" className="mt-6 space-y-4">
                                            <li>
                                                <a href="/aboutus"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">About Us
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/careers"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">Careers
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/contactus"
                                                    className="text-md leading-6 text-gray-300 hover:text-gray-50">Contact Us
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 border-t border-gray-400/30 pt-8 sm:mt-20 lg:mt-24">
                            <div className="text-md text-center text-white">
                                Copyright © 2025 . Entertainment Production
                                <span className="text-gray-50">♥</span>Online Movies at
                                <a rel="noopener" href="/"> NepSHOW.
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer

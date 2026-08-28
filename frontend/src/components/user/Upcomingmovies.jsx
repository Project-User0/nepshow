import pic1 from '../../images/pic1.jpeg'
import pic2 from '../../images/pic2.jpeg'
import pic3 from '../../images/pic3.jpeg'
import pic4 from '../../images/pic4.jpeg'
import pic5 from '../../images/pic5.jpeg'
import pic6 from '../../images/pic6.jpeg'
import pic7 from '../../images/pic7.jpeg'
import pic8 from '../../images/pic8.jpeg'
import pic9 from '../../images/pic9.jpeg'
import pic10 from '../../images/pic10.jpeg'
import pic11 from '../../images/pic11.jpeg'
import pic12 from '../../images/pic12.jpeg'
import pic13 from '../../images/pic13.jpeg'
import pic14 from '../../images/pic14.jpeg'
import pic15 from '../../images/pic15.jpeg'
import pic16 from '../../images/pic16.jpeg'
import pic17 from '../../images/pic17.jpeg'
import pic18 from '../../images/pic18.jpeg'
import pic19 from '../../images/pic19.jpeg'
import pic20 from '../../images/pic20.jpeg'

function Upcominglist() {
    return (
        <>
            <div id="Movielist">
                <div className="flex py-4 xl:mx-0 mx-16">
                    <p className="text-white xl:text-[24px] lg:text-[20px] md:text[16px]">UPCOMING MOVIES....</p>
                </div>
                <section className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-colss-1 justify-items-center justify-center gap-y-20 gap-x-4 mt-[16px] mb-5">

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic1}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Baghasala</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Baghasala</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic2}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Mansarra</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic3}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Chhadke</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic4}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Jaari</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic5}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Kalo Pothi</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic6}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Lily Bily</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic7}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Kathaputali</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic8}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Changa Chait</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic9}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Rangeli</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic10}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Hostel</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic11}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Sanghuro</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic12}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Pujar Sarki</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic13}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Vhor</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic14}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Baghsala</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic15}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Ritu</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic16}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Jaalo</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic17}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Ghar Jywai</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic18}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Classic</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic19}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Radhe</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[220px] relative">
                        <a href="/mdetails" className="group block">
                            <img
                                src={pic20}
                                alt="Product" className="h-[320px] w-[220px] overflow-hidden rounded transition duration-100 ease-in-out"
                            />
                            <div className="py-4 px-auto absolute inset-0 h-[320px] w-[220px] rounded bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="h-full w-full p-2 bg-transparent">
                                    <h2 className="text-xl font-bold bg-transparent">Movie Name</h2>
                                    <div className="bg-transparent py-2 flex text-[16px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="size-4 my-1 mr-1 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg> N/A
                                        <div className="h-6 w-8 items-center text-center text-sm justify-center flex rounded-l-md ml-6 bg-gray-600 text-white">
                                            HD</div>
                                        <div className="h-6 w-8 flex items-center justify-center text-center rounded-r-md mr-4 bg-green-300 text-black text-[12px] ml-[2px]">
                                            CC 1</div>
                                            <div className="h-6 w-10 flex items-center justify-center rounded-md text-sm text-black bg-fuchsia-300">TV</div>
                                    </div>
                                    <p className="text-[14px] bg-transparent">Des:  </p>
                                    <p className="text-[14px] bg-transparent">Language: </p>
                                    <p className="text-[14px] bg-transparent">Synonyms: </p>
                                    <p className="text-[14px] bg-transparent">Aired: </p>
                                    <p className="text-[14px] bg-transparent">Status: </p>
                                    <p className="text-[14px] bg-transparent">Genres: </p>
                                    <a href="/login" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-[8px] px-[30px] rounded-[25px] my-4 mx-2 flex">
                                        Watch Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6 bg-transparent">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </a>
                        <div className="px-4 py-3 w-[220px]">
                            <p className="text-lg font-semibold text-white truncate block capitalize bg-transparent"><a href="/mdetails">Ghayal</a></p>
                            <div className="bg-transparent">
                                <p className="text-md text-gray-100 bg-transparent py-2">Genre</p>
                                <p className="text-sm text-gray-400 bg-transparent">Dur . 100m</p>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

        </>
    )
}

export default Upcominglist

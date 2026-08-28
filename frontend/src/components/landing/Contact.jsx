import { useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_rsqg6s4', 'template_ws7j7l2', form.current, {
                publicKey: 'Ji7TyTXEKJXLLaaV2',
            })
            .then(
                () => {
                    alert("Your mail has been sent to the admin.");
                    window.location.reload();
                },
                (error) => {
                    console.log('Message was not sent', error.text);
                },
            );
    };

    return (
        <>
            <section id="contact" className="body-font relative text-gray-400 z-5">

                <div className="container mx-auto px-5 pt-10 pb-4">

                    <div className="mb-12 flex w-full flex-col text-center">
                        <h1 className="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">Contact Us</h1>
                        <p className="mx-auto text-base leading-relaxed lg:w-2/3">Feel free to reach out to us! Whether you have a question,
                            feedback, or a collaboration proposal, we&apos;d love to hear from you.
                        </p>
                    </div>

                    <div className="mx-auto md:w-2/3 lg:w-1/2">

                        <form ref={form} className="-m-2 flex flex-wrap" onSubmit={sendEmail}>
                            <div className="flex">
                                <div className="w-1/2 p-2">
                                    <div className="relative">
                                        <input type="text" id="name" name="user_name" className="bg-transparent peer w-full rounded border border-gray-700 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900" placeholder="User name" />
                                        <label htmlFor="name" className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Name</label>
                                    </div>
                                </div>
                                <div className="w-1/2 p-2">
                                    <div className="relative">
                                        <input type="email" id="email" name="user_email" className="bg-transparent peer w-full rounded border border-gray-700 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900" placeholder="Email" />
                                        <label htmlFor="email" className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Email</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 w-full p-2">
                                <div className="relative">
                                    <textarea id="message" name="message" className="bg-transparent peer h-32 w-full resize-none rounded border border-gray-700 py-1 px-3 text-base leading-6 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900" placeholder="Message"></textarea>
                                    <label htmlFor="message" className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Message</label>
                                </div>
                            </div>
                            <div className="w-full p-2">
                                <button type="submit" className="mx-auto flex rounded border-0 bg-indigo-700 py-[6px] px-[18px] text-lg text-white hover:cursor-pointer hover:bg-indigo-800 focus:outline-none">Submit</button>
                            </div>
                        </form>
                    </div>

                </div>

            </section>
        </>
    )
}

export default Contact

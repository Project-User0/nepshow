import React from 'react';

function Checkoutform() {
    return (
        <>
            <div className="bg-transparent w-full my-10">
                <div className="w-full max-w-3xl mx-auto py-8">
                    <div className="bg-[#272626c8] p-8 rounded-lg shadow-md border dark:border-gray-700">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Payment Checkout</h1>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Accoult Holder</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-gray-700 dark:text-white mb-1">First Name</label>
                                    <input type="text" id="first_name" className="w-full rounded border py-2 px-3 bg-transparent dark:text-white outline-none" />
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block text-gray-700 dark:text-white mb-1">Last Name</label>
                                    <input type="text" id="lastname" className="w-full rounded border py-2 px-3 bg-transparent dark:text-white outline-none" />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="address" className="block text-gray-700 dark:text-white mb-1">Address</label>
                                <input type="text" id="address" className="w-full rounded border py-2 px-3 bg-transparent dark:text-white outline-none" />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="city" className="block text-gray-700 dark:text-white mb-1">City</label>
                                <input type="text" id="city" className="w-full rounded border py-2 px-3 bg-transparent dark:text-white outline-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="state" className="block text-gray-700 dark:text-white mb-1">State</label>
                                    <input type="text" id="state" className="w-full rounded border py-2 px-3 bg-transparent dark:text-white outline-none" />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-gray-700 dark:text-white mb-1">ZIP Code</label>
                                    <input type="text" id="zip" className="w-full rounded border py-2 px-3 bg-transparent dark:text-white outline-none" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Payment Information</h2>
                            <div className="mt-4">
                                <label htmlFor="card_number" className="block text-gray-700 dark:text-white mb-1">Card Number</label>
                                <input type="text" id="card_number" className="w-full rounded border py-2 px-3 bg-transparent dark:text-white outline-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="exp_date" className="block text-gray-700 dark:text-white mb-1">Expiration Date</label>
                                    <input type="text" id="exp_date" className="w-full rounded border py-2 px-3 bg-transparent dark:text-white outline-none" />
                                </div>
                                <div>
                                    <label htmlFor="cvv" className="block text-gray-700 dark:text-white mb-1">CVV</label>
                                    <input type="text" id="cvv" className="w-full rounded-md border py-2 px-3 bg-transparent dark:text-white outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="bg-teal-500 text-white px-4 py-2 rounded-[4px] hover:bg-teal-700 dark:bg-green-600 dark:text-white dark:hover:bg-green-900">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkoutform;

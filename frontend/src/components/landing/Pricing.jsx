function Pricing() {
  const features = [
    "Unlimited streaming of premium Nepali movies and TV shows",
    "Watch in HD and Full HD quality",
    "Exclusive Nepshow Originals and early releases",
    "No advertisements during playback",
    "Watch on Mobile, Tablet, Laptop & Smart TV",
    "Create your Watchlist and Continue Watching",
    "New movies added regularly",
    "Priority customer support",
  ];

  return (
    <section id="pricing" className="px-6 md:px-10 lg:px-20 py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl lg:flex">
        {/* Left Section */}
        <div className="lg:w-2/3 p-8 md:p-12">
          <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-5">
            PREMIUM MEMBERSHIP
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Start Your Plan
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            Unlock unlimited entertainment with a Nepshow Premium subscription.
            Stream the latest Nepali movies, TV shows, documentaries and
            exclusive originals anytime, anywhere without interruptions.
          </p>

          <div className="mt-10 flex items-center">
            <h4 className="text-red-500 uppercase font-semibold tracking-widest text-sm pr-4">
              What&apos;s Included
            </h4>

            <div className="flex-1 border-t border-neutral-700"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1">
                  <svg
                    className="h-6 w-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <p className="text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}

        <div className="lg:w-1/3 bg-gradient-to-b from-red-700 to-red-900 flex flex-col justify-center items-center p-10">
          <span className="text-white text-sm uppercase tracking-widest">
            Most Popular
          </span>

          <h3 className="text-white text-3xl font-bold mt-5">Premium Plan</h3>

          <p className="text-red-100 text-center mt-4 leading-7">
            Unlimited access to every premium movie and TV show on Nepshow.
          </p>

          <div className="mt-8 flex items-end">
            <span className="text-6xl font-extrabold text-white">Rs.250</span>

            <span className="text-red-100 ml-2 mb-2">/month</span>
          </div>

          <p className="mt-5 text-center text-red-100">
            Cancel anytime <br />
            No hidden charges <br />
            Instant access after payment
          </p>

          <a
            className="mt-10 w-full bg-white text-red-700 hover:bg-gray-200 transition-all duration-300 font-bold py-4 rounded-xl"
            href="/login"
          >
            <button className="w-full">Get Started</button>
          </a>

          <p className="mt-4 text-sm text-red-100">
            Secure payment powered by eSewa & Khalti
          </p>
        </div>
      </div>

      {/* Bottom Features */}

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <div className="text-5xl mb-5">🎬</div>

          <h3 className="text-white text-xl font-semibold">
            Unlimited Streaming
          </h3>

          <p className="text-gray-400 mt-3">
            Watch unlimited Nepali movies, TV shows, documentaries and exclusive
            originals anytime.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <div className="text-5xl mb-5">📺</div>

          <h3 className="text-white text-xl font-semibold">HD Quality</h3>

          <p className="text-gray-400 mt-3">
            Experience crystal-clear streaming with HD and Full HD playback on
            supported devices.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <div className="text-5xl mb-5">📱</div>

          <h3 className="text-white text-xl font-semibold">Watch Anywhere</h3>

          <p className="text-gray-400 mt-3">
            Stream seamlessly on your phone, tablet, laptop or smart TV with a
            single subscription.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

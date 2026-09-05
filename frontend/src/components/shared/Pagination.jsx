function Pagination({ paginationData, onPageChange }) {
  if (!paginationData || paginationData.totalPages <= 1) return null;

  const { page, hasNextPage, hasPrevPage, totalPages } = paginationData;

  return (
    <nav 
      className="w-full mt-8 md:mt-12 px-4 pb-12 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20" 
      aria-label="Page Navigation"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Navigation Actions Wrapper */}
        <div className="flex w-full items-center justify-between sm:justify-start sm:gap-6">
          
          {/* Previous Button */}
          <button
            onClick={() => hasPrevPage && onPageChange(page - 1)}
            disabled={!hasPrevPage}
            className={`inline-flex items-center rounded-xl border border-neutral-700 px-4 py-2.5 text-xs sm:text-sm font-medium transition select-none ${
              hasPrevPage
                ? "text-gray-400 hover:bg-gray-200 hover:text-black active:scale-95 cursor-pointer"
                : "text-neutral-600 border-neutral-800 cursor-not-allowed opacity-40"
            }`}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
            </svg>
            <span className="ml-2 md:block hidden">Previous</span>
          </button>

          {/* Mobile Display Counter (visible only on xs/small views) */}
          <span className="text-xs font-semibold text-neutral-400 sm:hidden bg-neutral-900/60 px-3 py-1.5 rounded-lg border border-neutral-800">
            {page} / {totalPages}
          </span>

          {/* Next Button */}
          <button
            onClick={() => hasNextPage && onPageChange(page + 1)}
            disabled={!hasNextPage}
            className={`inline-flex items-center rounded-xl border border-neutral-700 px-4 py-2.5 text-xs sm:text-sm font-medium transition select-none ${
              hasNextPage
                ? "text-gray-400 hover:bg-gray-200 hover:text-black active:scale-95 cursor-pointer"
                : "text-neutral-600 border-neutral-800 cursor-not-allowed opacity-40"
            }`}
          >
            <span className="mr-2 md:block hidden">Next Page</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
            </svg>
          </button>

        </div>

        <div className="hidden sm:block text-sm text-neutral-400 font-medium whitespace-nowrap px-4 py-2 rounded-xl border border-neutral-800/50">
          Showing page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
        </div>

      </div>
    </nav>
  );
}

export default Pagination;
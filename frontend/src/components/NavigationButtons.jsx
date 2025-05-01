import React from 'react';

function NavigationButtons({ onNext, onPrev, isDisabled }) {
  return (
    <>
      <button
        onClick={onPrev}
        disabled={isDisabled}
        className={`text-white absolute top-1/2 left-5 z-50 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${isDisabled ? '' : 'hover:bg-white/20'} bg-white/30`}>
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button onClick={onNext} className="text-white absolute top-1/2 right-5 z-10 cursor-pointer">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 bg-white/30">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </>
  );
}

export default NavigationButtons;

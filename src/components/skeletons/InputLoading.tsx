import React from 'react'

export default function InputLoading() {
  return (
<div className="p-6 pt-20">
  <h2 className="text-2xl mb-4">
    <div className="animate-pulse bg-gray-300 h-8 w-64 rounded"></div>
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {Array.from({ length: 7 }).map((_, index) => (
      <div key={index} className="space-y-3">
        <div className="animate-pulse bg-gray-300 h-6 w-40 rounded"></div>
        <div className="animate-pulse bg-gray-300 h-12 w-full rounded"></div>
      </div>
    ))}
  </div>
  <div className="mt-6">
    <div className="animate-pulse bg-gray-300 h-12 w-40 rounded"></div>
  </div>
</div>
  )
}

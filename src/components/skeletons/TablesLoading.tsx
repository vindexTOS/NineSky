import React from 'react';

export default function TablesLoading() {
  return (
    <div className="w-full h-full mt-40 md:ml-0 ml-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-[1.5rem] text-gray-400 animate-pulse">ტრანზაქციები</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="skeleton w-32 h-4  animate-pulse bg-gray-300 rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="skeleton w-20 h-4  animate-pulse bg-gray-300 rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="skeleton w-24 h-4 animate-pulse bg-gray-300 rounded" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-6 animate-pulse  py-4 whitespace-nowrap">
                    <div className="skeleton w-full h-6 bg-gray-300 rounded" />
                  </td>
                  <td className="px-6 animate-pulse py-4 whitespace-nowrap">
                    <div className="skeleton  animate-pulse w-32 h-6 bg-gray-300 rounded" />
                  </td>
                  <td className="px-6 py-4  animate-pulse whitespace-nowrap">
                    <div className="skeleton animate-pulse w-24 h-6 bg-gray-300 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client"
import React from 'react'

const tempClassesList = ['Databases', 'Chemistry', 'Biology'];
export default function UploadClassMaterials() {
  const [selectedClass, setSelectedClass] = React.useState(tempClassesList[0]);
  const [description, setDescription] = React.useState('');
  const [uploadIsFile, setUploadIsFile] = React.useState(true);

  const handleResetUpload = () => {
    setSelectedClass(tempClassesList[0]);
    setDescription('');
  }
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h1 className="text-3xl font-bold text-blue-900">RESOURCE CENTRAL</h1>

      <p className="mt-4 text-sm text-gray-600">
        Please adhere to the code of academic integrity when sharing materials. Any violations, such as posting copyrighted materials or inappropriate content, may result in disciplinary action.
      </p>

      <div className="mt-6 bg-gray-50 rounded-md p-4 border border-gray-100">
        <form>
          <h3 className="font-bold text-blue-900 text-lg mb-2">Upload Class Materials</h3>
          <p className="text-sm text-gray-500 mb-4">Share your notes or useful links with your classmates</p>

          <div className="inline-flex rounded-md shadow-sm mb-4" role="tablist">
            <button
              type="button"
              onClick={() => setUploadIsFile(true)}
              className={`px-4 py-2 rounded-l-md border ${uploadIsFile ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-700 border-gray-200'}`}
            >File</button>
            <button
              type="button"
              onClick={() => setUploadIsFile(false)}
              className={`px-4 py-2 rounded-r-md border ${!uploadIsFile ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-700 border-gray-200'}`}
            >Link</button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select a class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {tempClassesList.map((className) => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder='Enter your description here...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="mb-4">
            {uploadIsFile
              ? (
                <label className="flex items-center gap-2">
                  <input type="file" className="hidden" />
                  <span className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 cursor-pointer">Choose file</span>
                </label>
              ) : (
                <input className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm' type="url" placeholder='Enter your link here...' />
              )}
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-semibold" type="submit">Upload</button>
            <button className="px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-700" type="button" onClick={handleResetUpload}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}

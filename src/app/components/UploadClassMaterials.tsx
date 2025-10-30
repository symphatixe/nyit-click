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
    <div className="">
      {/*Left side*/}
      <div className="">
        <h1 className="text-4xl font-bold text-[var(--color-primary)]">
          RESOURCE CENTRAL
        </h1>

        <p className="mt-4 text-sm bg-pink-100 text-red-700 font-semibold m-6">
          Please adhere to the code of academic integrity when sharing materials.<br />Any violations, such as posting copyright materials (i.e. textbooks, paywalled articles) or materials professors do not want you to see yet (i.e. future exams) may result in disciplinary action. Any inappropriate materials will be removed and that account will be banned.
        </p>

        <div className="border-2 border-[var(--color-primary)] rounded-lg p-4 bg-[#ececec6c] padding-5">
          <form>
            <h3 className="font-bold text-[var(--color-primary)] text-lg mb-2 ">
              Upload Class Materials
            </h3>
            <small className="text-sm text-gray-500 font-semibold">Share your notes or useful links with your classmates</small>
            <br />

            <div>
              <button type="button" className={`border-1 rounded-l-lg p-2 ${uploadIsFile ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-primary)]'}`} onClick={() => setUploadIsFile(true)}>File</button>
              <button type="button" className={`border-1 rounded-r-lg p-2 ${!uploadIsFile ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-primary)]'}`} onClick={() => setUploadIsFile(false)}>Link</button>
            </div>

            <h4 className="font-semibold text-[var(--color-primary)] mt-4">
              Select a class:
            </h4>
            {/*TODO: change test classes, change these later (obviously). we should read these from user and let them select from what they have taken/are taking? or do we check for all possible classes (in case someone wants to study ahead?)*/ }
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {tempClassesList.map((className) => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>

            <h4 className="font-semibold text-[var(--color-primary)] mt-4">
              Description:
            </h4>
            <textarea 
              className='rounded-b-sm mt-4 ml-4 md-4 p-2 border-2 border-[var(--color-primary)]' placeholder='Enter your description here...' 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
            />

            <br />
            <br />
            
            {uploadIsFile 
              ? <input className='hover:cursor-pointer' type="file" />
              : <input className='hover:cursor-pointer' type="url" placeholder='Enter your link here...' />
            }


            <button className={`hover:cursor-pointer ml-4 m-4`} type="button" onClick={handleResetUpload}>Reset</button>
            <button className={`hover:cursor-pointer m-4`} type="submit">Upload</button>
          </form>
        </div>
      </div>
    </div>
  )
}

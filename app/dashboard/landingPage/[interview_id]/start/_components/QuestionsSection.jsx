import { Lightbulb } from 'lucide-react'
import React, { useState } from 'react'


export default function QuestionsSection({ activeQuestionIndex,MockInterviewQuestion}) {
  // console.log("mock interview question : ", MockInterviewQuestion);
  
  return  MockInterviewQuestion &&(
    <div className='p-5 border rounded-lg my-10'>
      
      <div  className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {MockInterviewQuestion && MockInterviewQuestion.map((question,index)=>{
          return (
            <div key={index}>
              <h2 className={`p-2 rounded-full text-xs md:text-sm text-center mb-2 border 
                cursor-pointer ${activeQuestionIndex == index && 'bg-primary text-white'}`}>
                Question #{index+1}
              </h2>
            
            </div>
          )
        })}

      </div>

      <h2 className='my-5 text-md md:text-lg'> {MockInterviewQuestion[activeQuestionIndex]?.question}</h2>
      <div className='border rounded-lg p-5 bg-blue-100'>
        <h2 className='flex gap-2 items-center text-primary'>
          <Lightbulb/>
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
      </div>
      
    </div>

      

  )
}

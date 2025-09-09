import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function InterviewItemCard({interview}) {
  const router = useRouter();

  const onsStart=()=>{
    router.push('/dashboard/landingPage/'+interview?.mockId+'/start')
  } 

   const onsFeedback=()=>{
    router.push('/dashboard/landingPage/'+interview?.mockId+'/feedback')
  }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-blue-500'>{interview.jobPosition} </h2>
      <h2 className='text-sm text-gray-600'>{interview.jobExperience} Year of Experience</h2>
      <h2 className='text-xs text-gray-400'>Created At : {interview.createdAt}</h2>
    
      <div className='flex justify-between mt-2'>
        
        <Button size={'sm'} variant={'outline'} 
        onClick={onsFeedback}
        >Feedback</Button>
        <Button size='sm' 
          onClick={onsStart}
        >Start</Button>
      </div>
    </div>
  )
}

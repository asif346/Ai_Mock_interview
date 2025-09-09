"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import  useSpeechToText  from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { GenerateFeedback } from '@/utils/feedbackClient'
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { UserAnswer } from '@/utils/schema'

export default function RecordAnswerSection({activeQuestionIndex,MockInterviewQuestion, interviewData}) {
  const [userAnswer, setuserAnswer] = useState('');
  const {user} = useUser();
  const [Loading, setLoading] = useState(false);

    const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
    results.map((result)=>(
      setuserAnswer(prevAns => prevAns + (prevAns ? ' ' : '') + result?.transcript)
    ))
  },[results])

  useEffect(()=>{
    if(!isRecording && userAnswer.length>10)
    {
      UpdateUserAnswer();
    }
    

  },[userAnswer])   

  const StartStopRecording = async()=>{
    if(isRecording)
    {
      stopSpeechToText();
      
    }
    else
    {
      startSpeechToText();
    }

  }  

  const UpdateUserAnswer=async()=>{

    try{
      setLoading(true);
      const JsonFeedbackResp = await GenerateFeedback(
        MockInterviewQuestion,
        userAnswer,
        activeQuestionIndex
      )

      const resp = await db.insert(UserAnswer)
      .values({
        mockIdRef:interviewData?.mockId,
        question:MockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns:MockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-YYYY')

      })
      console.log('User Answer is : ', userAnswer)
      if(resp)
      {
        toast("User Answer recorded successfully")
    
      }
      setuserAnswer('');
      
    } finally{
      setLoading(false);
    }
    
  }


  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='relative flex flex-col mt-20 mb-8 justify-center items-center bg-primary rounded-lg p-5'>
        <Image src={'/window.svg'} alt='web cam image' width={200} height={200}
        className='absolute'/>
        <Webcam
        mirrored={true}
        style={{
            height:300,
            width:'100%',
            zIndex:10,
        }}/>
        
      </div>


      <Button
      disabled={Loading}
        variant={'outline'} onClick={StartStopRecording}>
      {isRecording?
        <h2 className='text-red-600 flex gap-2 items-center'>
          <Mic/> Stop Recording
        </h2>
        :
      'Record Answer'}</Button>
      
       
    </div>
  )
}

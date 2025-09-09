"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Link from 'next/link';

function LandingPage({params}){

  const [interviewData , setinterviewData] = useState([]);
  const [webCamEnabled, setWebCamEnabled] = useState();
  
  // Unwrap the params Promise using React.use()
  const unwrappedParams = React.use(params);
  
  useEffect(()=>{
    console.log("MockId is : "+ unwrappedParams.interview_id);
    GetInterviewDetails();

  },[]);

  //  used to get interview details by mockid/interview id
  const GetInterviewDetails = async() =>{
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, unwrappedParams.interview_id));

        console.log(result);

      if (result.length > 0) {
        setinterviewData(result[0]);
      } 

      else {
        console.error('No interview found with mockId:', unwrappedParams.interview_id);
        setinterviewData({});
      }
    } 
    
    catch (error) {
      console.error('Error fetching interview details:', error);
      setinterviewData({});
    }
  }

  return (
    <div className='my-10'>
      <h2 className='font-bold text-2xl text-center mb-8'> Let's Get Started</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-10'>

        {/* {information} */}
        <div className='flex flex-col my-5 gap-5'>
          <div className='flex flex-col p-5 rounded-lg border-2 gap-5'>
            <h2 className='text-lg '><strong>Job Role/Job Position : </strong>{interviewData.jobPosition}</h2>
            <h2 className='text-lg '><strong>Job Decription/Teck Stack : </strong>{interviewData.jobDescription}</h2>
            <h2 className='text-lg '><strong>Years of Experience : </strong>{interviewData.jobExperience}</h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-50'>
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
            <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>

          </div>
        </div>

        {/* web cam */}
        <div>

          {webCamEnabled?
          <Webcam 
              onUserMedia={()=>setWebCamEnabled(true)}
              onUserMediaError={()=>setWebCamEnabled(false)}
              mirrored={true}
              style ={{
                height : 300,
                width : 300
              }}
            />
            :

            <>
              <WebcamIcon className='h-72 w-full p-20 my-7 bg-secondary'></WebcamIcon>
              <Button  className={"w-full hover:cursor-pointer"} onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
            </>
          }

        </div>

        

      </div>

      <div className='flex justify-end items-end'>
        <Link href={'/dashboard/landingPage/'+unwrappedParams.interview_id+'/start'}>
          <Button>Start Interview</Button>
        </Link>
      </div>

       
    </div>

  )
}

export default LandingPage;


"use client"

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QustionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StartInterview({params}) {

   // Unwrap the params Promise using React.use()
     const unwrappedParams = React.use(params);

    const [interviewData, setinterviewData]  = useState();
    const [MockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setactiveQuestionIndex] = useState(0);
    useEffect(()=>{
        GetInterviewDetails();
    }, []);

   

    const GetInterviewDetails = async() =>{
     
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, unwrappedParams.interview_id));

        const jsonMockResp = JSON.parse(result[0].jsonMocResp) 
        console.log(jsonMockResp);

        setMockInterviewQuestion(jsonMockResp);
        setinterviewData(result[0]);
        
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 '>
                {/* {question} */}
                <QustionsSection activeQuestionIndex = {activeQuestionIndex} MockInterviewQuestion={MockInterviewQuestion}/>


                {/* Vidio / Audio Recording */}
                <RecordAnswerSection activeQuestionIndex = {activeQuestionIndex}
                MockInterviewQuestion={MockInterviewQuestion} interviewData={interviewData}/>

            </div>
            <div className='flex justify-end gap-6'>
                { activeQuestionIndex>0 &&
                 <Button onClick={()=>setactiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
                { activeQuestionIndex!=MockInterviewQuestion?.length-1 &&
                 <Button onClick={()=>setactiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
                { activeQuestionIndex==MockInterviewQuestion?.length-1 && (
                <Link href={'/dashboard/landingPage/'+interviewData?.mockId+'/feedback'}>
                    <Button>End Interview</Button>
                </Link>
                )}
                
            </div>
        </div>
    )
}

"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateInterviewQuestions } from '@/utils/genaiClient'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment';
import { useRouter } from 'next/navigation'

export default function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  // const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const {user} = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const questions = await generateInterviewQuestions(
        jobPosition,
        jobExperience,
        jobDescription
      );
      setGeneratedQuestions(questions);
      console.log('Generated Questions:', questions);
      
      // Save to database after successful generation
      if(questions && questions.length > 0){
        try {
          const resp = await db.insert(MockInterview).values({
            mockId: uuidv4(),
            jobPosition: jobPosition, // Note: schema has "jobPostition" (typo in schema)
            jobDescription: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous',
            createdAt: moment().format('DD-MM-YYYY'),
            jsonMocResp: JSON.stringify(questions), // Matches schema exactly
          }).returning({mockId: MockInterview.mockId});

          console.log("Inserted Id: ", resp);
          
          if(resp)
          {
            setOpenDialog(false);
            router.push("/dashboard/landingPage/" + resp[0].mockId);
          }

        } catch (dbError) {
          console.error("Database insertion failed:", dbError);
          
        }
      } else {
        console.log("No Questions Generated");
      }
      
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <div
        className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
    
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className={'max-w-2xl'}>
          <DialogHeader>
            <DialogTitle className={'text-xl'}>
              Tell us more about your job Interview
            </DialogTitle>
            <DialogDescription>
              Add Details about your job position/role, job description
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div>
              <div className='mt-5 my-2'>
                <label>Job Role/Job Position</label>
                <Input
                  placeholder='Ex- Full stack Development'
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              <div className='pt-5 my-3'>
                <label>Job Description/ Tech Stack (In Short)</label>
                <textarea
                  placeholder='Ex- React, Angular, Nodejs, MySql'
                  className='w-full border rounded p-2'
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                />
              </div>
              <div className='mt-7 my-2'>
                <label>Year of experience</label>
                <Input
                  placeholder='Ex- 2'
                  type='number'
                  min='0'
                  max='100'
                  required
                  value={jobExperience}
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
            </div>
            <div className='flex justify-end gap-2 mt-4'>
              <Button type='button' variant={'ghost'} onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button 
                className={'hover:cursor-pointer'} 
                type='submit'
                disabled={isLoading}
              >
                {isLoading ?<> <LoaderCircle className='animate-spin'/> Generating from AI </>: 'Start Interview'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Display Generated Questions */}
      {/* {generatedQuestions && (
        <div className="mt-6 p-6 border rounded-lg bg-white">
          <h3 className="text-xl font-semibold mb-4">Generated Interview Questions</h3>
          <div className="space-y-4">
            {generatedQuestions.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-800 mb-2">
                  Q{index + 1}: {item.question}
                </h4>
                <p className="text-gray-600 text-sm">
                  <strong>Answer:</strong> {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )} */}

    </div>
  )
}

"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { GenerateFeedback } from '@/utils/feedbackClient'
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { UserAnswer } from '@/utils/schema'

export default function RecordAnswerSection({ activeQuestionIndex, MockInterviewQuestion, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('')
  const [liveAnswer, setLiveAnswer] = useState('')
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  const {
    error,
    interimResult,
    results,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  })

  // Handle finalized results (append only once)
  useEffect(() => {
    if (results.length > 0) {
      const finalTranscript = results[results.length - 1]?.transcript || ''
      setUserAnswer(prev => prev + (prev ? ' ' : '') + finalTranscript)
    }
  }, [results])

  // Handle interim (live) results (overwrite instead of appending)
  useEffect(() => {
    setLiveAnswer(interimResult || '')
  }, [interimResult])

  // Save answer only when recording stops
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer()
    }
  }, [isRecording])

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText()
    } else {
      startSpeechToText()
      setUserAnswer('')
      setLiveAnswer('')
    }
  }

  const UpdateUserAnswer = async () => {
    try {
      setLoading(true)
      const JsonFeedbackResp = await GenerateFeedback(
        MockInterviewQuestion,
        userAnswer,
        activeQuestionIndex
      )

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: MockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: MockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-YYYY'),
      })

      console.log('User Answer:', userAnswer)
      if (resp) {
        toast('User Answer recorded successfully')
      }
      setUserAnswer('')
      setLiveAnswer('')
    } catch (err) {
      console.error('Error updating user answer:', err)
      toast('Failed to record answer')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative flex flex-col mt-20 mb-8 justify-center items-center bg-primary rounded-lg p-5">
        <Image
          src={'/webcam.svg'}
          alt="web cam image"
          width={100}
          height={100}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 400,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>

      <Button disabled={loading} variant="outline" onClick={StartStopRecording}>
        {isRecording ? (
          <span className="text-red-600 flex gap-2 items-center">
            <Mic /> Stop Recording
          </span>
        ) : (
          'Record Answer'
        )}
      </Button>
    </div>
  )
}



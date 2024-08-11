"use client"

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react";


const FlashCardComponets = () => {

  

  const questions = [
    {
      "question": "Why are you gay?",
      "answer": "I am gay?"
    },
    {
      "question": "What is your favorite color?",
      "answer": "Blue"
    },
    {
      "question": "What is the capital of France?",
      "answer": "Paris"
    }
  ];

  const [flipped, setFlipped] = useState(Array(questions.length).fill(false));

  const handleFlip = (index: number) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <div className="px-6 py-4">
      <div className="flex flex-row justify-between">
          <div>
            <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
          </div>
          <div>
            <Button>
               Check Your Questions
            </Button>
          </div>
      </div>
      <div className="mt-6 px-10 min-h-full">
      <Carousel>
        <CarouselContent>
        {questions.map((item, index) => (
        <CarouselItem key={index} style={{ marginBottom: '20px' }}>
          <div>
            <strong>Question:</strong> {item.question}
          </div>
          {flipped[index] && (
            <div>
              <strong>Answer:</strong> {item.answer}
            </div>
          )}
          <button onClick={() => handleFlip(index)}>
            {flipped[index] ? 'Unflip' : 'Flip'}
          </button>
        </CarouselItem>
      ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      </div>
    </div>
  )
}

export default FlashCardComponets

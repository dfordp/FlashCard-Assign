"use client"

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FlashCard {
  id: string;
  question: string;
  answer: string;
}

interface FlashCardComponentsProps {
  flashcards: FlashCard[];
}

const FlashCardComponents = ({ flashcards }: FlashCardComponentsProps) => {
  const router = useRouter();

  const [flipped, setFlipped] = useState<boolean[]>(Array(flashcards.length).fill(false));

  const handleFlip = (index: number): void => {
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
          <Button onClick={() => { router.push('/admin') }}>
            Check Your Questions
          </Button>
        </div>
      </div>
      <div className="mt-6 px-10 min-h-full">
        <Carousel>
          <CarouselContent>
            {flashcards.map((item, index) => (
              <CarouselItem key={item.id} style={{ marginBottom: '20px' }}>
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

export default FlashCardComponents
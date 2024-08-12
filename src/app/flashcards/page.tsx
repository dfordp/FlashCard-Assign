import { getFlashCards } from "@/actions/flashcards";
import FlashCardComponets from "./components/FlashCard";

export default async function FlashCard() {

  const flashcards = await getFlashCards();
  console.log(flashcards);
  

    return (
      <main>
        <FlashCardComponets flashcards={flashcards}/>
      </main>
    );
  }
  
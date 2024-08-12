import { getFlashCards } from "@/actions/flashcards";
import AdminDashboardCompoent from "./components/AdminDashboard";

export default async function AdminDashBoard() {

    const flashCards = await getFlashCards();
    

    return (
      <main>
        <AdminDashboardCompoent flashCards={flashCards}/>
      </main>
    );
  }
  
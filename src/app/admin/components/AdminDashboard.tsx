"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FaEdit, FaTrash } from "react-icons/fa"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { getCookies } from "@/actions/cookies"
import axios from "axios"
import { useRouter } from "next/navigation"

interface FlashCard {
  id: string;
  question: string;
  answer: string;
}

interface AdminDashboardComponentProps {
  flashCards: FlashCard[];
}

const AdminDashboardComponent = ({ flashCards }: AdminDashboardComponentProps) => {
  const router = useRouter();

  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswer, setNewAnswer] = useState<string>("");

  const [updateQuestion, setUpdateQuestion] = useState<string>("");
  const [updateAnswer, setUpdateAnswer] = useState<string>("");

  const handleNewFlash = async (): Promise<void> => {
    const Id = await getCookies("id");
    const token = await getCookies("token");

    const data = {
      question: newQuestion,
      answer: newAnswer,
      userId: Id,
    };

    console.log(data);

    const flashcard = await axios.post("/api/flashcard", data, {
      headers: {
        "Authorization": token || "",
      },
    });

    console.log(flashcard.data);

    setNewAnswer("");
    setNewQuestion("");
  };

  const handleEdit = async (id: string): Promise<void> => {
    const userId = await getCookies("id");
    const token = await getCookies("token");

    const data = {
      question: updateQuestion,
      answer: updateAnswer,
    };

    const flashcard = await axios.patch(`/api/flashcard/${id}`, data, {
      headers: {
        "Authorization": token || "",
      },
    });

    console.log(flashcard.data);
  };

  const handleDelete = async (id: string): Promise<void> => {
    const token = await getCookies("token");

    const flashcard = await axios.delete(`/api/flashcard/${id}`, {
      headers: {
        "Authorization": token || "",
      },
    });

    console.log(flashcard.data);
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
          <Button onClick={() => { router.push('flashcards') }}>
            Back to FlashCards
          </Button>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>
                Add FlashCard
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add your Question</DialogTitle>
                <div className="mt-6">
                  <div>
                    Question
                    <div>
                      <Input value={newQuestion} onChange={(e) => { setNewQuestion(e.target.value) }} />
                    </div>
                  </div>
                  <div>
                    Answer
                    <div>
                      <Input value={newAnswer} onChange={(e) => { setNewAnswer(e.target.value) }} />
                    </div>
                  </div>
                  <div>
                    <Button onClick={handleNewFlash}>Submit</Button>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Edit</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flashCards.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Button onClick={() => {
                        setUpdateQuestion(item.question);
                        setUpdateAnswer(item.answer);
                      }}>
                        <FaEdit />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Question</DialogTitle>
                        <div className="mt-6">
                          <div>
                            Question
                            <div>
                              <Input value={updateQuestion} onChange={(e) => { setUpdateQuestion(e.target.value) }} />
                            </div>
                          </div>
                          <div>
                            Answer
                            <div>
                              <Input value={updateAnswer} onChange={(e) => { setUpdateAnswer(e.target.value) }} />
                            </div>
                          </div>
                          <div>
                            <Button onClick={() => { handleEdit(item.id) }}>Submit</Button>
                          </div>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>{item.question}</TableCell>
                <TableCell>{item.answer}</TableCell>
                <TableCell>
                  <Button onClick={() => { handleDelete(item.id) }}>
                    <FaTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminDashboardComponent
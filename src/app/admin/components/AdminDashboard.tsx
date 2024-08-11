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

const AdminDashboardCompoent = () => {
  
  const questions = [ {
    "question" : "Why are you gay?",
    "answer" : "I am gay?"
  }]

  const handleEdit = (index: number) => {
    // Implement edit functionality here
    console.log(`Edit question at index ${index}`);
  };
  
  const handleDelete = (index: number) => {
    // Implement delete functionality here
    console.log(`Delete question at index ${index}`);
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
        <Dialog>
          <DialogTrigger>
            <Button>
              Add FlashCard
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
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
        {questions.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
            <Dialog>
              <DialogTrigger>
                <Button>
                  <FaEdit />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            </TableCell>
            <TableCell>{item.question}</TableCell>
            <TableCell>{item.answer}</TableCell>
            <TableCell>
            <Dialog>
              <DialogTrigger>
                <Button>
                  <FaTrash />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>

      </div>
    </div>
  )
}

export default AdminDashboardCompoent

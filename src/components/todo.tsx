import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StarIcon, TrashIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from './ui/dropdown-menu'

import { v4 as uuidv4 } from 'uuid';

export type TodoTasks = {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

export default function Todo() {

  const [tasks, setTasks] = useState<TodoTasks[]>([
    {
      id: '1',
      title: 'Learn how to use Shadcn',
      description: 'Understand the components and utilities provided by Shadcn',
      completed: false,
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Walk the dog',
      description: 'Take the dog for a walk in the park',
      completed: true,
      priority: 'low'
    },
  ])

  const [newTask, setNewTask] = useState<TodoTasks>()

  const generateId = () => uuidv4();

  const addTask = (title: string, description: string, priority: 'low' | 'medium' | 'high' = 'low') => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: generateId(),
        title: title,
        description: description,
        completed: false,
        priority: priority,
      }
    ])
  }

  const onCheckedChange = (id: string, checked: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: checked } : task
      )
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const description = formData.get('description') as string


    if (title.trim() === '') {
      return
    }

    addTask(title, description)
    e.currentTarget.reset()
  }

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    )
  }

  const handleSetPriority = (taskId: string, priority: 'low' | 'medium' | 'high') => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority: priority } : task
      )
    )
  }

  return (
    <Card key="1" className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">To-Do List</CardTitle>
        <CardDescription>Add new tasks to your to-do list</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 mt-10">
        {tasks.map((task) => (
          <div
            className={`flex items-center justify-between gap-4 shadow-sm rounded-xl p-2 ${task.priority === 'high'
              ? 'text-red-400 shadow-red-200'
              : task.priority === 'medium'
                ? 'text-yellow-400 shadow-yellow-200'
                : 'text-green-400 shadow-green-200'
              }`}
            key={task.id}
          >
            <div className='space-x-4'>
              <Checkbox
                id={`todo${task.id}`}
                checked={task.completed}
                onCheckedChange={(checked: boolean) => onCheckedChange(task.id, checked)}
              />

              <label
                className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor={`todo${task.id}`}
              >
                {task.title}
              </label>
            </div>
            <div className='flex justify-between items-center gap-10'>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {task.description}
              </span>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <span className="sr-only">Set priority</span>
                      <StarIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Set Priority</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleSetPriority(task.id, 'high')}>
                      <span className="text-red-600">High</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSetPriority(task.id, 'medium')}>
                      <span className="text-yellow-600">Medium</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSetPriority(task.id, 'low')}>
                      <span className="text-green-600">Low</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="ml-auto h-8 w-8" size="icon" variant="destructive" onClick={() => deleteTask(task.id)}>
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </div>
            </div>

          </div>
        ))}
      </CardContent>
      <CardFooter className="gap-4">
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
          <Input
            className="rounded-none border-0 border-gray-200 dark:border-gray-800 shadow-none flex-1"
            placeholder="Add a new task"
            type="text"
            name="title"
          />
          <Input
            className="rounded-none border-0 border-gray-200 dark:border-gray-800 shadow-none flex-1"
            placeholder="Description (optional)"
            type="text"
            name="description"
          />
          <Button type="submit">Add</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

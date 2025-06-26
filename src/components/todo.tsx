import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StarIcon, TrashIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from './ui/dropdown-menu'

import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'
import { Separator } from './ui/separator'

export type TodoTasks = {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

export default function Todo() {

  const [tasks, setTasks] = useState<TodoTasks[]>([])

  const [deletedTasks, setDeletedTasks] = useState<TodoTasks[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tasksCookie = Cookies.get('tasks')
    const deletedTasksCookie = Cookies.get('deletedTasks')
    if (tasksCookie) {
      setTasks(JSON.parse(tasksCookie))
    }
    if (deletedTasksCookie) {
      setDeletedTasks(JSON.parse(deletedTasksCookie))
    }
    setLoading(false);
  }, [])

  useEffect(() => {
    if (!loading) {
      Cookies.set('tasks', JSON.stringify(tasks), { expires: 7 })
      Cookies.set('deletedTasks', JSON.stringify(deletedTasks), { expires: 7 })
    }
  }, [tasks, deletedTasks, loading])

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
    setDeletedTasks((prevDeletedTasks) => [
      ...prevDeletedTasks,
      tasks.find(task => task.id === taskId) as TodoTasks
    ]);
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  }


  const handleSetPriority = (taskId: string, priority: 'low' | 'medium' | 'high') => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority: priority } : task
      )
    )
  }

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  return (
    <Card className="w-full max-w-5xl mx-auto bg-card/50 backdrop-blur-2xl shadow-sm shadow-primary">
      <CardHeader>
        <CardTitle className="text-2xl">To-Do List</CardTitle>
        <CardDescription>Your flexible Todo list</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 mt-10">
        <h2 className='text-lg italic'>Ongoing</h2>
        {tasks.length === 0 && (
          <div>
            <span className="text-gray-500 dark:text-gray-400">No tasks available, start adding them</span>
          </div>
        )}
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
            <div className='space-x-4 flex items-center'>
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
      <CardFooter className="gap-4 mt-10">
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
          <Button type="submit" variant="outline" className='border-blue-500 border'>Add</Button>
        </form>
      </CardFooter>
      <Separator className="my-4 w-2" />
      <CardContent className="flex flex-col gap-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h2 className='text-lg italic'>Deleted</h2>
            </AccordionTrigger>
            <AccordionContent>
              {deletedTasks.length === 0 && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Empty</span>
                </div>
              )}
              {deletedTasks.map((task) => (
                <div
                  className="flex items-center border border-b-blue-200 justify-between gap-4 shadow-sm rounded-xl p-2"
                  key={task.id}
                >
                  <div className='space-x-4 px-8'>
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
                  </div>

                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}


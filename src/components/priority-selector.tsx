import { StarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "./ui/dropdown-menu"
import type { TodoTasks } from "./todo"

type PrioritySelectorProps = {
  task: TodoTasks
  onChange: (taskId: number, priority: "low" | "medium" | "high") => void
}
export const PrioritySelector = ({ task, onChange }: PrioritySelectorProps) => {

  function handleSetPriority(taskId: number, priority: "low" | "medium" | "high") {
    onChange(taskId, priority);
  }

  return (
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
  )
}

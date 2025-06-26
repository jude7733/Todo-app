import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { ListTodo, MenuIcon } from "lucide-react"

export default function Navbar() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <ListTodo className="h-6 w-6" />
          <span className="sr-only">To-Do List</span>
        </SheetContent>
      </Sheet>
      <ListTodo className="h-6 w-6" />
      <span className="sr-only">Todo list</span>
      <nav className="ml-auto hidden lg:flex gap-6">
        <ModeToggle />
      </nav>
    </header>
  )
}

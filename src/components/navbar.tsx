import Link from "next/link"
import { Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PiGlobeSimpleFill } from "react-icons/pi";
export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-background">
            <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2">
                    <PiGlobeSimpleFill className="h-6 w-6"/>
                    <span className="text-lg font-semibold">Tour Craft</span>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                    <Link href="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                    <Link href="/blogs">Blogs</Link>
                </Button>
            </div>
        </nav>
    )
}
"use client"
import { ModeToggle } from "./dark-mode-toggle"
import Link from "next/link"

export function SideNav() {

  return (
      <div className={`w-60 min-h-[640px] lg:flex`}>
        <div className="flex flex-col w-60 border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center h-14 px-3">
            <Link className="flex items-center gap-2 text-lg font-semibold w-14" href="#">
              <PackageIcon className="h-6 w-6" />
              <span className="sr-only">W1.BePrivate</span>
              <ModeToggle/>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="grid gap-0">
              <li className="h-[48px]">
                <Link
                  className="flex items-center h-full justify-start gap-4 px-4 text-md font-medium hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  href="/"
                >
                  <HomeIcon className="h-4 w-4" />
                  Dashboard
                </Link>
              </li>
              <li className="h-[48px]">
                <Link
                  className="flex items-center h-full justify-start gap-4 px-4 text-md font-medium hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  href="/data"
                >
                  <PackageIcon className="h-4 w-4" />
                  Model Performance
                </Link>
              </li>
              <li className="h-[48px]">
                <Link
                  className="flex items-center h-full justify-start gap-4 px-4 text-md font-medium hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  href="#"
                >
                  <SearchIcon className="h-4 w-4" />
                  Explainer
                </Link>
              </li>
              <li className="h-[48px]">
                <Link
                  className="flex items-center h-full justify-start gap-4 px-4 text-md font-medium hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  href="#"
                >
                  <UserIcon className="h-4 w-4" />
                  Model Re-Training
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
  )
}

function HomeIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function PackageIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function UserIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
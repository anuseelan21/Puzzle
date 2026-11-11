"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaBell } from "react-icons/fa6";
import { useUnreadCount } from "@/hooks/useNotifications";
import { useSession } from "next-auth/react";

interface NotificationBellProps {
  className?: string;
}

const NotificationBell = ({ className = "" }: NotificationBellProps) => {
  const { data: session } = useSession();
  const { unreadCount } = useUnreadCount();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative rounded-full p-2 text-[#526258] transition-colors duration-200 hover:bg-[#f1eee6] hover:text-[#263b32] focus:outline-none focus:ring-2 focus:ring-[#638273] focus:ring-offset-1"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
        aria-expanded={isDropdownOpen}
      >
        <FaBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-[#bd6849] text-xs font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-[#e8e1d5] bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-[#e8e1d5] p-4">
            <h3 className="text-lg font-semibold text-[#263b32]">Notifications</h3>
            {unreadCount > 0 && <span className="text-sm text-gray-500">{unreadCount} unread</span>}
          </div>

          <div className="border-b border-[#e8e1d5] p-4">
            <div className="flex space-x-2">
              <Link
                href="/notifications"
                onClick={() => setIsDropdownOpen(false)}
                className="flex-1 rounded-md border border-[#dce8df] bg-[#f2f6f1] px-3 py-2 text-center text-sm font-medium text-[#2f584b] transition-colors hover:bg-[#e6efe6]"
              >
                View all
              </Link>
              {unreadCount > 0 && (
                <button
                  className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-center text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {unreadCount === 0 ? (
              <div className="p-6 text-center">
                <FaBell className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                <p className="text-sm text-gray-500">No new notifications</p>
                <p className="mt-1 text-xs text-gray-400">You&apos;re all caught up!</p>
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="mb-2 text-sm text-gray-600">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </p>
                <Link
                  href="/notifications"
                  onClick={() => setIsDropdownOpen(false)}
                  className="inline-flex items-center rounded-full border border-[#dce8df] bg-[#f2f6f1] px-3 py-1 text-xs font-medium text-[#2f584b] transition-colors hover:bg-[#e6efe6]"
                >
                  View in Notification Center
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-[#e8e1d5] bg-[#f8f6f0] p-3">
            <Link
              href="/notifications"
              onClick={() => setIsDropdownOpen(false)}
              className="block w-full text-center text-sm text-gray-600 transition-colors hover:text-[#2f584b]"
            >
              Go to Notification Center
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

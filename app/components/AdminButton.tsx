"use client";
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AdminButton() {
  const { data: session } = useSession();

  // 1. Wait for user data to load
  if (!session?.user) {
    return null;
  }

  // 2. DEFINE ADMIN EMAIL (Case insensitive check)
  const adminEmail = "hemasameera15@gmail.com";
  const currentUserEmail = session.user.email || "";

  // 3. If email doesn't match, HIDE the button (Return nothing)
  if (currentUserEmail.toLowerCase() !== adminEmail.toLowerCase()) {
    return null;
  }

  // 4. If Admin, SHOW the button
  return (
    <Link 
      href="/admin/dashboard" 
      className="hidden md:inline-block text-xs font-bold bg-red-50 text-red-600 px-3 py-2 rounded-lg border border-red-200 hover:bg-red-100 transition mr-3 shadow-sm"
    >
      🛡️ Admin Panel
    </Link>
  );
}
"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------
// 1. USER AUTHENTICATION & SYNC (Login)
// ---------------------------------------------------------
export async function syncUser() {
  const user = await currentUser();

  if (!user) return null;

  // Check if student already exists in our DB
  const existingStudent = await db.student.findUnique({
    where: { clerkId: user.id },
  });

  // If yes, return their data
  if (existingStudent) return existingStudent;

  // If no, CREATE them in the database
  const newStudent = await db.student.create({
    data: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  return newStudent;
}

// ---------------------------------------------------------
// 2. UNIVERSITY MANAGEMENT (Admin)
// ---------------------------------------------------------

// Fetch all universities from Database
export async function getUniversities() {
  const unis = await db.university.findMany({
    orderBy: { rank: 'asc' } // Sort by rank (e.g. #1, #2...)
  });
  return unis;
}

// Add a new university to Database
export async function addUniversity(formData: FormData) {
  const name = formData.get("name") as string;
  const country = formData.get("country") as string;
  const rank = formData.get("rank") as string;
  const fees = formData.get("fees") as string;

  await db.university.create({
    data: {
      name,
      country,
      rank,
      fees,
      logo: "🏛️" // Default logo
    }
  });

  // Refresh the page data automatically
  revalidatePath('/admin/universities');
}

// Delete a university from Database
export async function deleteUniversity(id: number) {
  await db.university.delete({
    where: { id }
  });

  // Refresh the page data automatically
  revalidatePath('/admin/universities');
}
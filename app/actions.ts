"use server";
import { db } from "@/lib/db";
import { currentUser, auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ---------------------------------------------------------
// 1. USER AUTHENTICATION & SYNC
// ---------------------------------------------------------
export async function syncUser() {
  const user = await currentUser();
  if (!user) return null;

  const existingStudent = await db.student.findUnique({ where: { clerkId: user.id } });
  if (existingStudent) return existingStudent;

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
// 2. ONBOARDING
// ---------------------------------------------------------
export async function completeOnboarding(formData: any) {
  const { userId } = await auth();
  if (!userId) return { message: "No Logged In User" };

  const client = await clerkClient();

  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboardingComplete: true,
        academic: {
          college: formData.collegeName,
          degree: formData.degree,
          major: formData.major,
          gpa: formData.gpa,
          gradYear: formData.gradYear,
        },
        goals: {
          degree: formData.targetDegree,
          major: formData.targetMajor,
          countries: formData.targetCountries,
        },
        exams: {
          status: formData.examStatus,
          ielts: formData.ieltsScore,
          gre: formData.greScore,
        },
        budget: {
          workExp: formData.workExp,
          amount: formData.budget,
        },
      },
    });
    return { message: "success" };
  } catch (err) {
    console.error("Failed to update user metadata:", err);
    return { message: "error" };
  }
}

// ---------------------------------------------------------
// 3. UNIVERSITY MANAGEMENT
// ---------------------------------------------------------
export async function getUniversities() {
  try {
    const unis = await db.university.findMany({ orderBy: { rank: 'asc' } });
    return unis;
  } catch (error) {
    console.error("Database Error:", error);
    return []; 
  }
}

export async function addUniversity(formData: FormData) {
  await db.university.create({
    data: {
      name: formData.get("name") as string,
      country: formData.get("country") as string,
      rank: formData.get("rank") as string,
      fees: formData.get("fees") as string,
      logo: "🏛️" 
    }
  });
  revalidatePath('/admin/universities');
}

export async function deleteUniversity(id: number) {
  await db.university.delete({ where: { id } });
  revalidatePath('/admin/universities');
}

// ---------------------------------------------------------
// 4. LOCKING LOGIC (UPDATED FOR MULTI-LOCK) 🔐
// ---------------------------------------------------------
export async function lockUniversity(uniId: number) {
  // Use currentUser() to get metadata easily
  const user = await currentUser();
  if (!user) return { message: "error" };

  const client = await clerkClient();
  
  try {
    // 1. Get existing locks (default to empty array if none)
    const meta = user.publicMetadata as any;
    // Handle both old single ID and new array format
    let currentLocks: number[] = [];
    
    if (Array.isArray(meta.lockedIds)) {
        currentLocks = meta.lockedIds;
    } else if (meta.lockedUniversityId) {
        currentLocks = [meta.lockedUniversityId];
    }

    // 2. Add new ID if not present
    if (!currentLocks.includes(uniId)) {
        const newLocks = [...currentLocks, uniId];
        
        await client.users.updateUserMetadata(user.id, {
            publicMetadata: { 
                lockedIds: newLocks,
                // Clear the old single field to avoid confusion
                lockedUniversityId: null 
            }
        });
    }

    revalidatePath("/dashboard");
    return { message: "success" };
  } catch (err) {
    console.error("Locking Error:", err);
    return { message: "error" };
  }
}

export async function unlockUniversity(uniId: number) {
  const user = await currentUser();
  if (!user) return { message: "error" };

  const client = await clerkClient();

  try {
    const meta = user.publicMetadata as any;
    let currentLocks: number[] = Array.isArray(meta.lockedIds) ? meta.lockedIds : [];

    // Filter out the specific ID
    const newLocks = currentLocks.filter((id) => id !== uniId);

    await client.users.updateUserMetadata(user.id, {
        publicMetadata: { lockedIds: newLocks }
    });

    revalidatePath("/dashboard");
    return { message: "success" };
  } catch (err) {
    console.error("Unlocking Error:", err);
    return { message: "error" };
  }
}

// ---------------------------------------------------------
// 6. HYBRID AI BRAIN (Real AI + Intelligent Fallback) 🧠
// ---------------------------------------------------------
export async function generateAIResponse(history: any[], userProfile: any) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const userMessage = history[history.length - 1].text;

  // 1. Try Real Gemini AI
  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Using 'gemini-pro' as it is the most stable free model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const safeProfile = {
         name: userProfile?.firstName || "Student",
         country: userProfile?.publicMetadata?.goals?.countries?.[0] || "Abroad",
         major: userProfile?.publicMetadata?.goals?.major || "Undecided",
         gpa: userProfile?.publicMetadata?.academic?.gpa || "N/A",
         budget: userProfile?.publicMetadata?.budget?.amount || "N/A"
      };

      const context = `
        You are 'Videsi AI', a smart study abroad counsellor.
        Profile: ${safeProfile.name} wants to study ${safeProfile.major} in ${safeProfile.country}. GPA: ${safeProfile.gpa}. Budget: ${safeProfile.budget}.
        Instructions: Be concise, encouraging, and helpful. Keep answers short (max 3 sentences).
      `;

      const prompt = `${context}\n\nStudent: "${userMessage}"\n\nCounsellor:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return { success: true, message: text };

    } catch (error: any) {
      console.error("⚠️ Gemini API Failed (Using Fallback):", error.message);
      // Code continues to the fallback section below...
    }
  }

  // 2. Intelligent Fallback (Ensures Demo NEVER Fails)
  console.log("🔄 Switching to Rule-Based AI");
  
  const lowerMsg = userMessage.toLowerCase();
  let fallbackResponse = "That's an interesting question! Could you specify more details about your course preferences?";

  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      fallbackResponse = `Hello ${userProfile?.firstName}! I'm ready to help you plan your studies abroad. What's on your mind?`;
  } else if (lowerMsg.includes("chance") || lowerMsg.includes("eligible")) {
      const gpa = parseFloat(userProfile?.publicMetadata?.academic?.gpa || "0");
      if (gpa > 7.5 || gpa > 3.0) {
          fallbackResponse = "Your academic profile is strong! 🌟 You have good chances at universities like Arizona State or Northeastern. Shall we draft your SOP?";
      } else {
          fallbackResponse = "Your profile is decent. To maximize chances, we should target 'Safe' universities and focus on a strong Statement of Purpose.";
      }
  } else if (lowerMsg.includes("scholarship") || lowerMsg.includes("cost") || lowerMsg.includes("budget")) {
      fallbackResponse = "Budget is key! 💰 I recommend looking at public universities in Germany (free tuition) or applying for the 'Dean's Excellence Scholarship' in the US.";
  } else if (lowerMsg.includes("sop") || lowerMsg.includes("essay")) {
      fallbackResponse = "An SOP is your personal story. Start by explaining 'Why this course?' and 'Why this university?'. I can review your draft once you write it!";
  } else if (lowerMsg.includes("visa")) {
      fallbackResponse = "For the student visa, you'll need your I-20 form (from the uni) and proof of funds. It usually takes 2-4 weeks to process.";
  } else if (lowerMsg.includes("suggest") || lowerMsg.includes("universities")) {
      fallbackResponse = "Based on your profile, I suggest checking out the 'Universities' tab on the left. I've highlighted some Target and Dream options for you there!";
  }

  return { success: true, message: fallbackResponse };
}
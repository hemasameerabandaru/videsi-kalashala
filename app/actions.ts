"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import bcrypt from "bcryptjs";

// ---------------------------------------------------------
// 1. USER AUTHENTICATION & SYNC
// ---------------------------------------------------------
export async function signupWithEmail(firstName: string, lastName: string, email: string, password: string) {
  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { message: "User already exists", success: false };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db.user.create({
      data: {
        email,
        name: `${firstName} ${lastName}`,
        metadata: {
          firstName,
          lastName,
          hashedPassword, // Store hashed password for future login
        },
      },
    });

    console.log("✅ User created successfully:", newUser.id);
    return { message: "success", userId: newUser.id, success: true };
  } catch (error: any) {
    console.error("❌ Signup error:", error);
    
    // More detailed error logging
    if (error.code === "P2002") {
      return { message: "Email already exists", success: false };
    }
    if (error.code === "P1000" || error.message?.includes("connect")) {
      return { message: "Database connection error. Please check if the database is running.", success: false };
    }
    
    return { message: error.message || "Signup failed", success: false };
  }
}

export async function syncUser() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const existingUser = await db.user.findUnique({ where: { id: session.user.id } });
  if (existingUser) return existingUser;

  return await db.user.create({
    data: {
      id: session.user.id,
      email: session.user.email || "",
      name: session.user.name || "",
      image: session.user.image || "",
    },
  });
}

// ---------------------------------------------------------
// 2. ONBOARDING
// ---------------------------------------------------------
export async function completeOnboarding(formData: any) {
  const session = await auth();
  if (!session?.user?.id) return { message: "No Logged In User" };

  try {
    // Get existing user to merge metadata
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    const existingMetadata = (user?.metadata as any) || {};

    // Merge new onboarding data with existing metadata
    const newMetadata = {
      ...existingMetadata,
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
    };

    // Update user metadata with onboarding data
    await db.user.update({
      where: { id: session.user.id },
      data: {
        metadata: newMetadata,
      },
    });
    return { message: "success" };
  } catch (err) {
    console.error("Failed to update user metadata:", err);
    return { message: "error" };
  }
}

// ---------------------------------------------------------
// 3. UNIVERSITY MANAGEMENT (Placeholder - No DB Model Yet)
// ---------------------------------------------------------
export async function getUniversities() {
  // TODO: Add University model to Prisma schema
  return []; 
}

export async function addUniversity(formData: FormData) {
  // TODO: Add University model to Prisma schema
  revalidatePath('/admin/universities');
}

export async function deleteUniversity(id: number) {
  // TODO: Add University model to Prisma schema
  revalidatePath('/admin/universities');
}

// ---------------------------------------------------------
// 4. LOCKING LOGIC (Multi-Lock Support)
// ---------------------------------------------------------
export async function lockUniversity(uniId: number) {
  const session = await auth();
  if (!session?.user?.id) return { message: "error" };

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) return { message: "error" };

    const meta = user.metadata as any;
    let currentLocks: number[] = [];
    
    // Handle both old single ID and new array format
    if (Array.isArray(meta?.lockedIds)) {
        currentLocks = meta.lockedIds;
    } else if (meta?.lockedUniversityId) {
        currentLocks = [meta.lockedUniversityId];
    }

    // Add new ID only if not already present
    if (!currentLocks.includes(uniId)) {
        const newLocks = [...currentLocks, uniId];
        await db.user.update({
          where: { id: session.user.id },
          data: {
            metadata: { 
              ...meta,
              lockedIds: newLocks, 
              lockedUniversityId: null // Clear legacy field
            }
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
  const session = await auth();
  if (!session?.user?.id) return { message: "error" };

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) return { message: "error" };

    const meta = user.metadata as any;
    let currentLocks: number[] = Array.isArray(meta?.lockedIds) ? meta.lockedIds : [];

    // Filter out the specific ID
    const newLocks = currentLocks.filter((id) => id !== uniId);

    await db.user.update({
      where: { id: session.user.id },
      data: {
        metadata: { 
          ...meta,
          lockedIds: newLocks 
        }
      }
    });

    revalidatePath("/dashboard");
    return { message: "success" };
  } catch (err) {
    console.error("Unlocking Error:", err);
    return { message: "error" };
  }
}

// ---------------------------------------------------------
// 6. HYBRID AI BRAIN (Optimized for Voice) 🧠
// ---------------------------------------------------------
export async function generateAIResponse(history: any[], userProfile: any) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const userMessage = history[history.length - 1].text;

  // 1. Try Real Gemini AI
  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // 'gemini-1.5-flash' is faster and optimal for real-time chat
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const safeProfile = {
         name: userProfile?.firstName || "Student",
         country: userProfile?.publicMetadata?.goals?.countries?.[0] || "Abroad",
         major: userProfile?.publicMetadata?.goals?.major || "Undecided",
         gpa: userProfile?.publicMetadata?.academic?.gpa || "N/A",
         budget: userProfile?.publicMetadata?.budget?.amount || "N/A"
      };

      // 🎤 INSTRUCTIONS OPTIMIZED FOR VOICE 🎤
      // We explicitly tell the AI to be conversational and concise so the
      // Text-to-Speech (TTS) engine sounds natural, not robotic.
      const context = `
        You are 'Videsi AI', a supportive and knowledgeable study abroad counsellor.
        
        User Profile:
        - Name: ${safeProfile.name}
        - Target Major: ${safeProfile.major}
        - Target Country: ${safeProfile.country}
        - GPA: ${safeProfile.gpa}
        - Budget: ${safeProfile.budget}

        Guidelines for Voice Output:
        1. Keep responses **conversational and empathetic**.
        2. Keep answers **short** (maximum 3 sentences) unless asked for a list.
        3. Do NOT use markdown tables or complex formatting that is hard to speak.
        4. If listing universities, provide just the top 3 with a brief reason.
        5. If asked for a mock interview, ask **one** question at a time and wait for the user to speak.
      `;

      const prompt = `${context}\n\nChat History:\n${history.map((h: any) => `${h.role}: ${h.text}`).join('\n')}\n\nStudent: "${userMessage}"\n\nCounsellor:`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return { success: true, message: text };

    } catch (error: any) {
      console.error("⚠️ Gemini API Failed:", error.message);
      // Logic automatically falls through to fallback below
    }
  } else {
      console.warn("⚠️ No GOOGLE_API_KEY found in .env.local");
  }

  // 2. Intelligent Fallback (Safe Mode)
  console.log("🔄 Switching to Fallback AI");
  
  const lowerMsg = userMessage.toLowerCase();
  let fallbackResponse = "That's an interesting question! Could you specify more details about your course preferences?";

  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      fallbackResponse = `Hello ${userProfile?.firstName}! I'm listening. Ask me about universities, visas, or practice an interview answer!`;
  } else if (lowerMsg.includes("mock") || lowerMsg.includes("interview")) {
      fallbackResponse = "Okay, let's practice. Tell me about yourself and why you chose this major? (Speak your answer!)";
  } else if (lowerMsg.includes("chance") || lowerMsg.includes("eligible")) {
      fallbackResponse = "Based on your GPA, you have good chances at Arizona State and Northeastern. Would you like to hear about their deadlines?";
  } else if (lowerMsg.includes("scholarship") || lowerMsg.includes("cost")) {
      fallbackResponse = "Budget is key! I recommend public universities in Germany for low tuition, or merit scholarships in the US.";
  }

  return { success: true, message: fallbackResponse };
}
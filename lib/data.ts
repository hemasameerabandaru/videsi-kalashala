// 🧠 THIS IS YOUR "DATABASE" OF UNIVERSITIES
// In a real app, this would come from an API. For the Hackathon, this is perfect.

export const universities = [
  // 🇺🇸 USA
  {
    id: 1,
    name: "Stanford University",
    country: "USA 🇺🇸",
    rank: 3,
    minGpa: 3.9, // Very High Req
    minGre: 330,
    cost: 75000,
    logo: "🌲"
  },
  {
    id: 2,
    name: "Massachusetts Institute of Technology (MIT)",
    country: "USA 🇺🇸",
    rank: 1,
    minGpa: 4.0,
    minGre: 335,
    cost: 80000,
    logo: "🤖"
  },
  {
    id: 3,
    name: "Arizona State University",
    country: "USA 🇺🇸",
    rank: 150,
    minGpa: 3.0, // Moderate Req
    minGre: 300,
    cost: 45000,
    logo: "☀️"
  },
  {
    id: 4,
    name: "University of Texas at Dallas",
    country: "USA 🇺🇸",
    rank: 200,
    minGpa: 2.8, // Safe for many
    minGre: 295,
    cost: 40000,
    logo: "🤠"
  },
  
  // 🇬🇧 UK
  {
    id: 5,
    name: "University of Oxford",
    country: "UK 🇬🇧",
    rank: 2,
    minGpa: 3.8,
    minGre: 320,
    cost: 55000,
    logo: "🏰"
  },
  {
    id: 6,
    name: "University of Manchester",
    country: "UK 🇬🇧",
    rank: 30,
    minGpa: 3.2,
    minGre: 305,
    cost: 40000,
    logo: "🦁"
  },

  // 🇨🇦 CANADA
  {
    id: 7,
    name: "University of Toronto",
    country: "Canada 🇨🇦",
    rank: 20,
    minGpa: 3.7,
    minGre: 315,
    cost: 50000,
    logo: "🍁"
  },
  {
    id: 8,
    name: "Seneca College",
    country: "Canada 🇨🇦",
    rank: 500,
    minGpa: 2.5,
    minGre: 0, // No GRE needed
    cost: 25000,
    logo: "🎓"
  },

  // 🇩🇪 GERMANY
  {
    id: 9,
    name: "TU Munich",
    country: "Germany 🇩🇪",
    rank: 40,
    minGpa: 3.5,
    minGre: 310,
    cost: 2000, // Very cheap
    logo: "🍺"
  },
  {
    id: 10,
    name: "RWTH Aachen",
    country: "Germany 🇩🇪",
    rank: 80,
    minGpa: 3.3,
    minGre: 305,
    cost: 1500,
    logo: "⚙️"
  }
];

// 🧠 THE "AI" LOGIC FUNCTION
// This categorizes schools into Dream, Target, and Safe based on the user's GPA
export function getRecommendations(userProfile: any) {
  // 1. Filter by Country (if user selected any)
  let filtered = universities;
  const userCountries = userProfile?.goals?.countries || [];
  
  // Clean up the country strings to match logic (remove emojis for comparison if needed)
  if (userCountries.length > 0 && !userCountries.includes("Other 🌍")) {
     filtered = filtered.filter(u => 
        userCountries.some((c: string) => u.country.includes(c.split(" ")[0]))
     );
  }

  // 2. Normalize User GPA (Assuming 4.0 scale or converting approx)
  let userGpa = parseFloat(userProfile?.academic?.gpa || "3.0");
  if (userGpa > 5) userGpa = (userGpa / 10) * 4; // Simple conversion logic

  // 3. Categorize
  const recommendations = {
    dream: [] as typeof universities,
    target: [] as typeof universities,
    safe: [] as typeof universities
  };

  filtered.forEach(uni => {
    const diff = userGpa - uni.minGpa;

    if (diff < -0.2) {
       // User GPA is significantly lower than required -> DREAM (Hard to get in)
       recommendations.dream.push(uni);
    } else if (diff >= -0.2 && diff <= 0.3) {
       // User GPA is around the requirement -> TARGET (Good chance)
       recommendations.target.push(uni);
    } else {
       // User GPA is much higher -> SAFE (Very high chance)
       recommendations.safe.push(uni);
    }
  });

  return recommendations;
}
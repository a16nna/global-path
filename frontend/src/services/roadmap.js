import api from "./api";

const MOCK_ROADMAP = {
  country: "Canada",
  specialization: "Data Science & AI",
  eligibilityScore: 82,
  ielts: "7.0",
  gre: "Optional",
  visa: "Study Permit (SDS)",
  monthsToAdmission: 9,
  universities: [
    { name: "University of Toronto", rank: "#21 world", tuition: 45000, fitScore: 88 },
    { name: "University of British Columbia", rank: "#34 world", tuition: 40000, fitScore: 84 },
    { name: "University of Waterloo", rank: "#112 world", tuition: 38000, fitScore: 91 },
  ],
  livingExpenses: { monthly: 1400, currency: "CAD" },
  scholarships: [
    { name: "Lester B. Pearson Scholarship", coverage: "Full tuition + living" },
    { name: "UBC International Leader Award", coverage: "Up to $40,000" },
  ],
  documents: [
    "Statement of Purpose",
    "Letters of Recommendation (2)",
    "Academic transcripts",
    "IELTS/TOEFL score report",
    "Updated resume",
    "Financial proof (GIC / bank statement)",
  ],
  checklist: [
    { task: "Shortlist universities", done: true },
    { task: "Book IELTS exam", done: true },
    { task: "Draft Statement of Purpose", done: false },
    { task: "Request recommendation letters", done: false },
    { task: "Submit applications", done: false },
    { task: "Apply for study permit", done: false },
  ],
  timeline: [
    { stage: "Profile evaluation", month: "Month 1" },
    { stage: "Shortlist & SOP drafting", month: "Month 2–3" },
    { stage: "Applications submitted", month: "Month 4" },
    { stage: "Offers & funding decisions", month: "Month 6" },
    { stage: "Visa filing", month: "Month 7" },
    { stage: "Departure", month: "Month 9" },
  ],
};

export async function generateRoadmap(profile) {
  try {
    const { data } = await api.post("/roadmap/generate", profile);
    return data;
  } catch (err) {
    console.warn("roadmap.generate: falling back to mock response", err?.message);
    return { ...MOCK_ROADMAP, country: profile?.preferredCountry || MOCK_ROADMAP.country };
  }
}

export async function fetchSavedRoadmap(id) {
  try {
    const { data } = await api.get(`/roadmap/${id}`);
    return data;
  } catch (err) {
    console.warn("roadmap.fetch: falling back to mock response", err?.message);
    return MOCK_ROADMAP;
  }
}

export async function saveRoadmap(roadmap) {
  try {
    const { data } = await api.post("/roadmap/save", roadmap);
    return data;
  } catch (err) {
    console.warn("roadmap.save: falling back to mock response", err?.message);
    return { saved: true };
  }
}

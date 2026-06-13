const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;

function getGenAI() {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

async function generateRoadmapWithAI({
  pathway,
  eligibleUniversities,
  userInputs,
  countryLabel,
  specialisationLabel,
}) {
  try {
    const model = getGenAI().getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const prompt = buildPrompt({
      pathway,
      eligibleUniversities,
      userInputs,
      countryLabel,
      specialisationLabel,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    return JSON.parse(cleaned);

  } catch (err) {
    console.error('Gemini Error:', err.message);

    // Fallback for demo/hackathon
    return {
      profile: {
        country: userInputs.country,
        countryLabel,
        specialisation: userInputs.specialisation,
        specialisationLabel,
        targetIntake: userInputs.targetIntake,
      },

      summary: `Based on your academic profile (CGPA ${userInputs.cgpa}, IELTS ${userInputs.ieltsScore}), you have strong opportunities to pursue ${specialisationLabel} in ${countryLabel}. Begin applications early and strengthen your SOP and LORs.`,

      universities: eligibleUniversities.slice(0, 5),

      timeline: pathway.timeline || [],

      costs: pathway.costs || {},

      visa: pathway.visa || {},

      postStudy: pathway.postStudy || {},

      documents: pathway.documents || {},

      disclaimer:
        'Demo mode: AI generation is temporarily unavailable. Results are generated from verified database records.',
    };
  }
}

function buildPrompt({
  pathway,
  eligibleUniversities,
  userInputs,
  countryLabel,
  specialisationLabel,
}) {
  const {
    cgpa,
    greScore,
    ieltsScore,
    budget,
    targetIntake,
  } = userInputs;

  return `
You are an expert study abroad counselor for Indian BTech students.

Generate a personalized study abroad roadmap.

Respond ONLY with valid JSON.

STUDENT PROFILE:
- Country: ${countryLabel}
- Specialisation: ${specialisationLabel}
- CGPA: ${cgpa}
- GRE: ${greScore}
- IELTS: ${ieltsScore}
- Budget: ${budget}
- Intake: ${targetIntake}

UNIVERSITIES:
${JSON.stringify(eligibleUniversities.slice(0, 8), null, 2)}

PATHWAY:
${JSON.stringify(pathway, null, 2)}

Return JSON with:
{
  "profile": {},
  "summary": "",
  "universities": [],
  "timeline": [],
  "costs": {},
  "visa": {},
  "postStudy": {},
  "documents": {},
  "disclaimer": ""
}
`;
}

module.exports = {
  generateRoadmapWithAI,
};
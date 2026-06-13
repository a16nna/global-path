const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;

function getGenAI() {
  if (!genAI) genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI;
}

async function generateRoadmapWithAI({ pathway, eligibleUniversities, userInputs, countryLabel, specialisationLabel }) {
  const model = getGenAI().getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = buildPrompt({ pathway, eligibleUniversities, userInputs, countryLabel, specialisationLabel });

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleaned = text.replace(/```json|```/g, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch {
    const err = new Error('AI returned invalid JSON. Please try again.');
    err.status = 500;
    throw err;
  }
}

function buildPrompt({ pathway, eligibleUniversities, userInputs, countryLabel, specialisationLabel }) {
  const { cgpa, greScore, ieltsScore, budget, targetIntake } = userInputs;

  return `
You are an expert study abroad counselor for Indian BTech students.

Generate a personalized study abroad roadmap based on the following verified data.
Respond ONLY with a valid JSON object. No preamble, no explanation, no markdown.

STUDENT PROFILE:
- BTech background targeting ${specialisationLabel} MS/MEng
- Destination country: ${countryLabel}
- CGPA: ${cgpa || 'not provided'} / 10
- GRE Score: ${greScore || 'not provided'} / 340
- IELTS Score: ${ieltsScore || 'not provided'} / 9
- Budget: ${budget ? `INR ${budget.toLocaleString('en-IN')}` : 'not specified'}
- Target intake: ${targetIntake}

VERIFIED UNIVERSITY DATA (use only these, do not invent universities):
${JSON.stringify(eligibleUniversities.slice(0, 8), null, 2)}

VERIFIED PATHWAY DATA:
- Visa: ${JSON.stringify(pathway.visa)}
- Costs: ${JSON.stringify(pathway.costs)}
- Post-study: ${JSON.stringify(pathway.postStudy)}
- Timeline: ${JSON.stringify(pathway.timeline)}
- Documents: ${JSON.stringify(pathway.documents)}

Return a JSON object with exactly this structure:
{
  "profile": {
    "country": "${userInputs.country}",
    "countryLabel": "${countryLabel}",
    "specialisation": "${userInputs.specialisation}",
    "specialisationLabel": "${specialisationLabel}",
    "targetIntake": "${targetIntake}"
  },
  "summary": "2-3 sentence personalized summary for this student",
  "universities": [array of universities with eligibility tags, sorted: safe first then match then reach],
  "timeline": [month-by-month milestones as provided in pathway data],
  "costs": {verified cost data with INR estimates},
  "visa": {verified visa data with steps},
  "postStudy": {verified post-study work and PR pathway data},
  "documents": {verified documents checklist},
  "disclaimer": "This roadmap is based on verified official sources. Always confirm requirements directly with the university and immigration authorities before making decisions. Rules and fees are subject to change."
}
`.trim();
}

module.exports = { generateRoadmapWithAI };

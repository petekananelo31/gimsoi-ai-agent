const { z } = require('zod');

const SprintAnalysisSchema = z.object({
  risk_score: z.number(),
  health_status: z.enum(['Healthy', 'At Risk', 'Critical']),
  consistency_index: z.number(),
  recommendations: z.array(z.string()),
  generated_at: z.string()
});

module.exports = { SprintAnalysisSchema };
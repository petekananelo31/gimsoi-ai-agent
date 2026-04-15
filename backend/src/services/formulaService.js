/** 
 * GIMSOI Proprietary Logic
 * Formula 4.1: Execution Risk Calculation
 */
const calculateRisk = (tasks) => {
  // Overdue (15), Delayed (10), Inactive (12), Deps (8)
  return (tasks.overdue * 15) + (tasks.delayed * 10) + (tasks.inactive * 12) + (tasks.deps * 8);
};

const calculateConsistency = (m) => {
  // CR (0.4), UF (0.2), OTC (0.3), AS (0.1)
  return (m.cr * 0.4) + (m.uf * 0.2) + (m.otc * 0.3) + (m.as * 0.1);
};

module.exports = { calculateRisk, calculateConsistency };

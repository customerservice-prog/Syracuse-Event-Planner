/** Structured logs for form leads — visible in Railway / host logs without any email API. */
export function logContactLead(payload: Record<string, unknown>) {
  console.log(
    '[Syracuse-Event-Planner:contact]',
    JSON.stringify({ at: new Date().toISOString(), ...payload }),
  );
}

export function logQuoteLead(payload: Record<string, unknown>) {
  console.log(
    '[Syracuse-Event-Planner:quote]',
    JSON.stringify({ at: new Date().toISOString(), ...payload }),
  );
}

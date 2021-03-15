import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import minMax from 'dayjs/plugin/minMax';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(customParseFormat);
dayjs.extend(minMax);
dayjs.extend(localizedFormat);

/** @param {Timestamp} t */
function parseTimestamp(t) {
  return dayjs(t, 'YYYY-MM-DD HH:mm:ss');
}

/** @param {dayjs.Dayjs} d */
function formatDate(d) {
  return d.format('L');
}

/** @param {Timestamp} t */
export function formatTimestamp(t) {
  return t === '' ? '-' : formatDate(parseTimestamp(t));
}

/**
 * @param {DataRequestState[]} states
 * @return {DataRequestState}
 */
function combineRequestStates(states) {
  if (states.includes('NOT_SUBMITTED')) return 'NOT_SUBMITTED';
  if (states.includes('UPDATE_REQUESTED')) return 'UPDATE_REQUESTED';
  if (states.includes('REJECTED')) return 'REJECTED';
  if (states.includes('UNDER_REVIEW')) return 'UNDER_REVIEW';
  return 'APPROVED';
}

/**
 * @param {DataRequest[]} requests
 * @return {{ submittedAt: string; completedAt: string; state: DataRequestState }}
 */
export function combineRequestsInfo(requests) {
  const submittedDays = [];
  const completedDays = [];
  const states = [];

  for (const { submitted_at, completed_at, state } of requests) {
    if (submitted_at !== '') submittedDays.push(parseTimestamp(submitted_at));
    if (completed_at !== '') completedDays.push(parseTimestamp(completed_at));
    states.push(state);
  }

  const submittedAt =
    submittedDays.length === 0 ? '-' : formatDate(dayjs.max(submittedDays));
  const completedAt =
    completedDays.length === 0 ? '-' : formatDate(dayjs.max(completedDays));
  const state = combineRequestStates(requests.map(({ state }) => state));

  return {
    submittedAt,
    completedAt,
    state,
  };
}

/** @param {{ name: string; description: string; search_ids: number[] }} data */
export function createResearch({ name, description, search_ids }) {
  const body = JSON.stringify({ name, description, search_ids });
  return fetch('/posts', { method: 'POST', body })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
}

/** @param {ResearcherActionData | ReviewerActionData} data */
function dispatchUserAction({ type, payload }) {
  const body = JSON.stringify({ type, payload });
  return fetch('/user-action', { method: 'POST', body })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
}

/** @param {ResearcherActionData} data */
export function dispatchResearcherAction({ type, payload }) {
  switch (type) {
    case 'SUBMIT':
      return dispatchUserAction({ type, payload });
    default:
      return 'Not allowed!';
  }
}

/** @param {ReviewerActionData} data */
export function dispatchReviewerAction({ type, payload }) {
  switch (type) {
    case 'REQUEST_UPDATE':
    case 'APPROVE':
    case 'REJECT':
      return dispatchUserAction({ type, payload });
    default:
      return 'Not allowed!';
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { TableLayout } from './Layouts';
import Table from '../Table/Table';
import Button from '../components/Button';
import { combineRequestsInfo, formatTimestamp } from './utils';
import './typedef';

/**
 * @typedef {object} DataRequestTableData
 * @property {number} id
 * @property {string} name
 * @property {DataRequest[]} [requests]
 * @property {Timestamp} [submitted_at]
 * @property {Timestamp} [completed_at]
 * @property {DataRequestState} [state]
 * @property {{ name:string }} [project]
 * @property {User} [researcher]
 */

/**
 * @param {DataRequestTableData[]} data
 * @param {(path: string) => void} navigateTo
 */
function getResearcherTableProps(data, navigateTo) {
  return {
    title: 'List of My Requests',
    header: [
      'ID',
      'Research Name',
      'Number of requests',
      'Submitted Date',
      'Completed Date',
      'Status',
      '',
    ],
    data: data.map(({ id, name, requests }) => {
      const { submittedAt, completedAt, state } = combineRequestsInfo(requests);
      const button = (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {state === 'NOT_SUBMITTED' || state === 'UPDATE_REQUESTED' ? (
            <Button
              label="Edit"
              buttonType="secondary"
              onClick={() => navigateTo(`/research-projects/${id}`)}
            />
          ) : (
            <Button
              label="Open"
              buttonType="default"
              onClick={() => navigateTo(`/research-projects/${id}`)}
            />
          )}
        </div>
      );
      return [
        id,
        name,
        requests.length,
        submittedAt,
        completedAt,
        state.replace('_', ' '),
        button,
      ];
    }),
  };
}

/**
 * @param {DataRequestTableData[]} data
 * @param {(path: string) => void} navigateTo
 */
function getReviewerTableProps(data, navigateTo) {
  return {
    title: 'List of Received Requests',
    header: [
      'ID',
      'Research Name',
      'Principal Investigator',
      'Submitted Date',
      'Completed Date',
      'Status',
      '',
    ],
    data: data.map(
      ({ id, project, researcher, submitted_at, completed_at, state }) => {
        const researcherName = `${researcher.first_name} ${researcher.last_name}`;
        const submittedAt = formatTimestamp(submitted_at);
        const completedAt = formatTimestamp(completed_at);
        const button = (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {state === 'UNDER_REVIEW' ? (
              <Button
                label="Review"
                buttonType="secondary"
                onClick={() => navigateTo(`/${id}`)}
              />
            ) : (
              <Button
                label="Open"
                buttonType="default"
                onClick={() => navigateTo(`/${id}`)}
              />
            )}
          </div>
        );
        return [
          id,
          project.name,
          researcherName,
          submittedAt,
          completedAt,
          state.replace('_', ' '),
          button,
        ];
      },
    ),
  };
}

/**
 * @param {object} prop
 * @param {{ type: 'researcher' | 'reviewer' }} prop.user
 * @param {DataRequestTableData[]} prop.data
 */
function DataRequest({ user, data }) {
  const history = useHistory();
  /** @type {(path: string) => void} */
  const navigateTo = (path) => history.push(path);

  const isUserResearcher = user.type === 'researcher';
  const tableProps = isUserResearcher
    ? getResearcherTableProps(data, navigateTo)
    : getReviewerTableProps(data, navigateTo);

  return (
    <TableLayout header={{ showRequestButton: isUserResearcher }}>
      <Table {...tableProps} />
    </TableLayout>
  );
}

DataRequest.propTypes = {
  user: PropTypes.shape({
    type: PropTypes.oneOf(['researcher', 'reviewer']),
  }),
  data: PropTypes.arrayOf(PropTypes.object),
};

export default DataRequest;

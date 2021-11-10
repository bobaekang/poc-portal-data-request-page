import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import SimpleInputField from '../components/SimpleInputField';
import { ChooseActionModal } from './Modals';
import { formatTimestamp } from './utils';
import './DataRequest.css';
import './typedef';

/**
 * @typedef {object} DataRequestReviewData
 * @property {number} id
 * @property {string} consortium
 * @property {DataRequestState} state
 * @property {Timestamp} submitted_at
 * @property {Timestamp} completed_at
 * @property {Attribute[]} attributes
 * @property {ReviewerActionType[]} available_use_actions
 * @property {{ id: number; name: string; description: string}} project
 * @property {User} researcher
 */

/**
 * @param {object} props
 * @param {DataRequestReviewData} props.data
 */
function ReviewForm({ data }) {
  const history = useHistory();
  const handleBack = () => history.push('/');

  const [showChooseAction, setShowChooseAction] = useState(false);
  return (
    <div className="data-request">
      <div className="data-request__header">
        <div className="data-request__header__title">
          <h1>Review Data Request (ID: {data.id})</h1>
        </div>
        <p className="data-request__header__date">
          Sumitted date: {formatTimestamp(data.submitted_at)}
        </p>
        <p className="data-request__header__date">
          Completed date: {formatTimestamp(data.completed_at)}
        </p>
      </div>
      <div className="data-request__body">
        <div className="data-request-form">
          <div className="data-request-form__main">
            <SimpleInputField
              label="Research Title"
              input={<input type="text" disabled value={data.project.name} />}
            />
            <SimpleInputField
              label="Research Description"
              input={<textarea disabled value={data.project.description} />}
            />
            <SimpleInputField
              label="Principal Invesigator"
              input={
                <input
                  type="text"
                  disabled
                  value={`${data.researcher.first_name} ${data.researcher.last_name}`}
                />
              }
            />
            <SimpleInputField
              label="Institution"
              input={
                <input
                  type="text"
                  disabled
                  value={data.researcher.institution}
                />
              }
            />
            {data.attributes.map((attr) => (
              <SimpleInputField
                key={attr.name}
                label={attr.name}
                input={<input value={attr.value} type={attr.type} disabled />}
              />
            ))}
            <div className="data-request-form__button-group">
              <Button label="Back" buttonType="default" onClick={handleBack} />
              {data.state === 'UNDER_REVIEW' && (
                <Button
                  label="Choose Action"
                  buttonType="secondary"
                  onClick={() => setShowChooseAction(true)}
                />
              )}
            </div>
          </div>
          {showChooseAction && (
            <div
              className="data-request-overlay"
              style={{ justifyContent: 'flex-end' }}
            >
              <ChooseActionModal
                onSubmit={() => {}}
                onClose={() => setShowChooseAction(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ReviewForm.propTypes = {
  data: PropTypes.object,
};

export default ReviewForm;

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import './DataRequest.css';
import { useHistory } from 'react-router-dom';

/**
 * @param {object} prop
 * @param {React.ReactNode} prop.header
 * @param {React.ReactNode} prop.body
 */
function BaseLayout({ header, body }) {
  return (
    <div className="data-request">
      <div className="data-request__header">{header}</div>
      <div className="data-request__body">{body}</div>
    </div>
  );
}

BaseLayout.propTypes = {
  header: PropTypes.node,
  body: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

/**
 * @param {object} prop
 * @param {{ title?:string; showRequestButton?:boolean; }} prop.header
 * @param {React.ReactNode} prop.children
 */
export function TableLayout({ header, children }) {
  const history = useHistory();
  return (
    <BaseLayout
      header={
        <div className="data-request__header__title">
          <h1>{header?.title || 'Data Request'}</h1>
          {header?.showRequestButton && (
            <Button
              className="data-request__header__button"
              label="Request Data"
              onClick={() => history.push('/research-projects')}
            />
          )}
        </div>
      }
      body={children}
    />
  );
}

TableLayout.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    showRequestButton: PropTypes.bool,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

/**
 * @param {object} prop
 * @param {{ title?: string; dates?: { submittedAt: string; completedAt: string } }} prop.header
 * @param {React.ReactNode} prop.children
 */
export function FormLayout({ header, children }) {
  return (
    <BaseLayout
      header={
        <>
          <div className="data-request__header__title">
            <h1>{header?.title || 'Data Request'}</h1>
          </div>
          {header?.dates?.submittedAt && (
            <p className="data-request__header__date">
              Sumitted date: {header.dates.submittedAt}
            </p>
          )}
          {header?.dates?.completedAt && (
            <p className="data-request__header__date">
              Completed date: {header.dates.completedAt}
            </p>
          )}
        </>
      }
      body={children}
    />
  );
}

FormLayout.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    dates: PropTypes.shape({
      submittedAt: PropTypes.string,
      completedAt: PropTypes.string,
    }),
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

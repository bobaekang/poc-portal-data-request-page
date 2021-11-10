import React from 'react';
import PropTypes from 'prop-types';
import './DataRequest.css';
/**
 * @param {object} prop
 * @param {{ title?: string; dates?: { submittedAt: string; completedAt: string } }} prop.header
 * @param {React.ReactNode} prop.children
 */
export function FormLayout({ header, children }) {
  return (
    <div className="data-request">
      <div className="data-request__header">
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
      </div>
      <div className="data-request__body">{children}</div>
    </div>
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

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {object} prop
 * @param {string} prop.title
 * @param {React.ReactNode} prop.children
 * @param {React.MouseEventHandler} prop.onClose
 */
export default function BaseModal({ title, children, onClose }) {
  return (
    <div className="data-request-modal">
      <button className="data-request-modal__close" onClick={onClose}>
        ✕
      </button>
      <h2 className="data-request-modal__title">{title}</h2>
      <div className="data-request-modal__body">{children}</div>
    </div>
  );
}

BaseModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClose: PropTypes.func,
};

import React from 'react';
import './ErrorPage.css';

function ErrorPage(props) {
  return (
    <div className="error-page fade-in">
      {(props.error && (props.error.error || props.error.message)) || 'Something went wrong.'}
    </div>
  );
}

export default ErrorPage

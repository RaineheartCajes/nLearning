import React from 'react';

type SubmitButtonProps = {
  text: string;
  onClick: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick }) => {
  return (
    <button type="submit" className="btn btn-primary" onClick={onClick}>
      {text}
    </button>
  );
};

export default SubmitButton;

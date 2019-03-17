import React from 'react';

interface IProps {
  content: string;
}

const Text = ({ content }: IProps) => {
  return <p>{content}</p>;
};

export default Text;

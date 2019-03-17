import React from 'react';

interface IProps {
  content: string;
}

const Image = ({ content }: IProps) => {
  return <img src={`${process.env.REACT_APP_HOST}${content}`} />;
};

export default Image;

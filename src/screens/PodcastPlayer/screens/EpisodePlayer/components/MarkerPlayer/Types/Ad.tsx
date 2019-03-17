import React from 'react';

interface IProps {
  link: string;
  content: string;
}

const Ad = ({ link, content }: IProps) => {
  return <a href={link}>{content}</a>;
};

export default Ad;

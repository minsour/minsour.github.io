import React, { useRef, useState, useEffect } from 'react';
import { Div, Li } from '../styledComponents';
import { Link } from 'gatsby';
import TextClamp from 'react-string-clamp';
import { useHover } from '../../hooks';

const PostingBody = ({ node }) => {
  const hoverRef = useRef<HTMLDivElement>(undefined);
  const isHovered = useHover(hoverRef);

  return (
    <Li
      key={node.id}
      margin='1rem 0'
      background='white'
      boxShadow='0 0.1rem 0.5rem 0 rgba(0, 0, 0, 0.05)'
      padding='1.8rem 1.8rem 1.4rem 1.8rem'
    >
      <div ref={hoverRef}>
        <Link
          to={node.frontmatter.path}
          style={{
            textDecoration: 'none',
            color: 'black',
          }}
        >
          <Div
            fontFamily='BMHANNAAir'
            fontSize='1.6rem'
            fontWeight='bold'
            color={isHovered && '#003399'}
          >
            <TextClamp text={node.frontmatter.title} lines={1} />
          </Div>
          <Div fontFamily='godic' fontSize='1rem' margin='0.7rem 0'>
            <TextClamp text={node.excerpt} lines={2} />
          </Div>
          <Div fontFamily='godic' fontSize='0.9rem' color='gray' margin='0.8rem 0 0rem 0'>
            <TextClamp text={node.frontmatter.date} lines={1} />
          </Div>
        </Link>
      </div>
    </Li>
  );
};

export default PostingBody;

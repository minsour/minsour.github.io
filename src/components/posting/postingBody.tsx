import React, { useRef, useState, useEffect, useContext } from 'react';
import { Div, Li } from '../styledComponents';
import { Link } from 'gatsby';
import TextClamp from 'react-string-clamp';
import { useHover, ThemeContext } from '../../hooks';
import { FONT } from '../../constants';

const PostingBody = ({ node }) => {
  const hoverRef = useRef<HTMLDivElement>(undefined);
  const isHovered = useHover(hoverRef);
  const { theme } = useContext(ThemeContext);

  return (
    <Li
      key={node.id}
      margin='1rem 0'
      background={theme.contentBackground}
      boxShadow='0 0.1rem 0.5rem 0 rgba(0, 0, 0, 0.1)'
      padding='1.8rem 1.8rem 1.4rem 1.8rem'
      hoverBackground={isHovered && 'rgba(240,240,240,0.5)'}
    >
      <div ref={hoverRef}>
        <Link
          to={node.frontmatter.path}
          style={{
            textDecoration: 'none',
            color: theme.font,
          }}
        >
          <Div
            fontFamily={FONT.primary}
            fontSize='1.6rem'
            fontWeight='bold'
            color={isHovered && theme.hover}
          >
            <TextClamp text={node.frontmatter.title} lines={1} />
          </Div>
          <Div fontFamily={FONT.contents} fontSize='1rem' margin='0.7rem 0'>
            <TextClamp text={node.excerpt} lines={2} />
          </Div>
          <Div
            fontFamily={FONT.primary}
            fontSize='0.9rem'
            color={theme.date}
            margin='0.8rem 0 0rem 0'
          >
            <TextClamp text={node.frontmatter.date} lines={1} />
          </Div>
        </Link>
      </div>
    </Li>
  );
};

export default PostingBody;

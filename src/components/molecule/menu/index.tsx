import React, { useCallback } from 'react';
import { IComponentProps } from '../../../interfaces';
import { Nav, Button, Div } from '../../atoms';
import { Link, graphql, useStaticQuery } from 'gatsby';
import MenuTitle from './menuTitle';
import MenuItem from './menuItem';

interface IMenuProps extends IComponentProps {
  open?: boolean;
  clickButton?: () => void;
}

const categories = ['devlog', 'lifelog'];
const subCategories = ['web', 'react', 'blockchain'];

const Menu = (props: IMenuProps) => {
  const data = useStaticQuery(graphql`
    query Query {
      allMarkdownRemark {
        totalCount
        nodes {
          frontmatter {
            category
            subCategory
          }
        }
      }
    }
  `).allMarkdownRemark;

  const categoryCount = new Map<string, number>();

  categories.forEach(category => {
    let count = 0;
    data.nodes.forEach(node => {
      if (node.frontmatter.category === category) {
        count++;
      }
    });
    categoryCount.set(category, count);
  });
  subCategories.forEach(category => {
    let count = 0;
    data.nodes.forEach(node => {
      if (node.frontmatter.subCategory === category) {
        count++;
      }
    });
    categoryCount.set(category, count);
  });

  return (
    <>
      <Button
        open={props.open}
        onClick={props.clickButton}
        display='flex'
        position='absolute'
        top='1.55rem'
        left='2rem'
        flexDirection='column'
        justifyContent='space-around'
        width='27px'
        height='27px'
        background='transparent'
        border='none'
        padding='0'
        zIndex={10}
        burger
      >
        <Div />
        <Div />
        <Div />
      </Button>
      <Nav
        open={props.open}
        background='white'
        width='340px'
        display='flex'
        flexDirection='column'
        textAlign='left'
        padding='106px 45px'
        transition='transform 0.3s ease-in-out'
        position='absolute'
        top={0}
        left={0}
        height='100vh'
        zIndex={5}
      >
        <MenuTitle title={`분류 전체(Total) (${data.totalCount})`} path='/' onClick={props.clickButton} />
        <MenuTitle
          title={`개발(Devlog) (${categoryCount.get('devlog')})`}
          path='search?category=devlog'
          onClick={props.clickButton}
        >
          <MenuItem path={`search?category=web`} onClick={props.clickButton}>{`웹(Web) (${categoryCount.get(
            'web',
          )})`}</MenuItem>
          <MenuItem path={`search?category=react`} onClick={props.clickButton}>{`리액트(React) (${categoryCount.get(
            'react',
          )})`}</MenuItem>
          <MenuItem
            path={`search?category=blockchain`}
            onClick={props.clickButton}
          >{`블록체인(Blockchain) (${categoryCount.get('blockchain')})`}</MenuItem>
        </MenuTitle>
        <MenuTitle
          title={`생각(Lifelog) (${categoryCount.get('lifelog')})`}
          path='search?category=lifelog'
          onClick={props.clickButton}
        />
      </Nav>
    </>
  );
};

export default Menu;

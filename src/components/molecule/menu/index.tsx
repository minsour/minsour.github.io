import React, { useCallback } from 'react';
import { IComponentProps } from '../../../interfaces';
import { Nav, Button, Div } from '../../atoms';
import { Link, graphql, useStaticQuery } from 'gatsby';
import MenuTitle from './menuTitle';
import MenuItem from './menuItem';
import MenuLayout from './menuLayout';

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
    <MenuLayout open={props.open} clickButton={props.clickButton}>
      <MenuTitle title={`분류 전체(Total) (${data.totalCount})`} path='/' onClick={props.clickButton} />
      <MenuTitle
        title={`개발(Devlog) (${categoryCount.get('devlog')})`}
        path='?category=devlog'
        onClick={props.clickButton}
      >
        <MenuItem path={`?category=web`} onClick={props.clickButton}>{`웹(Web) (${categoryCount.get(
          'web',
        )})`}</MenuItem>
        <MenuItem path={`?category=react`} onClick={props.clickButton}>{`리액트(React) (${categoryCount.get(
          'react',
        )})`}</MenuItem>
        <MenuItem path={`?category=blockchain`} onClick={props.clickButton}>{`블록체인(Blockchain) (${categoryCount.get(
          'blockchain',
        )})`}</MenuItem>
      </MenuTitle>
      <MenuTitle
        title={`생각(Lifelog) (${categoryCount.get('lifelog')})`}
        path='?category=lifelog'
        onClick={props.clickButton}
      />
    </MenuLayout>
  );
};

export default Menu;

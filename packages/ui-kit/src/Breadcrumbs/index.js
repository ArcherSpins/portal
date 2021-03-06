
// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
import styles from './Breadcrumbs.module.scss';

type Props = {
  routes: {
    [string]: mixed
  },
className?: string
};

type PropsChildren = {
  children: Node
}

const BreadcrumbsComponent = ({ routes, className, ...restProps }: Props) => (
  <Breadcrumbs
    WrapperComponent={
      (props: PropsChildren) => (
        <ol className={classNames(styles.breadcrumbs, className)}>{props.children}</ol>
      )
    }
    ActiveLinkComponent={(props: PropsChildren) => <li className={styles['active-link']}>{props.children}</li>}
    LinkComponent={(props: PropsChildren) => (
      <li className={styles.link}>
        {props.children}
        <i className="icon-right-open" />
      </li>
    )}
    mappedRoutes={routes}
    {...restProps}
  />
);

BreadcrumbsComponent.defaultProps = {
  className: '',
};

export default BreadcrumbsComponent;

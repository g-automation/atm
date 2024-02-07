import './styles.css';

import React from 'react';

interface NavbarTopProps {
  logo: string;
  title: string;
  links: Array<{
    label: string;
    url: string;
  }>;
  action?: string;
  onAction?: () => void;
}

const NavbarTop: React.FC<NavbarTopProps> = ({
  logo,
  title,
  links,
  action,
  onAction,
}) => {
  return (
    <div className="NavbarTop-container">
      <div className="NavbarTop-logo">
        {logo}
        <b>{title}</b>
      </div>
      <nav className="NavbarTop-nav">
        <ul>
          {links.map(link => (
            <li key={link.label}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
          {Boolean(onAction) && (
            <button className="NavbarTop-button" onClick={onAction}>
              {action}
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavbarTop;

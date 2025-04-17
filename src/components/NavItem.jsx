import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function NavItem({ to, icon, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200',
          'text-gray-900 hover:bg-blue-200',
          isActive && 'bg-blue-300 font-semibold'
        )
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
}
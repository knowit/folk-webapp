import React from 'react';
import { useLocation } from 'react-router-dom';

export default function EmployeeSite() {
  const location = useLocation();
  const email = location.pathname.split('/')[2];
  return <h1>{email}</h1>;
}

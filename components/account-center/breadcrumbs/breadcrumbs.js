import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

export default function Breadcrumbs({ currentPage }) {
  const { auth } = useAuth();
  return (
    <>
      <ul>
        <li>
          <Link href="/">首頁</Link>
        </li>
        <li>
          <Link href={`/account/index/${auth.id}`}>會員中心</Link>
        </li>
        <li>{currentPage}</li>
      </ul>
    </>
  );
}

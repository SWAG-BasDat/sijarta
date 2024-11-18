'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  User, 
  Home, 
  Wallet, 
  ShoppingBag, 
  Percent, 
  UserCircle, 
  LogOut, 
  Briefcase, 
  Clock 
} from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname(); 

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  }

  const NavLink: React.FC<NavLinkProps> = ({ href, children, icon: Icon }) => {
    const isActive = pathname === href;

    return (
      <Link href={href} className={`
        flex whitespace-nowrap items-center w-auto gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700/50'}
      `}>
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </Link>
    );
  };

  const renderNavLinks = () => {
    // Loading state
    if (status === 'loading') {
      return null;
    }

    // Guest view
    if (!session?.user) {
      return (
        <>
          <NavLink href="/login" icon={User}>Login</NavLink>
          <NavLink href="/register" icon={User}>Register</NavLink>
        </>
      );
    }

    // Authenticated view
    const userName = session.user.nama || 'User';
    const isWorker = session.user.isPekerja;

    return (
      <>
        <div className="px-4 py-2 text-yellow-400">
          <div className="font-semibold">{isWorker ? 'Pekerja' : 'Pengguna'}</div>
          <div className="text-sm whitespace-nowrap">{userName}</div>
        </div>

        {/* Common Links */}
        <NavLink href="/homepage" icon={Home}>Homepage</NavLink>
        <NavLink href="/myPay" icon={Wallet}>MyPay</NavLink>
        <NavLink href="/profile" icon={UserCircle}>Profile</NavLink>

        {/* Role-Specific Links */}
        {isWorker ? (
          <>
            <NavLink href="/pekerjaanJasa" icon={Briefcase}>Kelola Pekerjaan Saya</NavLink>
            <NavLink href="/statusPekerjaanJasa" icon={Clock}>Kelola Status Pekerjaan</NavLink>
          </>
        ) : (
          <>
            <NavLink href="/pemesananJasa" icon={ShoppingBag}>Kelola Pesanan Saya</NavLink>
            <NavLink href="/diskon" icon={Percent}>Diskon</NavLink>
          </>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-blue-100 hover:bg-blue-700/50 rounded-lg transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-yellow-400 font-bold text-xl">SIJARTA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {renderNavLinks()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {renderNavLinks()}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;

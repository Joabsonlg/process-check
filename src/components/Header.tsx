"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  CheckCircle2, 
  Menu, 
  X, 
  BarChart3, 
  Target, 
  ClipboardList, 
  Info 
} from "lucide-react";

const navigation = [
  { name: "Processos", href: "/assessment", icon: BarChart3 },
  { name: "Matriz", href: "/matrix", icon: Target },
  { name: "Checklist", href: "/results", icon: ClipboardList },
  { name: "Sobre", href: "/about", icon: Info },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">ProcessCheck</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Explorar Processos
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-gray-50">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link
                  href="/assessment"
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-indigo-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Explorar Processos
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
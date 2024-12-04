"use client";

import { navigationPages } from "@/config/constants";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

const setCurrentPath = (pathName: string) => {
  const currentPath = pathName;
  console.log(`currentPath ${currentPath}`);
  for (const tab of navigationPages) {
    if (tab.href === currentPath) {
      tab.current = true;
    } else {
      tab.current = false;
    }
  }
}

const Navigation = (): ReactElement => {
  const pathname = usePathname();
  setCurrentPath(pathname);
  function handleTabChange() {
    const tabElement = document.getElementById('tabs') as HTMLSelectElement;
    const selectedPath = tabElement.value;
    document.location = selectedPath;
  }

  return (
    <div>
      <div className="sm:hidden p-2 flex flex-col gap-1">
        <div>Navigation Menu</div>
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full bg-gray-100 p-4 focus:ring-gray-500 focus:border-gray-500 border-gray-300 rounded-md"
          defaultValue={(navigationPages.find((tab) => tab.current) || { href: 'unknown' }).href}
          onChange={handleTabChange}
        >
          {navigationPages.map((tab) => (
            <option key={`tab_${tab.name}`} value={tab.href}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
          {navigationPages.map((tab, tabIdx) => (
            <a
              key={tab.name}
              href={tab.href}
              target={tab.target}
              className={classNames(
                tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === navigationPages.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 flex items-center justify-center gap-1'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              <div className="flex items-center">
                {tab.name}
                
              </div>
              {tab.target === '_blank' && <div><HiOutlineExternalLink /></div>}
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? 'bg-gray-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
};

export default Navigation;
import { ReactElement } from "react"
import { navigationPages } from "../config/constants";
import { Router, withRouter } from 'next/router';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const setCurrentPath = (router: Router) => {
    const currentPath = router.pathname;
    console.log(`currentPath ${currentPath}`);
    for (const tab of navigationPages) {
        console.log(tab.href)
        if (tab.href === currentPath) {
            tab.current = true;
        } else {
            tab.current = false;
        }
    }
}


const Navigation = ({ router }): ReactElement => {
    setCurrentPath(router);
    console.log(navigationPages);
    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                id="tabs"
                name="tabs"
                className="block w-full focus:ring-gray-500 focus:border-gray-500 border-gray-300 rounded-md"
                defaultValue={navigationPages.find((tab) => tab.current || {name: 'unknown'}).name}
                >
                {navigationPages.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
                {navigationPages.map((tab, tabIdx) => (
                    <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                        tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                        tabIdx === 0 ? 'rounded-l-lg' : '',
                        tabIdx === navigationPages.length - 1 ? 'rounded-r-lg' : '',
                        'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                    >
                    <span>{tab.name}</span>
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

export default withRouter(Navigation);
import Link from "next/link";

export interface NavItemInterface {
    url: string;
    label: string;
    isActive?: boolean;
}

export default function NavItem(props: NavItemInterface) {
    return (
        <li>
            <Link 
                href={props.url} 
                className={`text-base no-underline py-1 transition-colors duration-300
                            ${props.isActive 
                                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                                : 'text-gray-800 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-b-2 hover:border-indigo-600 dark:hover:border-indigo-400'}`}>
                {props.label}
            </Link>
        </li>
    );
}
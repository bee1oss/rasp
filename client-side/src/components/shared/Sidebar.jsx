import React from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { FcCalendar  } from 'react-icons/fc'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/constants'
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const onClickLogout = () => {
		if (window.confirm("Are you sure you want to logout")) {
		  dispatch(logout());
		  window.localStorage.removeItem("token");
		}
	  };


	return (
		<div className="bg-neutral-900 w-60 p-3 flex flex-col">
			{isAuth ? (
			<>
			<div className="flex items-center gap-2 px-1 py-3">
				<FcCalendar  fontSize={24} />
				<span className="text-neutral-200 text-lg">Rasp</span>
			</div>
			<div className="py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				</div>
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
				
				<div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
					<span className="text-xl" >
						<HiOutlineLogout variant="contained" color="error"/>
					</span>
					<Link to="/layout">
					<button onClick={onClickLogout} class="bg-sky-500 shadow-lg shadow-sky-500/50 text-white font-bold py-2 px-12 rounded">
  					Logout
					</button>
                </Link>
				</div>
			</div>
			</>
			):(
			<>
                <Link to="/">
				<button class="bg-sky-500 shadow-lg shadow-sky-500/50 text-white font-bold w-full my-s py-2">
  					Login
				</button>
                </Link>
			</>
			)}
		</div>
	)
}

function SidebarLink({ link }) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	)
}

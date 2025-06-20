import { Link, useLocation } from "@tanstack/react-router"
import { useState } from "react"

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const location = useLocation()

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const isActive = (path) => {
		return location.pathname === path
	}

	return (
		<header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<a href="#" className="text-2xl font-['Pacifico'] text-primary">Yasin Ateş</a>
				<nav className="hidden md:flex items-center space-x-8">
					<Link
						to="/"
						className={`nav-link font-medium transition-colors ${
							isActive('/')
								? 'text-primary border-b-2 border-primary'
								: 'text-gray-800 hover:text-primary'
						}`}
					>
						Anasayfa
					</Link>
					<Link
						to="/hakkimda"
						className={`nav-link font-medium transition-colors ${
							isActive('/hakkimda')
								? 'text-primary border-b-2 border-primary'
								: 'text-gray-800 hover:text-primary'
						}`}
					>
						Hakkımda
					</Link>
					<Link
						to="/projeler"
						className={`nav-link font-medium transition-colors ${
							isActive('/projeler')
								? 'text-primary border-b-2 border-primary'
								: 'text-gray-800 hover:text-primary'
						}`}
					>
						Projeler
					</Link>
					<Link
						to="/blog"
						className={`nav-link font-medium transition-colors ${
							isActive('/blog')
								? 'text-primary border-b-2 border-primary'
								: 'text-gray-800 hover:text-primary'
						}`}
					>
						Blog Yazıları
					</Link>
					<Link
						to="/iletisim"
						className={`nav-link font-medium transition-colors ${
							isActive('/iletisim')
								? 'text-primary border-b-2 border-primary'
								: 'text-gray-800 hover:text-primary'
						}`}
					>
						İletişim
					</Link>
				</nav>
				<button
					className="md:hidden flex items-center justify-center w-10 h-10 text-gray-800"
					onClick={toggleMobileMenu}
				>
					<i className={`ri-lg transition-transform ${
						isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'
					}`}></i>
				</button>
			</div>
			<div className={`md:hidden bg-white shadow-md absolute w-full transition-all duration-300 ${
				isMobileMenuOpen ? 'block' : 'hidden'
			}`}>
				<div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
					<Link
						to="/"
						className={`py-2 font-medium transition-colors ${
							isActive('/')
								? 'text-primary border-l-4 border-primary pl-4'
								: 'text-gray-800 hover:text-primary'
						}`}
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Anasayfa
					</Link>
					<Link
						to="/hakkimda"
						className={`py-2 font-medium transition-colors ${
							isActive('/hakkimda')
								? 'text-primary border-l-4 border-primary pl-4'
								: 'text-gray-800 hover:text-primary'
						}`}
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Hakkımda
					</Link>
					<Link
						to="/projeler"
						className={`py-2 font-medium transition-colors ${
							isActive('/projeler')
								? 'text-primary border-l-4 border-primary pl-4'
								: 'text-gray-800 hover:text-primary'
						}`}
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Projeler
					</Link>
					<Link
						to="/blog"
						className={`py-2 font-medium transition-colors ${
							isActive('/blog')
								? 'text-primary border-l-4 border-primary pl-4'
								: 'text-gray-800 hover:text-primary'
						}`}
						onClick={() => setIsMobileMenuOpen(false)}
					>
						Blog Yazıları
					</Link>
					<Link
						to="/iletisim"
						className={`py-2 font-medium transition-colors ${
							isActive('/iletisim')
								? 'text-primary border-l-4 border-primary pl-4'
								: 'text-gray-800 hover:text-primary'
						}`}
						onClick={() => setIsMobileMenuOpen(false)}
					>
						İletişim
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
import { Link } from "@tanstack/react-router"

const Header = () => {
	return (
		<header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<a href="#" className="text-2xl font-['Pacifico'] text-primary">Yasin Ateş</a>
				<nav className="hidden md:flex items-center space-x-8">

					<Link to="/" className="nav-link text-gray-800 font-medium hover:text-primary transition-colors">Anasayfa</Link>
					<Link to="/hakkimda" className="nav-link text-gray-800 font-medium hover:text-primary transition-colors">Hakkımda</Link>
					<Link to="/blog" className="nav-link text-gray-800 font-medium hover:text-primary transition-colors">Blog Yazıları</Link>
					{/* <Link to="/projects" className="nav-link text-gray-800 font-medium hover:text-primary transition-colors">Projelerim</Link> */}
					<Link to="/iletisim" className="nav-link text-gray-800 font-medium hover:text-primary transition-colors">İletişim</Link>



				</nav>
				<button className="md:hidden flex items-center justify-center w-10 h-10 text-gray-800" id="mobile-menu-button">
					<i className="ri-menu-line ri-lg"></i>
				</button>
			</div>
			<div className="md:hidden hidden bg-white shadow-md absolute w-full" id="mobile-menu">
				<div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
					<a href="#home" className="py-2 text-gray-800 font-medium hover:text-primary transition-colors">Anasayfa</a>
					<a href="#about" className="py-2 text-gray-800 font-medium hover:text-primary transition-colors">Hakkımda</a>
					<a href="#blog" className="py-2 text-gray-800 font-medium hover:text-primary transition-colors">Blog</a>
					<a href="#projects" className="py-2 text-gray-800 font-medium hover:text-primary transition-colors">Projeler</a>
					<a href="#contact" className="py-2 text-gray-800 font-medium hover:text-primary transition-colors">İletişim</a>
				</div>
			</div>
		</header>
	)
}

export default Header
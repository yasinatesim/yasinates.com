
const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-xl font-['Pacifico'] mb-4">Yasin Ateş</h3>
						<p className="text-gray-400 mb-4">
							Frontend Developer & Müzik Tutkunu
						</p>
						<p className="text-gray-400">
							İstanbul, Türkiye
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">Hızlı Erişim</h3>
						<ul className="space-y-2">
							<li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Anasayfa</a></li>
							<li><a href="#about" className="text-gray-400 hover:text-white transition-colors">Hakkımda</a></li>
							<li><a href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
							<li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projeler</a></li>
							<li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">İletişim</a></li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">Sosyal Medya</h3>
						<div className="flex flex-wrap gap-3">
							<a href="https://github.com/yasinatesim" target="_blank" className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors">
								<i className="ri-github-fill"></i>
							</a>
							<a href="https://linkedin.com/in/yasinatesim" target="_blank" className="w-10 h-10 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-600 transition-colors">
								<i className="ri-linkedin-fill"></i>
							</a>
							<a href="https://instagram.com/yasinatesim" target="_blank" className="w-10 h-10 flex items-center justify-center bg-pink-600 text-white rounded-full hover:bg-pink-500 transition-colors">
								<i className="ri-instagram-fill"></i>
							</a>
							<a href="https://twitter.com/yasinatesim" target="_blank" className="w-10 h-10 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-300 transition-colors">
								<i className="ri-twitter-fill"></i>
							</a>
							<a href="https://medium.com/@yasinatesim" target="_blank" className="w-10 h-10 flex items-center justify-center bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
								<i className="ri-medium-fill"></i>
							</a>
							<a href="https://dev.to/yasinatesim" target="_blank" className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-900 transition-colors">
								<i className="ri-code-box-fill"></i>
							</a>
						</div>
					</div>
				</div>
				<div className="border-t border-gray-800 mt-10 pt-6 text-center">
					<p className="text-gray-400">
						&copy; 2025 Yasin Ateşim. Tüm hakları saklıdır.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
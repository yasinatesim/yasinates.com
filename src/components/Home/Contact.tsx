import React from 'react'

const Contact = () => {
	return (
		<section id="contact" className="py-20 bg-indigo-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">İletişim</h2>
					<p className="text-gray-600 max-w-2xl mx-auto text-lg">Yeni projeler, işbirlikleri ve fikirleriniz için iletişime geçmekten çekinmeyin!</p>
				</div>
				<div className="max-w-xl mx-auto">
					<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 md:p-12 border border-primary/10">
						<div className="flex flex-col items-center mb-10">
							<div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow mb-4">
								<i className="ri-mail-line text-2xl text-white"></i>
							</div>
							<p className="text-base text-gray-700 mb-2 text-center">
								Projeleriniz, işbirliği teklifleriniz veya sorularınız için bana ulaşabilirsiniz.
							</p>
							<a href="mailto:yasinatesim@gmail.com" className="text-lg font-medium text-primary hover:underline transition-all">yasinatesim@gmail.com</a>
						</div>
						<div className="flex flex-col items-center">
							<h3 className="text-lg font-semibold mb-5 text-black">Sosyal Medya</h3>
							<div className="flex flex-wrap justify-center gap-3">
								<a href="https://github.com/yasinatesim" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-200 shadow-sm">
									<i className="ri-github-fill text-xl"></i>
								</a>
								<a href="https://linkedin.com/in/yasinatesim" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 flex items-center justify-center rounded-full border border-blue-100 bg-white text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-200 shadow-sm">
									<i className="ri-linkedin-fill text-xl"></i>
								</a>
								<a href="https://instagram.com/yasinatesim" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 flex items-center justify-center rounded-full border border-pink-100 bg-white text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-200 shadow-sm">
									<i className="ri-instagram-fill text-xl"></i>
								</a>
								<a href="https://twitter.com/yasinatesim" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 hover:bg-black hover:text-white transition-all duration-200 shadow-sm">
									{/* X (Twitter) ikonu - zarif stil */}
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" fill="none">
										<path d="M19.615 13.295 28.045 4h-2.13l-7.36 8.255L12.01 4H4.5l8.77 12.515L4.5 28h2.13l7.77-8.715L19.99 28h7.51l-7.885-14.705ZM6.97 5.522h4.18l13.09 20.956h-4.18L6.97 5.522Z" fill="currentColor"/>
									</svg>
								</a>
								<a href="https://medium.com/@yasinatesim" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-800 hover:text-white transition-all duration-200 shadow-sm">
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<ellipse cx="5.5" cy="12" rx="4.5" ry="7" fill="currentColor"></ellipse>
										<ellipse cx="18" cy="12" rx="2" ry="7" fill="currentColor"></ellipse>
										<ellipse cx="12" cy="12" rx="2.5" ry="7" fill="currentColor"></ellipse>
									</svg>
								</a>
								<a href="https://dev.to/yasinatesim" target="_blank" rel="noopener noreferrer" className="group w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 bg-white text-black hover:bg-black hover:text-white transition-all duration-200 shadow-sm">
									<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path d="M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.198h.701a.786.786 0 0 0 .469-.175c.155-.117.233-.292.233-.525v-2.798c.001-.233-.079-.408-.234-.525zM19.236 3H4.764C3.791 3 3.002 3.787 3 4.76v14.48c.002.973.791 1.76 1.764 1.76h14.473c.973 0 1.762-.787 1.764-1.76V4.76A1.765 1.765 0 0 0 19.236 3zM9.195 13.414c0 .755-.466 1.901-1.942 1.898H5.389V8.665h1.903c1.424 0 1.902 1.144 1.903 1.899v2.85zm4.045-3.562H11.1v1.544h1.309v1.188H11.1v1.543h2.142v1.188h-2.498a.813.813 0 0 1-.833-.792V9.497a.813.813 0 0 1 .792-.832h2.539l-.002 1.187zm4.165 4.632c-.531 1.235-1.481.99-1.906 0l-1.548-5.818h1.309l1.193 4.569 1.188-4.569h1.31l-1.546 5.818z"/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Contact
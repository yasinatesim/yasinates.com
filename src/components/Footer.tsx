const navLinks = [
	{
		href: "/hakkimda",
		label: "Hakkımda",
		icon: (
			<svg width="20" height="20" fill="none" className="text-primary mr-2" viewBox="0 0 20 20">
				<path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.314 0-6 2.239-6 5v1h12v-1c0-2.761-2.686-5-6-5Z" fill="currentColor"/>
			</svg>
		)
	},
	{
		href: "/projeler",
		label: "Projeler",
		icon: (
			<svg width="20" height="20" fill="none" className="text-primary mr-2" viewBox="0 0 20 20">
				<path d="M2 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm2 0v8h12V6H4Zm3 2h2v4H7V8Zm4 0h2v4h-2V8Z" fill="currentColor"/>
			</svg>
		)
	},
	{
		href: "/blog",
		label: "Blog",
		icon: (
			<svg width="20" height="20" fill="none" className="text-primary mr-2" viewBox="0 0 20 20">
				<path d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4Zm0 2h12v10H4V5Zm2 2v2h8V7H6Zm0 4v2h5v-2H6Z" fill="currentColor"/>
			</svg>
		)
	},
	{
		href: "/iletisim",
		label: "İletişim",
		icon: (
			<svg width="20" height="20" fill="none" className="text-primary mr-2" viewBox="0 0 20 20">
				<path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2 0v.217l6 4.286 6-4.286V4H4Zm12 2.383-5.445 3.887a1 1 0 0 1-1.11 0L4 6.383V16h12V6.383Z" fill="currentColor"/>
			</svg>
		)
	}
];

const socialLinks = [
	{
		href: "https://github.com/yasinatesim",
		label: "GitHub",
		icon: (
			<svg width="22" height="22" fill="currentColor" className="transition-colors" viewBox="0 0 24 24">
				<path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/>
			</svg>
		)
	},
	{
		href: "https://linkedin.com/in/yasinatesim",
		label: "LinkedIn",
		icon: (
			<svg width="22" height="22" fill="currentColor" className="transition-colors" viewBox="0 0 24 24">
				<path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/>
			</svg>
		)
	},
	{
		href: "https://instagram.com/yasinatesim",
		label: "Instagram",
		icon: (
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
				<circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
				<circle cx="17" cy="7" r="1.2" fill="currentColor" />
			</svg>
		)
	},
	{
		href: "https://x.com/yasinatesim",
		label: "X",
		icon: (
			<svg width="22" height="22" fill="currentColor" className="transition-colors" viewBox="0 0 32 32">
				<path d="M19.48 13.4 28.06 4h-2.13l-7.2 7.89L12.1 4H4.5l9.02 13.01L4.5 28h2.13l7.61-8.34 6.01 8.34h7.6l-9.36-14.6Zm-2.7 2.97-.88-1.25L7.1 5.5h3.85l5.13 7.32.88 1.25 8.04 11.47h-3.85l-5.37-7.17Z"/>
			</svg>
		)
	},
	{
		href: "https://medium.com/@yasinatesim",
		label: "Medium",
		icon: (
			<svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="transition-all duration-200" xmlns="http://www.w3.org/2000/svg">
				<ellipse cx="5.5" cy="12" rx="4.5" ry="7" fill="currentColor"></ellipse>
				<ellipse cx="18" cy="12" rx="2" ry="7" fill="currentColor"></ellipse>
				<ellipse cx="12" cy="12" rx="2.5" ry="7" fill="currentColor"></ellipse>
			</svg>
		)
	},
	{
		href: "https://dev.to/yasinatesim",
		label: "DEV.to",
		icon: (
			// DÜZELTİLMİŞ DEV.TO ICONU (https://simpleicons.org/icons/devdotto.svg)
			<svg width="22" height="22" fill="currentColor" className="transition-colors" viewBox="0 0 24 24">
				<path d="M7.826 10.083c-.19-.14-.38-.21-.57-.21h-.44v4.254h.44c.19 0 .38-.07.57-.21.19-.14.28-.36.28-.67v-2.5c0-.31-.09-.53-.28-.67zm14.326-6.083h-20.304c-1.06 0-1.848.788-1.848 1.848v12.364c0 1.06.788 1.848 1.848 1.848h20.304c1.06 0 1.848-.788 1.848-1.848v-12.364c0-1.06-.788-1.848-1.848-1.848zm-13.326 10.254c0 .73-.21 1.3-.63 1.7-.42.4-.99.6-1.7.6h-1.44v-6.254h1.44c.71 0 1.28.2 1.7.6.42.4.63.97.63 1.7v2.554zm4.254 1.7c-.36.4-.86.6-1.5.6-.64 0-1.14-.2-1.5-.6-.36-.4-.54-.97-.54-1.7v-2.554c0-.73.18-1.3.54-1.7.36-.4.86-.6 1.5-.6.64 0 1.14.2 1.5.6.36.4.54.97.54 1.7v2.554c0 .73-.18 1.3-.54 1.7zm6.254-4.254h-1.5v1.5h1.06v1.06h-1.06v1.5h1.5v1.06h-2.12v-6.254h2.12v1.06z"/>
			</svg>
		)
	}
];

const Footer = () => {
	return (
		<footer className="bg-gradient-to-t from-gray-950 via-gray-900 to-gray-800 text-white py-14">
			<div className="max-w-6xl mx-auto px-6">
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
					{/* Sol: Hakkında ve Konum */}
					<div className="flex-1 flex flex-col items-start justify-start">
						<div className="mb-6">
							<div className="flex items-center gap-3 mb-2">
								<span className="text-2xl font-['Pacifico'] tracking-wide">Yasin Ateş</span>
							</div>
							<p className="text-gray-400 text-sm mb-2 max-w-xs">
								Merhaba! Ben Yasin, kullanıcı odaklı arayüzler geliştiren, yeni teknolojileri ve müziği seven bir frontend developer'ım.
							</p>
						</div>
						<div className="flex items-center gap-2 text-gray-400 text-sm">
							<svg width="18" height="18" fill="none" className="inline-block text-primary"><path d="M9 2.25A5.25 5.25 0 0 0 3.75 7c0 4.125 5.25 8.75 5.25 8.75S14.25 11.125 14.25 7A5.25 5.25 0 0 0 9 2.25Zm0 7.25A2 2 0 1 1 9 5.5a2 2 0 0 1 0 4Z" fill="currentColor"/></svg>
							<span>İstanbul, Türkiye</span>
						</div>
					</div>
					{/* Orta: Hızlı Erişim */}
					<div className="flex-1 flex flex-col items-start">
						<h3 className="text-lg font-semibold mb-4">Hızlı Erişim</h3>
						<nav>
							<ul className="flex flex-col gap-2">
								{navLinks.map(link => (
									<li key={link.href}>
										<a
											href={link.href}
											className="flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-primary hover:bg-gray-800 transition-colors font-medium text-base group"
										>
											<span className="flex-shrink-0">{link.icon}</span>
											<span>{link.label}</span>
										</a>
									</li>
								))}
							</ul>
						</nav>
					</div>
					{/* Sağ: Sosyal Medya */}
					<div className="flex-1 flex flex-col items-start">
						<h3 className="text-lg font-semibold mb-4">Sosyal Medya</h3>
						<div className="flex flex-row gap-3 items-center">
							{socialLinks.map(link => (
								<a
									key={link.href}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={link.label}
									className={
										`group flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-200 shadow-md bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30` +
										(link.label === "Medium" ? " text-gray-100" : " text-gray-300")
									}
									style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)", transition: "background 0.3s, color 0.3s, transform 0.2s" }}
								>
									<span className="flex items-center justify-center w-6 h-6 text-xl group-hover:text-primary group-hover:scale-110 transition-all duration-200">
										{link.label === "DEV.to" ? (
											<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<path d="M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.198h.701a.786.786 0 0 0 .469-.175c.155-.117.233-.292.233-.525v-2.798c.001-.233-.079-.408-.234-.525zM19.236 3H4.764C3.791 3 3.002 3.787 3 4.76v14.48c.002.973.791 1.76 1.764 1.76h14.473c.973 0 1.762-.787 1.764-1.76V4.76A1.765 1.765 0 0 0 19.236 3zM9.195 13.414c0 .755-.466 1.901-1.942 1.898H5.389V8.665h1.903c1.424 0 1.902 1.144 1.903 1.899v2.85zm4.045-3.562H11.1v1.544h1.309v1.188H11.1v1.543h2.142v1.188h-2.498a.813.813 0 0 1-.833-.792V9.497a.813.813 0 0 1 .792-.832h2.539l-.002 1.187zm4.165 4.632c-.531 1.235-1.481.99-1.906 0l-1.548-5.818h1.309l1.193 4.569 1.188-4.569h1.31l-1.546 5.818z"/>
											</svg>
										) : link.icon}
									</span>
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="border-t border-gray-800 mt-12 pt-7 text-center">
					<p className="text-gray-400 text-sm tracking-wide">
						&copy; {new Date().getFullYear()} Yasin Ateş. Tüm hakları saklıdır.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
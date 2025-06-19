import React from 'react'

const techIcons = [
  { icon: "ri-html5-line", color: "text-orange-500", label: "HTML5" },
  { icon: "ri-css3-line", color: "text-blue-400", label: "CSS3" },
  { icon: "ri-javascript-line", color: "text-yellow-400", label: "JavaScript" },
  { icon: "ri-reactjs-line", color: "text-cyan-500", label: "React" },
  { icon: "ri-tailwind-css-line", color: "text-sky-400", label: "TailwindCSS" },
  { icon: "ri-nodejs-line", color: "text-green-600", label: "Node.js" },
  { icon: "ri-github-line", color: "text-gray-800", label: "GitHub" },
  { icon: "ri-vuejs-line", color: "text-green-400", label: "Vue.js" },
]

const socialLinks = [
  {
    href: "https://github.com/yasinatesim",
    icon: "ri-github-line",
    color: "text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-600",
    ring: "focus:ring-gray-900/40",
    label: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/yasinatesim/",
    icon: "ri-linkedin-line",
    color: "text-blue-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400",
    ring: "focus:ring-blue-400/40",
    label: "LinkedIn"
  },
  {
    href: "https://www.instagram.com/yasinatesim/",
    icon: "ri-instagram-line",
    color: "text-pink-500 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-400",
    ring: "focus:ring-pink-400/40",
    label: "Instagram"
  },
  {
    href: "https://twitter.com/yasinatesim",
    icon: "ri-twitter-x-line",
    color: "text-black hover:text-white hover:bg-gradient-to-r hover:from-black hover:to-gray-700",
    ring: "focus:ring-black/40",
    label: "Twitter"
  },
  {
    href: "https://medium.com/@yasinatesim",
    icon: "ri-medium-line",
    color: "text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900",
    ring: "focus:ring-gray-800/40",
    label: "Medium"
  },
  {
    href: "https://dev.to/yasinatesim",
    icon: "dev-to",
    color: "text-black hover:text-white hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-700",
    ring: "focus:ring-black/40",
    label: "Dev.to"
  },
]

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gradient-to-tr from-white via-primary/10 to-secondary/20 overflow-hidden"
    >
      {/* Arka plan: animasyonlu gradient bloblar */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-primary/30 to-secondary/20 rounded-full blur-3xl animate-blob1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-gradient-to-tr from-secondary/30 to-primary/10 rounded-full blur-2xl animate-blob2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-20 py-16">
          {/* Sol: Kart ve sosyal medya ikonları */}
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                <span className="block">Yasin Ateş</span>
                <span className="block text-lg md:text-2xl font-medium text-primary mt-2">Frontend Developer</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-6 max-w-lg">
                Modern web uygulamaları ve müzikle ilgilenen bir geliştiriciyim. Yaratıcı, hızlı ve kullanıcı odaklı çözümler üretiyorum.
              </p>
              {/* Sosyal medya ikonları */}
              <div className="flex flex-wrap gap-5 mb-8">
                {socialLinks.map((s, i) => {
                  // Transparan arka plan, hover'da hafif renkli arka plan
                  let hoverBg = ''
                  if (s.icon === 'ri-github-line') hoverBg = 'hover:bg-gray-200'
                  else if (s.icon === 'ri-linkedin-line') hoverBg = 'hover:bg-blue-100'
                  else if (s.icon === 'ri-instagram-line') hoverBg = 'hover:bg-pink-100'
                  else if (s.icon === 'ri-twitter-x-line') hoverBg = 'hover:bg-gray-300'
                  else if (s.icon === 'ri-medium-line') hoverBg = 'hover:bg-gray-300'
                  else if (s.icon === 'dev-to') hoverBg = 'hover:bg-gray-200'
                  else hoverBg = 'hover:bg-primary/10'
                  return (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 flex items-center justify-center rounded-full bg-transparent ${hoverBg} transition-all duration-300 group hover:scale-110 hover:-translate-y-1 focus:outline-none`}
                      aria-label={s.label}
                    >
                      {s.icon === "ri-instagram-line" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 group-hover:animate-bounce-short">
                          <rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="#E1306C" strokeWidth="1.5" />
                          <circle cx="12" cy="12" r="5" stroke="#E1306C" strokeWidth="1.5" fill="none" />
                          <circle cx="17" cy="7" r="1.2" fill="#E1306C" />
                        </svg>
                      ) : s.icon === "dev-to" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 group-hover:animate-bounce-short">
                          <rect x="2" y="2" width="20" height="20" rx="4" fill="#171717" />
                          <text x="12" y="16" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" dominantBaseline="middle">DEV</text>
                        </svg>
                      ) : s.icon === "ri-medium-line" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 group-hover:animate-bounce-short">
                          <ellipse cx="5.5" cy="12" rx="4.5" ry="7" fill="#222" />
                          <ellipse cx="18" cy="12" rx="2" ry="7" fill="#222" />
                          <ellipse cx="12" cy="12" rx="2.5" ry="7" fill="#222" />
                        </svg>
                      ) : (
                        <i className={s.icon + " text-lg text-gray-700 group-hover:text-primary transition-colors duration-200 group-hover:animate-bounce-short"}></i>
                      )}
                    </a>
                  )
                })}
              </div>
              {/* Butonlar */}
              <div className="flex gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                >
                  Projelerim
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 bg-white border border-primary text-primary font-bold rounded-lg shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  İletişim
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-1M16 3v4M8 3v4m-4 4h16" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Sağ: Teknoloji ikonlarından oluşan modern bir arka plan ve ortada renkli bir kart */}
          <div className="hidden md:w-1/2 md:flex items-center justify-center relative">
            <div className="relative w-[26rem] h-[26rem] flex items-center justify-center">
              {/* Arka planda daha küçük, üst üste gelmeyen ve geniş alana yayılmış teknoloji ikonları */}
              <div className="absolute inset-0 pointer-events-none select-none opacity-25">
                {[
                  { top: '10px', left: '20px', rotate: '-8deg', scale: 1.1, size: '4.8rem' },
                  { top: '30px', left: '120px', rotate: '12deg', scale: 1.05, size: '4.6rem' },
                  { top: '20px', left: '240px', rotate: '7deg', scale: 1.15, size: '5.1rem' },
                  { top: '60px', left: '340px', rotate: '-15deg', scale: 1.08, size: '4.7rem' },
                  { top: '120px', left: '60px', rotate: '-18deg', scale: 1.13, size: '4.9rem' },
                  { top: '140px', left: '200px', rotate: '11deg', scale: 1.17, size: '5.2rem' },
                  { top: '200px', left: '80px', rotate: '-13deg', scale: 1.09, size: '4.8rem' },
                  { top: '210px', left: '300px', rotate: '19deg', scale: 1.12, size: '5.0rem' },
                  { top: '170px', left: '380px', rotate: '10deg', scale: 1.14, size: '5.1rem' },
                ].map((pos, idx) => {
                  const tech = techIcons[idx]
                  if (!tech) return null
                  return (
                    <div
                      key={tech.icon}
                      className={`absolute ${tech.color} ${idx % 2 === 0 ? 'opacity-80' : 'opacity-60'}`}
                      style={{
                        top: pos.top,
                        left: pos.left,
                        transform: `rotate(${pos.rotate}) scale(${pos.scale})`,
                        fontSize: pos.size,
                        animation: `float${idx % 3} 7s ease-in-out infinite`,
                        zIndex: 1,
                      }}
                    >
                      <i className={tech.icon}></i>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alt: farklı bir SVG dalga */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,64L60,58.7C120,53,240,43,360,53.3C480,64,600,96,720,106.7C840,117,960,107,1080,90.7C1200,75,1320,53,1380,42.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero
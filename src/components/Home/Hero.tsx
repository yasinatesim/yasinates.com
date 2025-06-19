import React from 'react'

const Hero = () => {
	return (
		<section id="home" className=" pt-24 min-h-[calc(100vh-6rem)] bg-gradient-to-br from-primary/70 via-white to-secondary/70 relative overflow-hidden">
        <div className="container mx-auto px-4 h-full">
          <div className="h-full flex flex-col md:flex-row items-center gap-12 py-12">
            <div className="w-full md:w-1/2 relative z-10">
              <div className="flex items-center gap-2 text-primary font-medium mb-6 animate-fade-in">
                <span className="w-12 h-[2px] bg-primary"></span>
                <span>Frontend Developer</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
                Merhaba, ben <br />
                <span className="text-gradient">Yasin Ateş</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
                Modern web teknolojileriyle kullanıcı dostu arayüzler geliştiriyor, müzik tutkumu projelerime yansıtıyorum.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="group px-8 py-4 bg-primary text-white font-medium rounded-button shadow-lg hover:shadow-primary/30 transition-all duration-300 whitespace-nowrap flex items-center gap-2">
                  Projelerimi Gör
                  <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1"></i>
                </a>
                <a href="#contact" className="group px-8 py-4 bg-white text-primary font-medium rounded-button shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap flex items-center gap-2">
                  İletişime Geç
                  <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1"></i>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="relative z-10">
                <img src="/5c3861593374971723b9ab5c95a004d7.jpg" alt="Developer Workspace" className="w-full rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className="ri-code-box-fill text-primary text-2xl"></i>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Frontend</div>
                    <div className="text-xs text-gray-600">Development</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 -rotate-180 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto -mt-1">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
      </section>
	)
}

export default Hero
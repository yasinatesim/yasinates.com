import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/iletisim')({
  component: Iletisim,
})

function Iletisim() {
  return (
    <>
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">Bana Ulaşın</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">İletişim</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Yeni projeler, işbirlikleri ve fikirleriniz için iletişime geçmekten çekinmeyin!</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 rounded-2xl shadow-lg p-8 md:p-10 transform hover:scale-[1.02] transition-transform duration-300 border-2 border-primary/20">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">İletişim Bilgileri</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                          <i className="ri-mail-line ri-lg"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">E-posta</p>
                          <a href="mailto:yasinatesim@gmail.com" className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">yasinatesim@gmail.com</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                          <i className="ri-map-pin-line ri-lg"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Konum</p>
                          <p className="text-lg font-medium text-gray-900">İstanbul, Türkiye</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Sosyal Medya</h3>
                    <div className="flex flex-row gap-3 mt-2">
                      <a
                        href="https://github.com/yasinatesim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group transition"
                        aria-label="GitHub"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 hover:bg-gray-900 hover:text-white transition-colors duration-200">
                          <i className="ri-github-fill text-xl"></i>
                        </div>
                      </a>
                      <a
                        href="https://linkedin.com/in/yasinatesim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group transition"
                        aria-label="LinkedIn"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200">
                          <i className="ri-linkedin-fill text-xl"></i>
                        </div>
                      </a>
                      <a
                        href="https://twitter.com/yasinatesim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group transition"
                        aria-label="X"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-900 hover:bg-black hover:text-white transition-colors duration-200">
                          {/* X (Twitter) ikonu - SVG ile */}
                          <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" className="transition-all duration-200">
                            <path d="M19.615 13.184 27.36 4.5h-2.09l-6.77 7.89-5.38-7.89H4.5l8.07 11.83-8.07 9.37h2.09l7.45-8.67 5.91 8.67h8.62l-8.95-12.52Zm-2.64 3.07-.86-1.23-6.87-9.7h2.47l5.53 7.8.86 1.23 7.13 10.06h-2.47l-5.75-8.16Z"/>
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://instagram.com/yasinatesim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group transition"
                        aria-label="Instagram"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-pink-600 hover:bg-pink-600 hover:text-white transition-colors duration-200">
                          <i className="ri-instagram-fill text-xl"></i>
                        </div>
                      </a>
                      <a
                        href="https://medium.com/@yasinatesim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group transition"
                        aria-label="Medium"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-200">
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="5.5" cy="12" rx="4.5" ry="7" fill="currentColor"></ellipse>
                            <ellipse cx="18" cy="12" rx="2" ry="7" fill="currentColor"></ellipse>
                            <ellipse cx="12" cy="12" rx="2.5" ry="7" fill="currentColor"></ellipse>
                          </svg>
                        </div>
                      </a>
                      <a
                        href="https://dev.to/yasinatesim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group transition"
                        aria-label="Dev.to"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm text-black hover:bg-black hover:text-white transition-colors duration-200">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.198h.701a.786.786 0 0 0 .469-.175c.155-.117.233-.292.233-.525v-2.798c.001-.233-.079-.408-.234-.525zM19.236 3H4.764C3.791 3 3.002 3.787 3 4.76v14.48c.002.973.791 1.76 1.764 1.76h14.473c.973 0 1.762-.787 1.764-1.76V4.76A1.765 1.765 0 0 0 19.236 3zM9.195 13.414c0 .755-.466 1.901-1.942 1.898H5.389V8.665h1.903c1.424 0 1.902 1.144 1.903 1.899v2.85zm4.045-3.562H11.1v1.544h1.309v1.188H11.1v1.543h2.142v1.188h-2.498a.813.813 0 0 1-.833-.792V9.497a.813.813 0 0 1 .792-.832h2.539l-.002 1.187zm4.165 4.632c-.531 1.235-1.481.99-1.906 0l-1.548-5.818h1.309l1.193 4.569 1.188-4.569h1.31l-1.546 5.818z"/>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 rounded-2xl shadow-lg p-8 md:p-10 flex flex-col items-center border-2 border-primary/20">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow mb-3">
                    <i className="ri-chat-3-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">İletişime geç</h3>
                  <p className="text-gray-700 text-center max-w-md">
                    Projeleriniz, işbirliği teklifleriniz veya sorularınız için bana ulaşabilirsiniz.
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full mt-4">
                  <a
                    href="mailto:yasinatesim@gmail.com"
                    className="flex items-center gap-4 bg-primary/10 border border-primary/20 hover:bg-primary hover:text-white transition-colors rounded-xl px-6 py-4 shadow group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white group-hover:bg-white group-hover:text-primary transition-colors border-2 border-white shadow">
                      <i className="ri-mail-line text-xl group-hover:rotate-12 transition-transform"></i>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-base">E-posta</span>
                      <span className="text-sm text-gray-700 group-hover:text-white transition-colors">yasinatesim@gmail.com</span>
                    </div>
                  </a>
                  <a
                    href="https://linkedin.com/in/yasinatesim"
                    target="_blank"
                    className="flex items-center gap-4 bg-blue-50 border border-blue-200 hover:bg-blue-700 hover:text-white transition-colors rounded-xl px-6 py-4 shadow group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white group-hover:bg-white group-hover:text-blue-700 transition-colors border-2 border-white shadow">
                      <i className="ri-linkedin-fill text-xl group-hover:rotate-12 transition-transform"></i>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-base">LinkedIn</span>
                      <span className="text-sm text-gray-700 group-hover:text-gray-200 transition-colors">linkedin.com/in/yasinatesim</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

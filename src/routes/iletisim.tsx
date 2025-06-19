import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/iletisim')({
  component: Iletisim,
})

function Iletisim() {
  return (
    <>
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">İletişim</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Birlikte Çalışalım</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Yeni projeler, işbirlikleri ve fikirler için her zaman açığım. Hadi konuşalım!</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 transform hover:scale-[1.02] transition-transform duration-300">
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
                    <div className="grid grid-cols-3 gap-4">
                      <a href="https://github.com/yasinatesim" target="_blank" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-800 text-white rounded-xl group-hover:scale-110 transition-transform">
                          <i className="ri-github-fill ri-lg"></i>
                        </div>
                        <span className="text-sm font-medium text-gray-600">GitHub</span>
                      </a>
                      <a href="https://linkedin.com/in/yasinatesim" target="_blank" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-700 text-white rounded-xl group-hover:scale-110 transition-transform">
                          <i className="ri-linkedin-fill ri-lg"></i>
                        </div>
                        <span className="text-sm font-medium text-gray-600">LinkedIn</span>
                      </a>
                      <a href="https://twitter.com/yasinatesim" target="_blank" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-400 text-white rounded-xl group-hover:scale-110 transition-transform">
                          <i className="ri-twitter-fill ri-lg"></i>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Twitter</span>
                      </a>
                      <a href="https://instagram.com/yasinatesim" target="_blank" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-pink-600 text-white rounded-xl group-hover:scale-110 transition-transform">
                          <i className="ri-instagram-fill ri-lg"></i>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Instagram</span>
                      </a>
                      <a href="https://medium.com/@yasinatesim" target="_blank" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-700 text-white rounded-xl group-hover:scale-110 transition-transform">
                          <i className="ri-medium-fill ri-lg"></i>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Medium</span>
                      </a>
                      <a href="https://dev.to/yasinatesim" target="_blank" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-xl group-hover:scale-110 transition-transform">
                          <i className="ri-code-box-fill ri-lg"></i>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Dev.to</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <div className="relative">
                  <img src="https://readdy.ai/api/search-image?query=modern%20workspace%20with%20laptop%20and%20coffee%2C%20clean%20minimal%20desk%20setup%20with%20plants%2C%20warm%20lighting%2C%20professional%20environment&width=600&height=400&seq=contact-image&orientation=landscape" alt="Contact" className="w-full h-64 object-cover rounded-xl mb-8" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-2xl font-semibold mb-2">Hadi Konuşalım!</h3>
                        <p className="text-white/90">Yeni projeler ve işbirlikleri için her zaman heyecanlıyım.</p>
                      </div>
                    </div>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-600">
                    Projeleriniz, işbirliği teklifleriniz veya sorularınız için benimle iletişime geçebilirsiniz. En kısa sürede size dönüş yapacağım.
                  </p>
                  <div className="flex flex-col space-y-4">
                    <a href="mailto:info@yasinatesim.com" className="w-full px-6 py-4 bg-primary text-white font-medium rounded-button shadow-md hover:bg-blue-600 transition-colors text-center inline-flex items-center justify-center gap-2 group">
                      <i className="ri-mail-line ri-lg group-hover:rotate-12 transition-transform"></i>
                      E-posta Gönder
                    </a>
                    <a href="https://linkedin.com/in/yasinatesim" target="_blank" className="w-full px-6 py-4 bg-blue-700 text-white font-medium rounded-button shadow-md hover:bg-blue-800 transition-colors text-center inline-flex items-center justify-center gap-2 group">
                      <i className="ri-linkedin-fill ri-lg group-hover:rotate-12 transition-transform"></i>
                      LinkedIn'den Bağlan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

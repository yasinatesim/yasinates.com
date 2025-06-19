import React from 'react'

const Contact = () => {
	return (
		<section id="contact" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">İletişim</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Projeleriniz ve işbirliği teklifleriniz için benimle iletişime geçebilirsiniz.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="text-center mb-10">
                <p className="text-lg text-gray-700 mb-6">
                  Projeleriniz, işbirliği teklifleriniz veya sorularınız için benimle iletişime geçebilirsiniz.
                </p>
                <a href="mailto:yasinatesim@gmail.com" className="text-xl font-medium text-primary hover:underline">yasinatesim@gmail.com</a>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-6">Sosyal Medya</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="https://github.com/yasinatesim" target="_blank" className="w-12 h-12 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors">
                    <i className="ri-github-fill ri-lg"></i>
                  </a>
                  <a href="https://linkedin.com/in/yasinatesim" target="_blank" className="w-12 h-12 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                    <i className="ri-linkedin-fill ri-lg"></i>
                  </a>
                  <a href="https://instagram.com/yasinatesim" target="_blank" className="w-12 h-12 flex items-center justify-center bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors">
                    <i className="ri-instagram-fill ri-lg"></i>
                  </a>
                  <a href="https://twitter.com/yasinatesim" target="_blank" className="w-12 h-12 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                    <i className="ri-twitter-fill ri-lg"></i>
                  </a>
                  <a href="https://medium.com/@yasinatesim" target="_blank" className="w-12 h-12 flex items-center justify-center bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors">
                    <i className="ri-medium-fill ri-lg"></i>
                  </a>
                  <a href="https://dev.to/yasinatesim" target="_blank" className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-900 transition-colors">
                    <i className="ri-code-box-fill ri-lg"></i>
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
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  component: Blog,
})

function Blog() {
  return (
    <>
      <section className="py-20 bg-white">
<div className="container mx-auto px-4">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Blog Yazılarım</h2>
<p className="text-gray-600 max-w-2xl mx-auto">Frontend geliştirme, web teknolojileri ve müzik üzerine paylaştığım yazılar.</p>
</div>
<div className="max-w-4xl mx-auto">
<div className="flex justify-center mb-10">
<div className="inline-flex bg-gray-100 p-1 rounded-full">
<button className="px-4 py-2 bg-primary text-white rounded-full whitespace-nowrap">Tüm Yazılar</button>
<button className="px-4 py-2 text-gray-700 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap">Medium</button>
<button className="px-4 py-2 text-gray-700 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap">Dev.to</button>
</div>
</div>
<div className="space-y-8">
<article className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row card-hover">
<div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
<img src="https://readdy.ai/api/search-image?query=javascript%20code%20on%20computer%20screen%2C%20modern%20development%20environment%2C%20clean%20code%20structure%2C%20web%20development%20concept&width=600&height=400&seq=blog-alt1&orientation=landscape" alt="JavaScript İpuçları" className="w-full h-full object-cover object-top" />
</div>
<div className="md:w-2/3 p-6">
<div className="flex items-center justify-between mb-3">
<span className="text-sm text-gray-500 flex items-center gap-1">
<i className="ri-time-line"></i> 5 dk okuma
</span>
<span className="text-sm text-gray-500 flex items-center gap-1">
<i className="ri-medium-fill"></i> Medium
</span>
</div>
<h3 className="text-xl font-semibold mb-3">JavaScript'te Performans İyileştirme Teknikleri</h3>
<p className="text-gray-700 mb-4">Modern web uygulamalarında JavaScript performansını artırmak için kullanabileceğiniz en etkili yöntemler. Bu yazıda bellek yönetimi, DOM manipülasyonu optimizasyonu ve asenkron işlemler konularını ele alıyorum.</p>
<a href="#" className="text-primary font-medium hover:underline flex items-center gap-1">
Devamını Oku <i className="ri-arrow-right-line"></i>
</a>
</div>
</article>
<article className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row card-hover">
<div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
<img src="https://readdy.ai/api/search-image?query=react%20component%20structure%2C%20modern%20UI%20interface%2C%20code%20editor%20with%20react%20syntax%20highlighted%2C%20web%20development&width=600&height=400&seq=blog-alt2&orientation=landscape" alt="React Hooks" className="w-full h-full object-cover object-top" />
</div>
<div className="md:w-2/3 p-6">
<div className="flex items-center justify-between mb-3">
<span className="text-sm text-gray-500 flex items-center gap-1">
<i className="ri-time-line"></i> 8 dk okuma
</span>
<span className="text-sm text-gray-500 flex items-center gap-1">
<i className="ri-code-box-fill"></i> Dev.to
</span>
</div>
<h3 className="text-xl font-semibold mb-3">React Hooks ile Daha Temiz Kod Yazma</h3>
<p className="text-gray-700 mb-4">React Hooks'un sunduğu avantajlar ve fonksiyonel bileşenlerde state yönetiminin incelikleri. useState, useEffect, useContext ve custom hook'ların etkili kullanımı hakkında detaylı bir rehber.</p>
<a href="#" className="text-primary font-medium hover:underline flex items-center gap-1">
Devamını Oku <i className="ri-arrow-right-line"></i>
</a>
</div>
</article>
<article className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row card-hover">
<div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
<img src="https://readdy.ai/api/search-image?query=css%20grid%20layout%20visualization%2C%20modern%20web%20design%2C%20responsive%20layout%20structure%2C%20web%20development%20concept&width=600&height=400&seq=blog-alt3&orientation=landscape" alt="CSS Grid" className="w-full h-full object-cover object-top" />
</div>
<div className="md:w-2/3 p-6">
<div className="flex items-center justify-between mb-3">
<span className="text-sm text-gray-500 flex items-center gap-1">
<i className="ri-time-line"></i> 6 dk okuma
</span>
<span className="text-sm text-gray-500 flex items-center gap-1">
<i className="ri-medium-fill"></i> Medium
</span>
</div>
<h3 className="text-xl font-semibold mb-3">CSS Grid ile Karmaşık Layoutlar Oluşturmak</h3>
<p className="text-gray-700 mb-4">CSS Grid sisteminin detaylı incelemesi ve responsive tasarımlarda kullanım örnekleri. Karmaşık grid yapıları, otomatik yerleşim ve grid template areas özelliklerinin kullanımı.</p>
<a href="#" className="text-primary font-medium hover:underline flex items-center gap-1">
Devamını Oku <i className="ri-arrow-right-line"></i>
</a>
</div>
</article>
</div>
<div className="text-center mt-12">
<a href="#" className="px-6 py-3 bg-primary text-white font-medium rounded-button shadow-md hover:bg-blue-600 transition-colors inline-flex items-center gap-2 whitespace-nowrap">
Tüm Yazıları Gör <i className="ri-arrow-right-line"></i>
</a>
</div>
</div>
</div>
</section>
    </>
  )
}

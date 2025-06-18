import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hakkimda')({
  component: Hakkimda,
})

function Hakkimda() {
  return (
    <>
      <section className="py-20 bg-white">
<div className="container mx-auto px-4">
<div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Hakkımda</h2>
<p className="text-gray-600 max-w-2xl mx-auto">Frontend geliştirici olarak deneyimlerim ve müzik tutkumla birlikte profesyonel yolculuğum.</p>
</div>
<div className="max-w-4xl mx-auto">
<div className="flex flex-col items-center mb-12">
<div className="w-40 h-40 rounded-full overflow-hidden mb-8 border-4 border-primary">
<img src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20male%20software%20developer%20in%20his%2030s%2C%20casual%20smart%20attire%2C%20friendly%20smile%2C%20clean%20background%2C%20high%20quality%20professional%20headshot&width=400&height=400&seq=portrait-alt&orientation=squarish" alt="Yasin Ateşim" className="w-full h-full object-cover" />
</div>
<h3 className="text-2xl font-semibold mb-2">Yasin Ateşim</h3>
<p className="text-lg text-gray-600 mb-6">Frontend Developer & Müzik Tutkunu</p>
<div className="flex flex-wrap gap-4 mb-8">
<a href="https://github.com/yasinatesim" target="_blank" className="px-4 py-2 bg-gray-800 text-white rounded-button flex items-center gap-2 hover:bg-gray-900 transition-colors whitespace-nowrap">
<i className="ri-github-fill"></i> GitHub
</a>
<a href="https://linkedin.com/in/yasinatesim" target="_blank" className="px-4 py-2 bg-blue-700 text-white rounded-button flex items-center gap-2 hover:bg-blue-800 transition-colors whitespace-nowrap">
<i className="ri-linkedin-fill"></i> LinkedIn
</a>
<a href="https://instagram.com/yasinatesim" target="_blank" className="px-4 py-2 bg-pink-600 text-white rounded-button flex items-center gap-2 hover:bg-pink-700 transition-colors whitespace-nowrap">
<i className="ri-instagram-fill"></i> Instagram
</a>
<a href="https://twitter.com/yasinatesim" target="_blank" className="px-4 py-2 bg-blue-400 text-white rounded-button flex items-center gap-2 hover:bg-blue-500 transition-colors whitespace-nowrap">
<i className="ri-twitter-fill"></i> Twitter
</a>
<a href="https://medium.com/@yasinatesim" target="_blank" className="px-4 py-2 bg-gray-700 text-white rounded-button flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap">
<i className="ri-medium-fill"></i> Medium
</a>
<a href="https://dev.to/yasinatesim" target="_blank" className="px-4 py-2 bg-black text-white rounded-button flex items-center gap-2 hover:bg-gray-900 transition-colors whitespace-nowrap">
<i className="ri-code-box-fill"></i> Dev.to
</a>
</div>
</div>
<div className="mb-12">
<p className="text-lg text-gray-700 mb-6">
2012 yılında başlayan yazılımcılık hikayeme, 2015 yılından beri Frontend Developer olarak devam ediyorum. Genellikle frontend ağırlıklı olmak üzere, yazılımla ilgili güncel teknolojileri takip etmeye çalışıyorum.
</p>
<p className="text-lg text-gray-700 mb-6">
Medium'da paylaşmış olduğum Türkçe içerikleri, İngilizce olarak dev.to'da paylaşıyorum. Yazılım geliştirmenin yanı sıra müzikle de ilgileniyorum ve YouTube kanalımda müzik içerikleri paylaşıyorum.
</p>
</div>
<div>
<h3 className="text-xl font-semibold mb-6 text-center">Teknolojiler</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
<div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
<div className="w-16 h-16 flex items-center justify-center text-orange-500 mb-4">
<i className="ri-html5-fill ri-3x"></i>
</div>
<h4 className="text-lg font-medium">HTML5</h4>
</div>
<div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
<div className="w-16 h-16 flex items-center justify-center text-blue-500 mb-4">
<i className="ri-css3-fill ri-3x"></i>
</div>
<h4 className="text-lg font-medium">CSS3</h4>
</div>
<div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
<div className="w-16 h-16 flex items-center justify-center text-pink-500 mb-4">
<i className="ri-sass-fill ri-3x"></i>
</div>
<h4 className="text-lg font-medium">SASS</h4>
</div>
<div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
<div className="w-16 h-16 flex items-center justify-center text-yellow-500 mb-4">
<i className="ri-javascript-fill ri-3x"></i>
</div>
<h4 className="text-lg font-medium">JavaScript</h4>
</div>
<div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
<div className="w-16 h-16 flex items-center justify-center text-yellow-600 mb-4">
<i className="ri-javascript-fill ri-3x"></i>
</div>
<h4 className="text-lg font-medium">ES6</h4>
</div>
<div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
<div className="w-16 h-16 flex items-center justify-center text-blue-400 mb-4">
<i className="ri-reactjs-fill ri-3x"></i>
</div>
<h4 className="text-lg font-medium">React</h4>
</div>
<div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
<div className="w-16 h-16 flex items-center justify-center text-purple-500 mb-4">
<i className="ri-redux-fill ri-3x"></i>
</div>
<h4 className="text-lg font-medium">Redux</h4>
</div>
<div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
<div className="w-16 h-16 flex items-center justify-center text-blue-600 mb-4">
<i className="ri-git-branch-fill ri-3x"></i>
</div>
<h4 className="text-lg font-medium">Git</h4>
</div>
</div>
</div>
</div>
</div>
</section>
    </>
  )
}

import { useDevtoPosts } from "~/hooks/useDevtoPosts"
import { useMediumPosts } from "~/hooks/useMediumPosts"

const Blogs = () => {

  const mediumPosts = useMediumPosts()
  const devtoPosts = useDevtoPosts()


	return (
		<section id="blog" className="py-20 bg-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog Yazılarım</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Frontend geliştirme, web teknolojileri ve müzik üzerine paylaştığım yazılar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Medium makaleleri */}
            {mediumPosts.isLoading && <div>Yükleniyor...</div>}
            {mediumPosts.isError && <div>Medium makaleleri alınamadı.</div>}
            {mediumPosts.data?.map((post: any, i: number) => {
              // description içindeki ilk <img src="..."> yakala
              let img = ''
              const imgMatch = post.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)
              if (imgMatch && imgMatch[1]) {
                img = imgMatch[1]
              }
              const imageUrl = post.thumbnail || img
              return (
                <article key={post.guid} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img src={imageUrl} alt={post.title} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 " />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <i className="ri-time-line"></i> {post.readingTime || '5 dk'}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <i className="ri-medium-fill"></i> Medium
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.description?.replace(/<[^>]+>/g, '').slice(0, 120) + '...'}</p>
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                      Devamını Oku <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                </article>
              )
            })}
            {/* Dev.to makaleleri */}
            {devtoPosts.isLoading && <div>Yükleniyor...</div>}
            {devtoPosts.isError && <div>Dev.to makaleleri alınamadı.</div>}
            {devtoPosts.data?.map((post: any, i: number) => (
              <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <i className="ri-time-line"></i> {post.reading_time_minutes || '5'} dk
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <i className="ri-code-box-fill"></i> Dev.to
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.description?.slice(0, 120) + '...'}</p>
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                    Devamını Oku <i className="ri-arrow-right-line"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0  transform text-indigo-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto -mt-1">
            <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
	)
}

export default Blogs
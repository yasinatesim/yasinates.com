import { Link } from '@tanstack/react-router'
import { OTHER_PROJECTS } from '~/constants/projects'
import { useGithubRepos } from '~/hooks/useGithubRepos';
import { useReadmeImage } from '~/hooks/useReadmeImage'
import { useYoutubeFeed } from '~/hooks/useYoutubeFeed';

type GithubRepo = {
  id: number;
  name: string;
  owner: { login: string };
  description: string;
  language: string;
  html_url: string;
  topics?: string[];
  created_at: string;
};


const Projects = () => {
  const githubRepos = useGithubRepos()
  const orderedRepos = githubRepos.data?.slice().sort((a: GithubRepo, b: GithubRepo) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  const slicedRepos = orderedRepos?.slice(0, 6)
  const youtubeFeed = useYoutubeFeed()


const colors = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-yellow-100 text-yellow-700',
  'bg-pink-100 text-pink-700',
  'bg-purple-100 text-purple-700',
  'bg-indigo-100 text-indigo-700',
  'bg-red-100 text-red-700',
  'bg-gray-100 text-gray-700',
]

function pascalCase(str: string) {
  if (str === 'typescript') return 'TypeScript'
  if (str === 'javascript') return 'JavaScript'
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

	return (
		<section id="projects" className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projelerim</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Geliştirdiğim web projeleri, açık kaynak katkılarım ve müzik çalışmalarım.</p>
          </div>
          <div className="mb-20">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <i className="ri-github-fill ri-lg"></i> Son Github Projelerim
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 blog-container">
              {slicedRepos?.map((repo: GithubRepo, i: number) => {
                const image = useReadmeImage(repo.owner.login, repo.name)
                return (
                  <div key={repo.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden card-hover flex flex-col">
                    <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center py-4">
                      {image ? (
                        <img src={image} alt={repo.name + ' görseli'} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-4xl"><i className="ri-github-fill"></i></span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h4 className="text-xl font-semibold mb-3">{repo.name}</h4>
                      {repo.description && <p className="text-gray-700 mb-4">{repo.description}</p>}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.topics?.map((topic: string, idx: number) => (
                          <span key={topic} className={`px-3 py-1 text-sm rounded-full font-medium ${colors[idx % colors.length]}`}>{pascalCase(topic)}</span>
                        ))}
                      </div>
                      <div className="flex-1"></div>
                      <a href={repo.html_url} target="_blank" className="mt-6 block text-primary font-medium hover:underline flex items-center gap-1">
                        GitHub'da Gör <i className="ri-external-link-line"></i>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="text-center mt-8">
              <Link to="/github" className="px-6 py-3 bg-gray-800 text-white font-medium rounded-button shadow-md hover:bg-gray-900 transition-colors inline-flex items-center gap-2 whitespace-nowrap">
                Tüm GitHub Projelerini Gör <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
          <div className="mb-20">
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <i className="ri-youtube-fill ri-lg text-red-600"></i> Son YouTube İçeriklerim
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 blog-container">
              {youtubeFeed.data?.slice(0, 3).map((video, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden card-hover flex flex-col relative">
                  <div className="h-48 overflow-hidden relative group">
                    <span className="absolute top-3 right-3 bg-gray-100/80 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow z-10">
                      {new Date(video.published).toLocaleDateString('tr-TR')}
                    </span>
                    <a href={video.link} target="_blank" rel="noopener noreferrer">
                      <img src={video.mediaThumbnail} alt={video.title} className="w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full">
                          <i className="ri-play-fill ri-2x text-white"></i>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-xl font-semibold mb-2">{video.title}</h4>
                    {video.description && (
                      <p className="text-gray-700 mb-4 line-clamp-2">{video.description}</p>
                    )}
                    <div className="flex-1"></div>
                    <div className="flex items-center justify-between mt-2">
                      {video.views && (
                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                          <i className="ri-eye-line"></i> {Number(video.views).toLocaleString('tr-TR', { notation: 'compact', maximumFractionDigits: 1 })} görüntülenme
                        </span>
                      )}
                      <a href={video.link} target="_blank" rel="noopener noreferrer" className="text-red-600 font-medium hover:underline flex items-center gap-1">
                        İzle <i className="ri-youtube-fill"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/youtube" target="_blank" className="px-6 py-3 bg-red-600 text-white font-medium rounded-button shadow-md hover:bg-red-700 transition-colors inline-flex items-center gap-2 whitespace-nowrap">
                Tüm Youtube İçeriklerimi Gör <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <i className="ri-code-box-line ri-lg"></i> Diğer Projeler
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {OTHER_PROJECTS.map((project, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden card-hover flex flex-col">
                  {project.image ? (
                    <>
                      <div className="h-64 w-full overflow-hidden">
                        <img src={project.image} alt={project.alt || project.title} className="w-full h-full object-cover object-center" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h4 className="text-xl font-semibold mb-3">{project.title}</h4>
                        <p className="text-gray-700 mb-4">{project.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, i) => (
                            <span key={tag.text} className={`px-2 py-1 ${tag.className} text-xs rounded-full`}>{tag.text}</span>
                          ))}
                        </div>
                        {project.features && (
                          <div className="flex flex-col space-y-4 mb-4">
                            {project.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                                  <i className="ri-check-line ri-lg"></i>
                                </div>
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-auto">
                          <a href={project.link} className="text-primary font-medium hover:underline flex items-center gap-1">
                            Projeyi İncele <i className="ri-external-link-line"></i>
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 flex-1 flex flex-col h-full">
                      <h4 className="text-xl font-semibold mb-3">{project.title}</h4>
                      <p className="text-gray-700 mb-4">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={tag.text} className={`px-2 py-1 ${tag.className} text-xs rounded-full`}>{tag.text}</span>
                        ))}
                      </div>
                      {project.features && (
                        <div className="flex flex-col space-y-4 mb-4">
                          {project.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                                <i className="ri-check-line ri-lg"></i>
                              </div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-auto">
                        <a href={project.link} className="text-primary font-medium hover:underline flex items-center gap-1">
                          Projeyi İncele <i className="ri-external-link-line"></i>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
	)
}

export default Projects
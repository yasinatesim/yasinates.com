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
  fork?: boolean;
};

type OtherProject = {
  image?: string;
  alt?: string;
  title: string;
  desc: string;
  tags: { text: string; className: string }[];
  link: string;
  features?: string[];
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
                  <div className="p-6 flex flex-col flex-1 relative">
                    <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      {repo.name}
                      {repo.fork && (
                        <span title="Forked Repository" className="inline-flex items-center absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 text-black/10">
                          <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                            <path d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z" fill="currentColor" />
                          </svg>
                        </span>
                      )}
                    </h4>
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
              <div key={video.videoId} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden card-hover flex flex-col relative">
                <div className="h-48 overflow-hidden relative group">
                  <span className="absolute top-3 right-3 bg-gray-100/80 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow z-10">
                    {video.published}
                  </span>
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover object-top" />
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
                        <i className="ri-eye-line"></i> {video.views}
                      </span>
                    )}
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-red-600 font-medium hover:underline flex items-center gap-1">
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
            {OTHER_PROJECTS.map((project: OtherProject, idx) => (
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
                      {Array.isArray(project.features) && project.features.length > 0 && (
                        <div className="flex flex-col space-y-4 mb-4">
                          {project.features.map((feature: string, i: number) => (
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
                    {Array.isArray(project.features) && project.features.length > 0 && (
                      <div className="flex flex-col space-y-4 mb-4">
                        {project.features.map((feature: string, i: number) => (
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
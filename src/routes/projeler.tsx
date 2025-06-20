import { createFileRoute } from '@tanstack/react-router';
import { useGithubRepos } from '~/hooks/useGithubRepos';
import { useReadmeImage } from '~/hooks/useReadmeImage';
import { OTHER_PROJECTS } from '~/constants/projects';
import { useYoutubeFeed } from '~/hooks/useYoutubeFeed';
import React from 'react';
import { seo } from '~/utils/seo';

// GithubRepo tipi
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

function pascalCase(str: string) {
  if (str === 'typescript') return 'TypeScript';
  if (str === 'javascript') return 'JavaScript';
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

// Farklı bir kart tasarımı: daha minimal, hover'da border ve gölge değişimi, üstte görsel, altta içerik, etiketler küçük ve köşeli
function GithubProjectCard({ repo }: { repo: GithubRepo }) {
  const image = useReadmeImage(repo.owner.login, repo.name);
  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-primary transition-all flex flex-col overflow-hidden">
      <div className="h-40 bg-zinc-100 flex items-center justify-center overflow-hidden p-4">
        {image ? (
          <img src={image} alt={repo.name + ' görseli'} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
        ) : (
          <span className="text-3xl text-gray-400"><i className="ri-github-fill"></i></span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 relative">
        <h4 className="text-lg font-semibold mb-2 line-clamp-1 flex items-center gap-2">
          {repo.name}
          {repo.fork && (
            <span title="Forked Repository" className="inline-flex items-center absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 text-black/10">
              <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                <path d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z" fill="currentColor"/>
              </svg>
            </span>
          )}
        </h4>
        {repo.description && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{repo.description}</p>}
        <div className="flex flex-wrap gap-1 mb-2">
          {repo.topics?.slice(0, 3).map((topic, idx) => (
            <span key={topic} className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-xs rounded-md">{pascalCase(topic)}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 text-xs text-gray-400">
          <span>{repo.language}</span>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
            GitHub <i className="ri-external-link-line"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

function OtherProjectCard({ project }: { project: any }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-400 transition-all flex flex-col overflow-hidden">
      {project.image && (
        <div className="h-40 bg-zinc-100 flex items-center justify-center overflow-hidden">
          <img src={project.image} alt={project.alt || project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-lg font-semibold mb-2 line-clamp-1">{project.title}</h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.desc}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tags?.slice(0, 4).map((tag: any) => (
            <span key={tag.text} className={`px-2 py-0.5 ${tag.className} text-xs rounded-md`}>{tag.text}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 text-xs text-gray-400">
          <span></span>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
            İncele <i className="ri-external-link-line"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

function YoutubeVideoCard({ video }: { video: any }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-red-400 transition-all flex flex-col overflow-hidden relative">
      <div className="h-40 bg-zinc-100 flex items-center justify-center overflow-hidden relative">
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-full">
              <i className="ri-play-fill ri-xl text-white"></i>
            </div>
          </div>
        </a>
        <span className="absolute top-2 right-2 bg-white/80 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded shadow z-10">
          {video.published}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-base font-semibold mb-2 line-clamp-1">{video.title}</h4>
        {video.description && <p className="text-gray-600 text-xs mb-2 line-clamp-2">{video.description}</p>}
        <div className="flex-1"></div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          {video.views && (
            <span className="flex items-center gap-1">
              <i className="ri-eye-line"></i> {video.views}
            </span>
          )}
          <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center gap-1">
            İzle <i className="ri-youtube-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjelerPage() {
  const githubRepos = useGithubRepos();
  const orderedRepos = githubRepos.data?.slice().sort((a: GithubRepo, b: GithubRepo) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const youtubeFeed = useYoutubeFeed();

  return (
    <section className="py-20 bg-zinc-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <i className="ri-folder-3-fill ri-xl"></i> Tüm Projelerim
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Açık kaynak kodlu projelerim ve diğer geliştirdiğim uygulamalar.</p>
        </div>
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <i className="ri-github-fill ri-lg"></i> Github Projeleri
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {orderedRepos?.map((repo: GithubRepo) => (
              <GithubProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <i className="ri-youtube-fill ri-lg text-red-600"></i> YouTube İçeriklerim
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {youtubeFeed.data?.map((video: any) => (
              <YoutubeVideoCard key={video.videoId} video={video} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <i className="ri-code-box-line ri-lg"></i> Diğer Projeler
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {OTHER_PROJECTS.map((project: any, idx: number) => (
              <OtherProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute('/projeler')({
  component: ProjelerPage,
  head: () => ({
    title: 'Projeler | Yasin Ateş',
    meta: [
      ...seo({
        title: 'Projeler | Yasin Ateş',
        description: 'Açık kaynak kodlu projelerim ve geliştirdiğim uygulamalar.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'projeler, açık kaynak, yazılım, uygulama, yasin ateş, developer, frontend'
      }),
      { name: 'canonical', content: 'https://yasinates.com/projeler' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Projeler',
          url: 'https://yasinates.com/projeler',
          description: 'Açık kaynak kodlu projelerim ve geliştirdiğim uygulamalar.'
        })
      }
    ]
  }),
});
import { createFileRoute } from '@tanstack/react-router';
import { useGithubRepos } from '~/hooks/useGithubRepos';
import { useReadmeImage } from '~/hooks/useReadmeImage';
import React from 'react';
import { seo } from '~/utils/seo';

// GithubRepo tipini tekrar tanımla
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

const colors = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-yellow-100 text-yellow-700',
  'bg-pink-100 text-pink-700',
  'bg-purple-100 text-purple-700',
  'bg-indigo-100 text-indigo-700',
  'bg-red-100 text-red-700',
  'bg-gray-100 text-gray-700',
];

function GithubCard({ repo }: { repo: GithubRepo }) {
  const image = useReadmeImage(repo.owner.login, repo.name);
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden card-hover flex flex-col">
      <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center py-4">
        {image ? (
          <img src={image} alt={repo.name + ' görseli'} className="w-full h-full object-contain" />
        ) : (
          <span className="text-4xl"><i className="ri-github-fill"></i></span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1 relative">
        <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
            {repo.name}
            {repo.fork && (
              <span title="Forked Repository" className="inline-flex items-center absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 text-black/10">
                <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                  <path d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z" fill="currentColor" />
                </svg>
              </span>
            )}
            <i className="ri-external-link-line text-base"></i>
          </a>
        </h4>
        {repo.description && <p className="text-gray-700 text-sm mb-4 line-clamp-3">{repo.description}</p>}
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics?.map((topic: string, idx: number) => (
            <span key={topic} className={`px-2 py-0.5 text-xs rounded-full font-medium ${colors[idx % colors.length]}`}>{pascalCase(topic)}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 text-xs text-gray-500">
          <span>Oluşturulma: {new Date(repo.created_at).toLocaleDateString('tr-TR')}</span>
        </div>
      </div>
    </div>
  );
}

function GithubPage() {
  const githubRepos = useGithubRepos();
  const orderedRepos = githubRepos.data?.slice().sort((a: GithubRepo, b: GithubRepo) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <i className="ri-github-fill ri-xl"></i> Tüm GitHub Projelerim
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Açık kaynak kodlu tüm projelerim ve detayları.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderedRepos?.map((repo: GithubRepo) => (
            <GithubCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute('/github')({
  component: GithubPage,
  head: () => ({
    title: 'GitHub Projeleri | Yasin Ateş',
    meta: [
      ...seo({
        title: 'GitHub Projeleri | Yasin Ateş',
        description: 'Açık kaynak kodlu tüm GitHub projelerim ve detayları.',
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'github, açık kaynak, yazılım, proje, yasin ateş, developer, frontend'
      }),
      { name: 'canonical', content: 'https://yasinates.com/github' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'GitHub Projeleri',
          url: 'https://yasinates.com/github',
          description: 'Açık kaynak kodlu tüm GitHub projelerim ve detayları.'
        })
      }
    ]
  }),
});
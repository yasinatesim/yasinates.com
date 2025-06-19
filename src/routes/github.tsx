import { createFileRoute } from '@tanstack/react-router';
import { useGithubRepos } from '~/hooks/useGithubRepos';
import { useReadmeImage } from '~/hooks/useReadmeImage';
import React from 'react';

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
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
            {repo.name} <i className="ri-external-link-line text-base"></i>
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
});
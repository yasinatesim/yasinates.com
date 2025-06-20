import { createFileRoute } from '@tanstack/react-router';
import { useYoutubeFeed } from '~/hooks/useYoutubeFeed';
import React from 'react';
import { seo } from '~/utils/seo';

function YoutubeCard({ video }: { video: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden hover:scale-[1.03]">
      <div className="w-full h-56 overflow-hidden">
        <a href={video.url} target="_blank" rel="noopener noreferrer">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded-t-xl transition-transform duration-300 hover:scale-105" />
        </a>
      </div>
      <div className="flex-1 flex flex-col p-5">
        <h4 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900">{video.title}</h4>
        {video.description && (
          <p className="text-gray-600 mb-4 text-sm line-clamp-3">{video.description}</p>
        )}
        <div className="flex-1"></div>
        <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1 text-xs bg-zinc-100 text-zinc-700 px-2 py-1 rounded-full">
              <i className="ri-calendar-line"></i> {video.published}
            </span>
            {video.views && (
              <span className="whitespace-nowrap flex items-center gap-1 text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full">
                <i className="ri-eye-line"></i> {video.views}
              </span>
            )}
          </div>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap flex items-center gap-1 bg-red-600 text-white text-xs font-medium px-3 py-2 rounded-lg shadow hover:bg-red-700 hover:scale-105 transition-all w-full sm:w-auto justify-center"
          >
            <i className="ri-youtube-fill"></i> YouTube'da Aç
          </a>
        </div>
      </div>
    </div>
  );
}

function YoutubePage() {
  const youtubeFeed = useYoutubeFeed();
  return (
    <section className="py-20 bg-zinc-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <i className="ri-youtube-fill ri-xl text-red-600"></i> Tüm YouTube İçeriklerim
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">YouTube kanalımda yayınladığım tüm videoları buradan inceleyebilirsiniz.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {youtubeFeed.data?.map((video: any, i: number) => (
            <YoutubeCard key={video.url} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute('/youtube')({
  component: YoutubePage,
  head: () => ({
    title: 'YouTube Videoları | Yasin Ateş',
    meta: [
      ...seo({
        title: 'YouTube Videoları | Yasin Ateş',
        description:
          "Yasin Ateş'in YouTube kanalında yayınladığı tüm videolar.",
        image: 'https://yasinates.com/og-image.jpg',
        keywords: 'youtube, video, içerik, yasin ateş, frontend, müzik'
      }),
      { name: 'canonical', content: 'https://yasinates.com/youtube' },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'VideoGallery',
          name: 'YouTube Videoları',
          url: 'https://yasinates.com/youtube',
          description: "Yasin Ateş'in YouTube kanalında yayınladığı tüm videolar."
        })
      }
    ]
  }),
});
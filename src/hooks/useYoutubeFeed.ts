import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"

const channelId = 'UCMBBlJsFiUYu2akYvmdi99g';

export function useYoutubeFeed() {
  return useSuspenseQuery(
    queryOptions({
      queryKey: ['youtube-feed', channelId],
      queryFn: async () => {
        const url = `https://www.youtube.com/channel/${channelId}/videos`;
        const res = await axios.get(url);
        const html = res.data as string;



        // Önce ytInitialData'yı bul
        const ytDataMatch = html.match(/var ytInitialData = ({.*?});/s);
        if (ytDataMatch) {
          try {
            const ytData = JSON.parse(ytDataMatch[1]);


            // Tam JSON yapısını console'a yazdır (geliştirme için)


            return await extractVideosFromYtData(ytData);
          } catch (error) {
            console.error('ytInitialData parsing failed:', error);
          }
        }

        // ytInitialData bulunamazsa window.ytInitialData'yı ara
        const windowYtDataMatch = html.match(/window\["ytInitialData"\] = ({.*?});/s);
        if (windowYtDataMatch) {
          try {
            const ytData = JSON.parse(windowYtDataMatch[1]);

            return await extractVideosFromYtData(ytData);
          } catch (error) {
            console.error('window ytInitialData parsing failed:', error);
          }
        }


        // const videoIds = html.match(/"videoId":"([^"]+)"/g);


        return [];
      },
      staleTime: 1000 * 60 * 60 * 24 * 14,
      gcTime: 1000 * 60 * 60 * 24 * 14,
    })
  )
}

async function getBestThumbnail(thumbnails: any[], videoId: string): Promise<string> {
  // Önce API'den gelen thumbnail'leri kontrol et
  if (thumbnails && thumbnails.length > 0) {
    const sortedThumbnails = [...thumbnails].sort((a, b) => {
      const aSize = (a.width || 0) * (a.height || 0);
      const bSize = (b.width || 0) * (b.height || 0);
      return bSize - aSize;
    });
    const bestThumbnail = sortedThumbnails[0];
    if (bestThumbnail?.url) {
      let url = bestThumbnail.url;
      if (url.includes('hq720.jpg') || url.includes('hqdefault.jpg') || url.includes('mqdefault.jpg')) {
        url = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      }
      url = url.replace(/[?&](width|height|sqp|rs)=[^&]*/g, '');
      url = url.replace(/[?&]$/, '');
      // url çalışıyor mu kontrol et
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) return url;
      } catch {}
    }
  }
  // Fallback url'leri sırayla dene
  const highQualityUrls = [
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hq720.jpg`,
    `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
    `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`,
  ];
  for (const url of highQualityUrls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) return url;
    } catch {}
  }
  // Hiçbiri çalışmazsa boş string dön
  return '';
}

function turkishViews(views: string) {
  if (!views) return '';
  let v = views.replace(/ views?/, '').replace(/,/g, '.').trim();
  if (v.endsWith('görüntüleme')) return v;
  return v + ' görüntüleme';
}

function turkishPublished(published: string) {
  if (!published) return '';
  // İngilizce zaman ifadelerini Türkçeye çevir (önce çoğul, sonra tekil)
  return published
    .replace('years', 'yıl').replace('year', 'yıl')
    .replace('months', 'ay').replace('month', 'ay')
    .replace('weeks', 'hafta').replace('week', 'hafta')
    .replace('days', 'gün').replace('day', 'gün')
    .replace('hours', 'saat').replace('hour', 'saat')
    .replace('minutes', 'dakika').replace('minute', 'dakika')
    .replace('seconds', 'saniye').replace('second', 'saniye')
    .replace('ago', 'önce')
    .replace('Streamed', 'Yayınlandı');
}

async function extractVideosFromYtData(ytData: any) {
  const videos = [];

  try {
    // Contents yapısını incele
    const contents = ytData?.contents;
    if (!contents) {

      return [];
    }



    // Farklı yapıları dene
    let tabsData = null;

    // Yapı 1: twoColumnBrowseResultsRenderer
    if (contents.twoColumnBrowseResultsRenderer) {
      tabsData = contents.twoColumnBrowseResultsRenderer.tabs;

    }

    // Yapı 2: sectionListRenderer
    if (contents.sectionListRenderer) {

      const sections = contents.sectionListRenderer.contents;

    }

    if (tabsData) {


      for (const tab of tabsData) {


        if (tab.tabRenderer) {
          const tabContent = tab.tabRenderer.content;


          // richGridRenderer yapısı
          if (tabContent?.richGridRenderer) {
            const items = tabContent.richGridRenderer.contents;


            for (const item of items || []) {
              const videoRenderer = item?.richItemRenderer?.content?.videoRenderer;
              if (videoRenderer) {


                const video = {
                  videoId: videoRenderer.videoId || '',
                  title: videoRenderer.title?.runs?.[0]?.text || videoRenderer.title?.simpleText || '',
                  thumbnail: '',
                  description: videoRenderer.descriptionSnippet?.runs?.[0]?.text || '',
                  views: turkishViews(videoRenderer.viewCountText?.simpleText || videoRenderer.shortViewCountText?.simpleText || ''),
                  published: turkishPublished(videoRenderer.publishedTimeText?.simpleText || ''),
                  url: `https://www.youtube.com/watch?v=${videoRenderer.videoId}`,
                };

                video.thumbnail = await getBestThumbnail(videoRenderer.thumbnail?.thumbnails, videoRenderer.videoId);

                if (video.videoId) {
                  videos.push(video);

                }
              }
            }
          }

          // gridRenderer yapısı
          if (tabContent?.gridRenderer) {
            const items = tabContent.gridRenderer.items;


            for (const item of items || []) {
              const videoRenderer = item?.gridVideoRenderer;
              if (videoRenderer) {
                const video = {
                  videoId: videoRenderer.videoId || '',
                  title: videoRenderer.title?.runs?.[0]?.text || videoRenderer.title?.simpleText || '',
                  thumbnail: '',
                  description: '',
                  views: turkishViews(videoRenderer.viewCountText?.simpleText || videoRenderer.shortViewCountText?.simpleText || ''),
                  published: turkishPublished(videoRenderer.publishedTimeText?.simpleText || ''),
                  url: `https://www.youtube.com/watch?v=${videoRenderer.videoId}`,
                };

                video.thumbnail = await getBestThumbnail(videoRenderer.thumbnail?.thumbnails, videoRenderer.videoId);

                if (video.videoId) {
                  videos.push(video);

                }
              }
            }
          }
        }
      }
    }


    return videos;

  } catch (error) {
    console.error('Error extracting videos:', error);
    return [];
  }
}
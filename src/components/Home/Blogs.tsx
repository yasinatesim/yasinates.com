import { Link } from '@tanstack/react-router'
import { useDevtoPosts } from '~/hooks/useDevtoPosts'
import { useMediumPosts } from '~/hooks/useMediumPosts'
import styles from './Blogs.module.scss'

type MediumPost = {
  guid: string
  title: string
  description: string
  thumbnail: string | null
  readingTime?: string
}

type DevToPost = {
  id: number
  title: string
  description: string
  cover_image: string | null
  reading_time_minutes: number
}

const Blogs = () => {
  const mediumPosts = useMediumPosts()
  const devtoPosts = useDevtoPosts()

  return (
    <section id="blog" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Blog Yazılarım</h2>
          <p className={styles.subtitle}>Frontend geliştirme, web teknolojileri ve müzik üzerine paylaştığım yazılar.</p>
        </div>
        <div className={styles.grid}>
          {mediumPosts.isLoading && <div>Yükleniyor...</div>}
          {mediumPosts.isError && <div>Medium makaleleri alınamadı.</div>}
          {mediumPosts.data?.map((post: MediumPost) => {
            let img = ''
            const imgMatch = post.description?.match(/<img[^>]*src=["']([^"'>]+)["'][^>]*>/i)
            if (imgMatch?.[1]) img = imgMatch[1]
            const imageUrl = post.thumbnail || img
            const id = post.guid?.split('/').pop()
            return (
              <article key={post.guid} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={imageUrl} alt={post.title} className={styles.image} />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      <i className="ri-time-line" aria-hidden="true" /> {post.readingTime || '5 dk'}
                    </span>
                    <span className={styles.metaItem}>
                      <i className="ri-medium-fill" aria-hidden="true" /> Medium
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardDesc}>{post.description?.replace(/<[^>]+>/g, '').slice(0, 120) + '...'}</p>
                  <Link to="/$postId" params={{ postId: String(id) }} className={styles.readLink}>
                    Devamını Oku <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}

          {devtoPosts.isLoading && <div>Yükleniyor...</div>}
          {devtoPosts.isError && <div>Dev.to makaleleri alınamadı.</div>}
          {devtoPosts.data?.map((post: DevToPost) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={post.cover_image ?? ''} alt={post.title} className={`${styles.image} ${styles.imageCover}`} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <i className="ri-time-line" aria-hidden="true" /> {post.reading_time_minutes || '5'} dk
                  </span>
                  <span className={styles.metaItem}>
                    <i className="ri-code-box-fill" aria-hidden="true" /> Dev.to
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardDesc}>{post.description?.slice(0, 120) + '...'}</p>
                <Link to="/$postId" params={{ postId: String(post.id) }} className={styles.readLink}>
                  Devamını Oku <i className="ri-arrow-right-line" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.wavesvg}>
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>
    </section>
  )
}

export default Blogs

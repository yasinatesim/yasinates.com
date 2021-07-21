import { Helmet } from 'react-helmet';

// Components
import About from '@/universal/containers/about';

/**
 * This is about page
 */
function AboutPage() {
  return (
    <div>
      <Helmet>
        <title>Hakkımda | Yasin ATEŞ - Frontend Developer</title>
        <meta
          name="description"
          content="Merhaba Ben Yasin ATEŞ, 2012 yılında başlayan yazlımcılık hikayeme, 2015 yılından beri Frontend Developer olarak devam ediyorum"
        />

        <meta property="og:title" content="Hakkımda | Yasin ATEŞ - Frontend Developer" />
        <meta
          property="og:description"
          content="Merhaba Ben Yasin ATEŞ, 2012 yılında başlayan yazlımcılık hikayeme, 2015 yılından beri Frontend Developer olarak devam ediyorum"
        />
      </Helmet>

      <About />
    </div>
  );
}

export default AboutPage;

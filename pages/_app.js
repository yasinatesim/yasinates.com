import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// Components
import Header from '@/universal/partials/header';
import Footer from '@/universal/partials/footer';

// Styles
import '@/assets/styles/app.scss';

function Layout({ Component, pageProps }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Yasin ATEŞ - Frontend Developer</title>
        <meta
          name="description"
          content="Merhaba Ben Yasin ATEŞ, 2012 yılında başlayan yazlımcılık hikayeme, 2015 yılından beri Frontend Developer olarak devam ediyorum"
        />

        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="303036" />
        <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
        <meta name="theme-color" content="303036" />
        <link rel="canonical" href="https://yasinates.com/" />

        <meta
          name="description"
          content="Merhaba Ben Yasin ATEŞ, 2012 yılında başlayan yazlımcılık hikayeme, 2015 yılından beri Frontend Developer olarak devam ediyorum"
        />
        <meta name="author" content="Yasin ATEŞ" />
        <meta name="classification" content="yasin ateş, frontend developer yasin ateş" />
        <meta name="copyright" content="11 Temmuz 2019 yasinates.com" />
        <meta property="og:url" content="https://yasinates.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Yasin ATEŞ - Frontend Developer" />
        <meta
          property="og:description"
          content="Merhaba Ben Yasin ATEŞ, 2012 yılında başlayan yazlımcılık hikayeme, 2015 yılından beri Frontend Developer olarak devam ediyorum"
        />
        <meta property="og:image" content="https://yasinates.com/favicons/apple-icon-180x180.png" />
        <meta property="og:site_name" content="Yasin ATEŞ - Frontend Developer" />
        <meta property="og:locale" content="tr-TR" />
        <meta property="article:author" content="Yasin ATEŞ" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link type="text/plain" rel="author" href="https://yasinates.com/humans.txt" />
      </Helmet>

      {/* Header */}
      <Header />

      {/* Page content */}
      <main>
        <Component {...pageProps} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};

export default Layout;

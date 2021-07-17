// Components
import Title from '@/universal/components/title';
import SocialMedia from '@/universal/components/social-media';

// Images
import AboutImage from '@/assets/images/yasin-ates.jpg';

// Styles
import styles from './index.module.scss';

/**
 * This is about container
 ** This is main component include in the "pages"
 */
function About() {
  return (
    <div className="container">
      {/* Title */}
      <Title title="Hakkımda" subtitle="Frontend Developer" />

      <div className="row">
        <div className="col-md-5">
          <div className={styles.image}>
            {/* Image */}
            <img src={AboutImage} alt="Yasin ATEŞ" />
          </div>
        </div>
        <div className={`col-md-6 ${styles.content}`}>
          <div className={styles.container}>
            {/* Text */}
            <h1>Merhaba Ben Yasin ATEŞ, 👋🏻</h1>
            <div className={styles.subTitle}>HTML5, CSS3, SASS, JavaScript, ES6, React, Redux</div>
            <p>
              2012 yılında başlayan yazlımcılık hikayeme, 2015 yılından beri Frontend Developer olarak devam ediyorum.
              Genellikle frontend ağırlıklı olmak üzere, yazılımla ilgili güncel teknolojileri takip etmeye çalışıyorum.
              Medium'da paylaşmış olduğum Türkçe içerikleri, İngilizce olarak dev.to'da paylaşıyorum. Beni daha yakından
              tanımak ve hesaplarımı takip etmek için aşağıdaki bağlantıları takip edebilirsiniz.
            </p>

            {/* Social Media Icons */}
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

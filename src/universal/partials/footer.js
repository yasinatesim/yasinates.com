// Components
import SocialMedia from '@/universal/components/social-media';

/**
 * This is basic footer component
 */
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            Copyright &copy;
            {new Date().getFullYear()} | @yasinatesim
          </div>
          <div className="col-md-6">
            <div className="footer-social-links">
              {/* Social Media */}
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

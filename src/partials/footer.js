// Components
import SocialMedia from '@/components/social-media';

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
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import Link from 'next/link';

function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <Link href="/">
            <a>
              <svg width="36" height="22" viewBox="0 0 36 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23.2801 20.7501L21.6884 12.3089C21.5116 11.7813 22.219 11.2537 22.7496 11.4296L34.4221 14.0675C35.3064 14.2433 35.837 13.1882 35.1295 12.6606L14.4373 0.70229C13.7299 0.350575 13.0224 0.878148 13.0224 1.40572L14.6141 9.84689C14.791 10.3745 14.0836 10.902 13.3761 10.7262L1.17303 7.38488C0.288742 7.03317 -0.418686 8.26417 0.288742 8.79174L21.6884 21.6294C22.5727 21.8052 23.457 21.4535 23.2801 20.7501Z"
                  fill="#303036"
                />
              </svg>
            </a>
          </Link>

          <ul>
            <li>
              <Link href="/">
                <a>Ana Sayfa</a>
              </Link>
            </li>

            <li>
              <Link href="/hakkimda">
                <a>Hakkımda</a>
              </Link>
            </li>

            <li>
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>

            <li>
              <Link href="/github">
                <a>Github</a>
              </Link>
            </li>

            <li>
              <a href="mailto:yasinatesim@gmail.com">İletişim</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

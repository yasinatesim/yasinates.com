import PropTypes from 'prop-types';

// Images
import ForkIcon from '@/img/github-fork-icon.png';

// Styles
import styles from './index.module.scss';

function ProjectItem({ title, link, description, fork }) {
  return (
    <a href={link} className={styles.item} target="_blank" rel="noreferrer">
      {fork && <img src={ForkIcon} alt="Katkı" className={styles.fork} />}
      <svg className={styles.arrow} width={75} height={75} viewBox="0 0 75 75" fill="none">
        <path transform="rotate(90 75 0)" fill="url(#prefix__pattern0)" d="M75 0h75v75H75z" />
        <defs>
          <pattern id="prefix__pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
            <use xlinkHref="#prefix__image0" transform="scale(.0091)" />
          </pattern>
          <image
            id="prefix__image0"
            width={110}
            height={110}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuBAMAAAA0dTvIAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAABVQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgEApAAAAAd0Uk5TnwD/QM+/j5k9jocAAAC4SURBVHic7c2xEcIwAARBuQQ6+FEHFEEJ0H8p2JIlKwHmj/Qv37my3VBF0FU2LJUNS2XD3aHh7tDwcGR4ODJsDgybA8Pu/GF3/vB09vB09nA4dzicO5zOHE5nDi/nDS/nDRdnDRdnDVfnDFdX73FxcXFxcXFxcXFxcXF/ucfzW6+P7kcbdIJuHVpO0C1Dzwm6a2g6QTeHrhN0Y2g7QXcOfSfo+hA4QdeGxAm6Y4icoNuHzAm6ukGnNwMMKQ6VuAe9AAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>

      <svg className={styles.arrow} width={75} height={75} viewBox="0 0 75 75" fill="none">
        <path transform="rotate(90 75 0)" fill="url(#prefix__pattern0)" d="M75 0h75v75H75z" />
        <defs>
          <pattern id="prefix__pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
            <use xlinkHref="#prefix__image0" transform="scale(.0091)" />
          </pattern>
          <image
            id="prefix__image0"
            width={110}
            height={110}
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuBAMAAAA0dTvIAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAABVQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgEApAAAAAd0Uk5TnwD/QM+/j5k9jocAAAC4SURBVHic7c2xEcIwAARBuQQ6+FEHFEEJ0H8p2JIlKwHmj/Qv37my3VBF0FU2LJUNS2XD3aHh7tDwcGR4ODJsDgybA8Pu/GF3/vB09vB09nA4dzicO5zOHE5nDi/nDS/nDRdnDRdnDVfnDFdX73FxcXFxcXFxcXFxcXF/ucfzW6+P7kcbdIJuHVpO0C1Dzwm6a2g6QTeHrhN0Y2g7QXcOfSfo+hA4QdeGxAm6Y4icoNuHzAm6ukGnNwMMKQ6VuAe9AAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>

      <div className={styles.content}>
        <svg height={63} viewBox="0 0 16 16" width={65} aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>

        <span className={styles.title}>{title}</span>
        <p>{description}</p>
      </div>
    </a>
  );
}

ProjectItem.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string,
};

export default ProjectItem;

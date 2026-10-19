import { page } from '../main';
import '../styles/technology.css';

import { Download } from '../components/Download';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { Games } from '../components/Games';
import { Hero3D, mountHero3D } from '../components/Hero3D';
import { SchoolProjects } from '../components/SchoolProjects';
import { featured, games, school } from '../data/projects';
import { site } from '../data/site';

// Block order: DESIGN_BACKLOG.md §5.
page(
  '/technology.html',
  [
    Hero3D({ id: 'computer', label: 'Technology', title: 'Things I build.', hint: 'Drag the machine.' }),
    FeaturedProjects(featured),
    SchoolProjects(school),
    Games(games),
    Download({
      label: 'CV',
      title: 'Curriculum vitae.',
      text: 'Studies, projects, and skills in one PDF.',
      href: site.downloads.cv,
      cta: 'Download the CV',
    }),
  ].join(''),
);

mountHero3D('computer', 'COMPUTER_MODEL_DATA');

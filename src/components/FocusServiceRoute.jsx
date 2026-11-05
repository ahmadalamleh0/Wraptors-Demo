import { useParams } from 'react-router-dom';
import FocusServicePage from './FocusServicePage';
import NotFoundPage from './NotFoundPage';
import { FOCUS_PAGES } from '../data/serviceSeo';

// /services/:slug for the Chrome Delete + vehicle pages. Lives in its own
// chunk with the SEO data it needs, so the homepage doesn't download it.
// Static /services/* routes (wraps, ppf, …) still win over this one; an
// unknown slug renders the 404 page, as the catch-all route did before.
export default function FocusServiceRoute() {
  const { slug } = useParams();
  const page = FOCUS_PAGES.find((p) => p.slug === slug);
  // key: a fresh mount per page, as when each page had its own <Route>.
  return page ? <FocusServicePage key={page.slug} page={page} /> : <NotFoundPage />;
}

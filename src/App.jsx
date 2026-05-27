import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { FavoritesProvider } from '@/lib/FavoritesContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ui/ScrollToTop';
import AppLayout from '@/components/layout/AppLayout';
import Home from '@/pages/Home';
import Facts from '@/pages/Facts';
import Guides from '@/pages/Guides';
import Quiz from '@/pages/Quiz';
import Pack from '@/pages/Pack';
import Encyclopedia from '@/pages/Encyclopedia';
import Blog from '@/pages/Blog';
import GuideDetail from '@/pages/GuideDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AnimalFacts from '@/pages/AnimalFacts';
import TriviaQuiz from '@/pages/TriviaQuiz';
import DonateSuccess from '@/pages/DonateSuccess';
import DonateCancel from '@/pages/DonateCancel';
import AnalyticsTracker from '@/components/AnalyticsTracker';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <span className="text-4xl block mb-3 animate-wiggle">🦁</span>
          <div className="w-8 h-8 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError.type === 'auth_required') { navigateToLogin(); return null; }
  }

  return (
    <>
    <AnalyticsTracker />
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/facts" element={<Facts />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/:id" element={<GuideDetail />} />
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/pack" element={<Pack />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/animal-facts" element={<AnimalFacts />} />
        <Route path="/trivia" element={<TriviaQuiz />} />
        <Route path="/donate/success" element={<DonateSuccess />} />
        <Route path="/donate/cancel" element={<DonateCancel />} />
        </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
            <AuthenticatedApp />
            <ScrollToTop />
        </Router>
        <Toaster />
      </QueryClientProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
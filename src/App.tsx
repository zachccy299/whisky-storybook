import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { AuthProvider } from './lib/AuthContext';
import { Header, Footer, AlcoholWarning } from './components/Navigation';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { BadgeShareRedirect } from './pages/BadgeShareRedirect';
import { AdminMessages } from './pages/AdminMessages';
import { Leaderboard } from './pages/Leaderboard';
import { Regulations } from './pages/Regulations';
import { ScotchRegulations } from './pages/ScotchRegulations';
import { BourbonRegulations } from './pages/BourbonRegulations';
import { IrishRegulations } from './pages/IrishRegulations';
import { EURegulations } from './pages/EURegulations';
import { JapaneseRegulations } from './pages/JapaneseRegulations';
import { CanadianRegulations } from './pages/CanadianRegulations';
import { RegionComparison } from './pages/RegionComparison';
import { WhiskyProcess } from './pages/WhiskyProcess';
import { ProcessHome } from './pages/ProcessHome';
import { ProcessMenu } from './pages/ProcessMenu';
import { DistillerSays } from './pages/DistillerSays';
import { OneDayDistiller } from './pages/OneDayDistiller';
import { ExamHome } from './pages/ExamHome';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { Milestone } from './pages/Milestone';
import { MessagePage } from './pages/MessagePage';
import { UnitExam } from './pages/UnitExam';
import { PlaceholderPage } from './pages/Placeholder';
import { SpiritsProcessFull } from './pages/SpiritsProcessFull';
import { SpiritsClassification } from './pages/SpiritsClassification';
import { NotFound } from './pages/NotFound';
import { MouseBlog } from './pages/MouseBlog';
import { MousePost } from './pages/MousePost';
import { AdminPosts } from './pages/AdminPosts';
import { PostEditor } from './pages/PostEditor';
import { AdminAuthors } from './pages/AdminAuthors';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Header />
          <main className="flex-grow pb-24 md:pb-32">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/badge/share" element={<BadgeShareRedirect />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/regulations" element={<Regulations />} />
              <Route path="/regulations/scotch" element={<ScotchRegulations />} />
              <Route path="/regulations/bourbon" element={<BourbonRegulations />} />
              <Route path="/regulations/irish" element={<IrishRegulations />} />
              <Route path="/regulations/eu" element={<EURegulations />} />
              <Route path="/regulations/japanese" element={<JapaneseRegulations />} />
              <Route path="/regulations/canadian" element={<CanadianRegulations />} />
              <Route path="/regulations/comparison" element={<RegionComparison />} />
              <Route path="/regulations/*" element={<PlaceholderPage title="法規與產區" />} />
              <Route path="/process/whisky" element={<WhiskyProcess />} />
              <Route path="/process/full" element={<SpiritsProcessFull />} />
              <Route path="/process/classification" element={<SpiritsClassification />} />
              <Route path="/process/menu" element={<ProcessMenu />} />
              <Route path="/process" element={<ProcessHome />} />
              <Route path="/process/*" element={<ProcessHome />} />
              <Route path="/blog" element={<MouseBlog />} />
              <Route path="/blog/mouse" element={<MouseBlog />} />
              <Route path="/blog/mouse/:slug" element={<MousePost />} />
              <Route path="/admin/posts" element={<AdminPosts />} />
              <Route path="/admin/posts/new" element={<PostEditor />} />
              <Route path="/admin/posts/edit/:id" element={<PostEditor />} />
              <Route path="/admin/authors" element={<AdminAuthors />} />
              <Route path="/one-day-distiller" element={<OneDayDistiller />} />
              <Route path="/blog/*" element={<MouseBlog />} />
              <Route path="/exam" element={<ExamHome />} />
              <Route path="/exam/quiz" element={<Quiz />} />
              <Route path="/exam/result" element={<Result />} />
              <Route path="/exam/unit/:unitId" element={<UnitExam />} />
              <Route path="/milestone" element={<Milestone />} />
        <Route path="/message" element={<MessagePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <AlcoholWarning />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

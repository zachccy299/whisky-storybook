export type QuizMode = 'random' | 'module' | 'mistakes';

export interface Question {
  id: string;
  module: string;
  keyword: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface ExamResult {
  score: number;
  correctCount: number;
  total: number;
  questions: (Question & { userSelection: string })[];
  timestamp: string;
  timeTaken?: number;
}

export interface UserProfile {
  id: string;
  display_name: string;
  photo_url: string | null;
  created_at: string;
}

export interface UserStats {
  best_monthly_scores: number[];
  monthly_average: number;
  total_exams_this_month: number;
  total_score_this_month: number;
  last_month: number;
}

export interface Badge {
  id: string;
  badge_id: string;
  badge_name: string;
  awarded_at: string;
}

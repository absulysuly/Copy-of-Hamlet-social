import React, { useState, useEffect } from 'react';
import { User, Question, Answer, Language } from '../../types';
import * as api from '../../services/apiService';
import * as gemini from '../../services/geminiService';
import { UI_TEXT } from '../../translations';
import Spinner from '../Spinner';
import { QuestionMarkCircleIcon, LightBulbIcon } from '../icons/Icons';

interface AskNeighborViewProps {
    user: User | null;
    requestLogin: () => void;
    language: Language;
}

const AnswerCard: React.FC<{ answer: Answer }> = ({ answer }) => {
    const isAI = answer.author.name === 'AI';
    return (
        <div className={`flex items-start gap-3 p-3 rounded-lg ${isAI ? 'bg-primary/10' : ''}`}>
            <img src={answer.author.avatarUrl} alt={answer.author.name} className="w-8 h-8 rounded-full" />
            <div className="flex-1">
                <p className="font-bold text-sm text-theme-text-base flex items-center">
                    {answer.author.name}
                    {isAI && <LightBulbIcon className="w-4 h-4 text-primary ml-1.5" />}
                </p>
                <p className="text-sm text-theme-text-base whitespace-pre-line">{answer.answerText}</p>
                <p className="text-xs text-theme-text-muted mt-1">{answer.timestamp}</p>
            </div>
        </div>
    );
}

const QuestionCard: React.FC<{
    question: Question;
    onAskAI: (questionId: string, questionText: string, governorate: string) => void;
    isGeneratingAI: boolean;
}> = ({ question, onAskAI, isGeneratingAI }) => {
    const texts = UI_TEXT['en']; // Assuming a default for now
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="glass-card rounded-lg p-4">
            <div className="flex items-start gap-3">
                <img src={question.author.avatarUrl} alt={question.author.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                    <p className="text-sm text-theme-text-muted">{question.author.name} asked in <span className="font-bold">{question.governorate}</span></p>
                    <p className="text-lg font-semibold text-theme-text-base mt-1">{question.questionText}</p>
                    <div className="flex items-center justify-between mt-3">
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-bold text-primary hover:underline">
                            {isExpanded ? 'Hide Answers' : `View ${question.answers.length} Answers`}
                        </button>
                        <button
                            onClick={() => onAskAI(question.id, question.questionText, question.governorate)}
                            disabled={isGeneratingAI}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary/20 text-primary rounded-full hover:bg-primary/30 disabled:opacity-50"
                        >
                            {isGeneratingAI ? <Spinner /> : <LightBulbIcon className="w-4 h-4" />}
                            <span>{texts.askAI}</span>
                        </button>
                    </div>
                </div>
            </div>
            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    {question.answers.length > 0 ? (
                        question.answers.map(answer => <AnswerCard key={answer.id} answer={answer} />)
                    ) : (
                        <p className="text-sm text-theme-text-muted text-center">No answers yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}

const AskNeighborView: React.FC<AskNeighborViewProps> = ({ user, requestLogin, language }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newQuestion, setNewQuestion] = useState('');
    const [generatingAIFor, setGeneratingAIFor] = useState<string | null>(null);
    const texts = UI_TEXT[language];

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const data = await api.getQuestions();
                setQuestions(data);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleAskQuestion = () => {
        if (!user) {
            requestLogin();
            return;
        }
        if (!newQuestion.trim()) return;
        // Mock creating a question
        const question: Question = {
            id: `q${Date.now()}`,
            author: user,
            questionText: newQuestion,
            timestamp: 'Just now',
            answers: [],
            governorate: user.governorate,
        };
        setQuestions(prev => [question, ...prev]);
        setNewQuestion('');
    };

    const handleAskAI = async (questionId: string, questionText: string, governorate: string) => {
        setGeneratingAIFor(questionId);
        try {
            const aiAnswerText = await gemini.generateAnswerForNeighbor(questionText, governorate);
            const aiAnswer: Answer = {
                id: `a${Date.now()}`,
                author: { name: 'AI', avatarUrl: 'https://www.gstatic.com/lamda/images/sparkle_resting_v2_darkmode_227533908ff218654087.gif' },
                answerText: aiAnswerText,
                timestamp: 'Just now',
            };
            setQuestions(prev => prev.map(q =>
                q.id === questionId
                    ? { ...q, answers: [aiAnswer, ...q.answers] }
                    : q
            ));
        } catch (error) {
            console.error("AI answer generation failed:", error);
            alert("Failed to get an answer from AI.");
        } finally {
            setGeneratingAIFor(null);
        }
    }

    return (
        <div className="p-4 sm:p-6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <QuestionMarkCircleIcon className="w-16 h-16 text-primary mx-auto mb-2" />
                <h1 className="text-3xl font-bold font-arabic">{texts.askNeighbor}</h1>
                <p className="text-theme-text-muted mt-1">{texts.askNeighborDesc}</p>
            </div>

            <div className="glass-card p-4 rounded-lg mb-6">
                <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    rows={3}
                    className="w-full bg-transparent border-0 focus:ring-0 placeholder-theme-text-muted text-lg"
                    placeholder={texts.askAQuestionPlaceholder}
                />
                <div className="flex justify-end mt-2">
                    <button onClick={handleAskQuestion} disabled={!newQuestion.trim()} className="btn-primary">
                        {texts.ask}
                    </button>
                </div>
            </div>

            {isLoading ? <Spinner /> : (
                <div className="space-y-4">
                    {questions.map(q => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            onAskAI={handleAskAI}
                            isGeneratingAI={generatingAIFor === q.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AskNeighborView;

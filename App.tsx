import React, { useState, useEffect } from 'react';
import { User, UserRole, Governorate, Language, AppTab, Post, HomeViewMode, ThemeName, MainContentTab } from './types.ts';
import * as api from './services/apiService.ts';
import { SLUG_PARTY_MAP, GOVERNORATE_SLUG_MAP } from './constants.ts';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import BottomBar from './components/BottomBar.tsx';

import HomeView from './components/views/HomeView.tsx';
import PublicDiscoverView from './components/views/PublicDiscoverView.tsx';
import TeaHouseView from './components/views/TeaHouseView.tsx';
import DebateRoomView from './components/views/DebateRoomView.tsx';
import SettingsView from './components/views/SettingsView.tsx';
import UserProfileView from './components/views/UserProfileView.tsx';
import CandidateProfileView from './components/views/CandidateProfileView.tsx';
import CandidateDashboardView from './components/views/CandidateDashboardView.tsx';
import InvitationConsole from './components/InvitationConsole.tsx';

import LoginModal from './components/LoginModal.tsx';
import ComposeModal from './components/ComposeModal.tsx';
import FullScreenReelView from './components/views/FullScreenReelView.tsx';
import ElectionManagementView from './components/views/ElectionManagementView.tsx';
import ElectionHero from './components/ElectionHero.tsx';
import QRScannerModal from './components/QRScannerModal.tsx';
import { colorThemes } from './utils/colorThemes.ts';
import CrossPlatformNavigationView from './components/views/CrossPlatformNavigationView.tsx';
import LanguageSwitcher from './components/LanguageSwitcher.tsx';
import PostDetailModal from './components/PostDetailModal.tsx';

const App: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [user, setUser] = useState<User | null>(null);
    const [homeViewMode, setHomeViewMode] = useState<HomeViewMode>('Social');
    const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Home);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isComposeModalOpen, setComposeModalOpen] = useState(false);
    const [isQrScannerOpen, setQrScannerOpen] = useState(false);
    const [isHighContrast, setHighContrast] = useState(false);
    const [language, setLanguage] = useState<Language>('ar');
    const [activeTheme, setActiveTheme] = useState<ThemeName>('euphratesTeal');

    // Filters
    const [selectedGovernorate, setSelectedGovernorate] = useState<Governorate | 'All'>('All');
    const [selectedParty, setSelectedParty] = useState<string | 'All'>('All');
    const [parties, setParties] = useState<string[]>([]);

    // View-specific state
    const [selectedProfile, setSelectedProfile] = useState<User | null>(null);
    const [selectedReel, setSelectedReel] = useState<Post | null>(null);
    const [selectedPostForDetail, setSelectedPostForDetail] = useState<Post | null>(null);
    const [electionPath, setElectionPath] = useState('/');
    const [mainHomeTab, setMainHomeTab] = useState<MainContentTab>(AppTab.Posts);
    
    // --- ROUTING ---
    const [isPublicDiscoverPage, setIsPublicDiscoverPage] = useState(false);
    useEffect(() => {
        if (window.location.pathname === '/discover') {
            setIsPublicDiscoverPage(true);
        }
    }, []);


    // Election System State
    const [showElectionSystem, setShowElectionSystem] = useState(false);
    const [electionView, setElectionView] = useState<'home' | 'admin' | 'candidates'>('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGovernorateFilter, setSelectedGovernorateFilter] = useState<string>('الكل');

    // Election system mock data
    const mockCandidates = [
      { id: '1', name: 'أحمد محمد علي', governorate: 'بغداد', party: 'الحزب الديمقراطي', phone: '07701234567', email: 'ahmed@example.com', isVerified: true },
      { id: '2', name: 'فاطمة حسن', governorate: 'البصرة', party: 'التحالف الوطني', phone: '07707654321', email: 'fatima@example.com', isVerified: true },
      { id: '3', name: 'محمد عبدالله', governorate: 'أربيل', party: 'الاتحاد الوطني', phone: '07709876543', email: 'mohammed@example.com', isVerified: false },
      { id: '4', name: 'سارة خالد', governorate: 'الأنبار', party: 'الحزب الإسلامي', phone: '07705556677', email: 'sara@example.com', isVerified: true },
      { id: '5', name: 'علي محمود', governorate: 'نينوى', party: 'الجبهة التركمانية', phone: '07704443322', email: 'ali@example.com', isVerified: false },
      { id: '6', name: 'لينا أحمد', governorate: 'كربلاء', party: 'تيار الحكمة', phone: '07701112233', email: 'layla@example.com', isVerified: true },
    ];

    const governorates = ['الكل', 'بغداد', 'البصرة', 'أربيل', 'الأنبار', 'نينوى', 'كربلاء', 'النجف', 'الديوانية', 'واسط', 'المثنى', 'القادسية', 'بابل', 'كركوك', 'ديالى', 'السليمانية', 'دهوك', 'صلاح الدين'];

    const filteredCandidates = mockCandidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.governorate.includes(searchTerm);
      const matchesGovernorate = selectedGovernorateFilter === 'الكل' || candidate.governorate === selectedGovernorateFilter;
      return matchesSearch && matchesGovernorate;
    });

    // --- EFFECTS ---
    useEffect(() => {
        api.getParties().then(setParties);
    }, []);

    // Effect for dual-brand theme switching
    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;
        
        // Determine which theme object to use
        const theme = homeViewMode === 'Election' 
            ? colorThemes.electionPortal 
            : colorThemes[activeTheme];
            
        // Apply CSS variables from the selected theme
        for (const [key, value] of Object.entries(theme)) {
            root.style.setProperty(key, value as string);
        }
        
        // Add/remove class to body for mode-specific global styles
        if (homeViewMode === 'Election') {
            body.classList.add('election-mode');
            body.classList.remove('social-mode');
        } else {
            body.classList.add('social-mode');
            body.classList.remove('election-mode');
        }

    }, [activeTheme, homeViewMode]);

    // --- HANDLERS ---
    const handleLogin = (loggedInUser: User) => {
        setUser(loggedInUser);
        setLoginModalOpen(false);
        if (loggedInUser.role === UserRole.Candidate) {
            setActiveTab(AppTab.Dashboard);
        } else {
            setActiveTab(AppTab.Home);
        }
    };

    const handleUpdateUser = (updatedUser: User) => {
        setUser(updatedUser);
    }
    
    const handleNavigate = (tab: AppTab) => {
        setSelectedProfile(null);
        setActiveTab(tab);
    };

    const handleSelectProfile = (profile: User) => {
        if (!user) {
            setLoginModalOpen(true);
            return;
        }
        if (profile.id === user.id) {
            setActiveTab(AppTab.UserProfile);
            return;
        }
        if (profile.role === UserRole.Candidate) {
            setSelectedProfile(profile);
            setActiveTab(AppTab.CandidateProfile);
        }
    };

    const handleSelectReel = (reel: Post) => {
        if (!user) {
            setLoginModalOpen(true);
            return;
        }
        setSelectedReel(reel);
    };
    
    const handleSelectPost = (post: Post) => {
        setSelectedPostForDetail(post);
    };
    
    const handleClosePostDetail = () => {
        setSelectedPostForDetail(null);
    };

    const handleQrScanSuccess = (data: string) => {
        try {
            const url = new URL(data);
            const partySlug = url.searchParams.get('party');
            const govSlug = url.searchParams.get('gov');

            if (partySlug && govSlug) {
                const party = SLUG_PARTY_MAP[partySlug] || 'All';
                const governorate = Object.entries(GOVERNORATE_SLUG_MAP).find(([_name, slug]) => slug === govSlug)?.[0] as Governorate | 'All' || 'All';
                
                setSelectedParty(party);
                setSelectedGovernorate(governorate);
                
                setHomeViewMode('Social');
                setActiveTab(AppTab.Home);
                setMainHomeTab(AppTab.Candidates);
                setQrScannerOpen(false);
            }
        } catch (error) {
            console.error("Invalid QR code data:", error);
            // Optionally, show an error to the user
        }
    };
    
    const handleNavigateToCandidates = () => {
        handleNavigate(AppTab.Home);
        setMainHomeTab(AppTab.Candidates);
    };

    // Election system handlers
    const handleElectionLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (username === 'admin' && password === 'election2025') {
        setIsLoggedIn(true);
        setLoginError('');
        setElectionView('admin');
      } else {
        setLoginError('بيانات الدخول غير صحيحة');
      }
    };

    const handleElectionLogout = () => {
      setIsLoggedIn(false);
      setElectionView('home');
      setUsername('');
      setPassword('');
    };

    const renderElectionView = () => {
      if (electionView === 'admin' && !isLoggedIn) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">لوحة إدارة الانتخابات</h2>
                <p className="text-gray-600 mt-2">النظام الرسمي لإدارة المرشحين العراقيين</p>
              </div>

              <form onSubmit={handleElectionLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المستخدم
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل اسم المستخدم"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>

                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  تسجيل الدخول للإدارة
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setElectionView('home')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  العودة للصفحة الرئيسية
                </button>
              </div>
            </div>
          </div>
        );
      }

      if (electionView === 'admin') {
        return (
          <div className="min-h-screen bg-gray-50" dir="rtl">
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center ml-3">
                      <span className="text-white font-bold text-lg">🗳️</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      نظام إدارة الانتخابات العراقية
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setElectionView('home')}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                    >
                      الصفحة الرئيسية
                    </button>
                    <button
                      onClick={handleElectionLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">مرحباً بك في لوحة الإدارة</h2>
                  <p className="text-gray-600">يمكنك إدارة جميع جوانب العملية الانتخابية من هنا</p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                            <span className="text-white font-bold">👥</span>
                          </div>
                        </div>
                        <div className="mr-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              إجمالي المرشحين
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              6,988
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                            <span className="text-white font-bold">✅</span>
                          </div>
                        </div>
                        <div className="mr-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              مرشحين معتمدين
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              4,192
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                            <span className="text-white font-bold">📧</span>
                          </div>
                        </div>
                        <div className="mr-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              دعوات مرسلة
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              2,345
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                            <span className="text-white font-bold">📍</span>
                          </div>
                        </div>
                        <div className="mr-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              المحافظات
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              18
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center ml-4">
                          <span className="text-white text-xl">📤</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            إرسال الدعوات
                          </h3>
                          <p className="text-sm text-gray-500">
                            أرسل دعوات التسجيل للمرشحين
                          </p>
                        </div>
                      </div>
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        إرسال الدعوات
                      </button>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center ml-4">
                          <span className="text-white text-xl">📊</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            جمع البيانات
                          </h3>
                          <p className="text-sm text-gray-500">
                            جمع معلومات التواصل من وسائل التواصل الاجتماعي
                          </p>
                        </div>
                      </div>
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                        بدء الجمع
                      </button>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center ml-4">
                          <span className="text-white text-xl">👥</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            إدارة المرشحين
                          </h3>
                          <p className="text-sm text-gray-500">
                            عرض وتحرير بيانات المرشحين
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setElectionView('candidates')}
                        className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                      >
                        إدارة المرشحين
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <div className="fixed bottom-4 left-4 z-50">
              <button
                onClick={() => setShowElectionSystem(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                🔄 Back to Social Platform
              </button>
            </div>
          </div>
        );
      }

      if (electionView === 'candidates') {
        return (
          <div className="min-h-screen bg-gray-50" dir="rtl">
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center ml-3">
                      <span className="text-white font-bold text-lg">👥</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      إدارة المرشحين
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setElectionView('admin')}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      العودة للإدارة
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCandidates.map((candidate) => (
                    <div key={candidate.id} className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xl font-medium text-gray-700">
                                {candidate.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="mr-4 flex-1">
                            <h3 className="text-lg font-medium text-gray-900">
                              {candidate.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {candidate.governorate}
                            </p>
                            {candidate.party && (
                              <p className="text-sm text-blue-600 font-medium">
                                {candidate.party}
                              </p>
                            )}
                          </div>
                          {candidate.isVerified && (
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                معتمد
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {candidate.phone && (
                              <span>📞 {candidate.phone}</span>
                            )}
                            {candidate.email && (
                              <span>✉️ {candidate.email}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>

            <div className="fixed bottom-4 left-4 z-50">
              <button
                onClick={() => setShowElectionSystem(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                🔄 Back to Social Platform
              </button>
            </div>
          </div>
        );
      }

      // Election Home View
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center ml-3">
                    <span className="text-white font-bold text-xl">🗳️</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    نظام إدارة الانتخابات العراقية
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setElectionView('admin')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    لوحة الإدارة
                  </button>
                </div>
              </div>
            </div>
          </header>

          <section className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                  الانتخابات العراقية 2025
                </h2>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                  منصة شاملة لإدارة المرشحين وجمع البيانات للحملات الانتخابية الناجحة
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">6,988</div>
                  <div className="text-lg text-gray-600">مرشح مسجل</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">18</div>
                  <div className="text-lg text-gray-600">محافظة عراقية</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600">100%</div>
                  <div className="text-lg text-gray-600">دعم النص العربي</div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900">المميزات الرئيسية</h3>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">إدارة شاملة للمرشحين</h4>
                  <p className="text-gray-600">استيراد وإدارة بيانات الآلاف من المرشحين مع دعم كامل للنصوص العربية</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🤖</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">جمع بيانات تلقائي</h4>
                  <p className="text-gray-600">جمع معلومات التواصل من وسائل التواصل الاجتماعي للحملات الانتخابية</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">إرسال دعوات جماعي</h4>
                  <p className="text-gray-600">إرسال دعوات التسجيل والتواصل للمرشحين بكفاءة عالية</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                ابدأ حملتك الانتخابية اليوم
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                انضم إلى النظام الرسمي لإدارة الانتخابات العراقية واجعل حملتك أكثر تنظيماً وفعالية
              </p>
              <button
                onClick={() => setElectionView('admin')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                دخول لوحة الإدارة
              </button>
            </div>
          </section>

          <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-400">
                © 2025 نظام إدارة الانتخابات العراقية. جميع الحقوق محفوظة.
              </p>
            </div>
          </footer>

          <div className="fixed bottom-4 left-4 z-50">
            <button
              onClick={() => setShowElectionSystem(false)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              🔄 Back to Social Platform
            </button>
          </div>
        </div>
      );
    };

    // --- RENDER LOGIC ---
    if (isPublicDiscoverPage) {
        return (
             <div className="min-h-screen font-sans">
                <PublicDiscoverView />
            </div>
        )
    }
    
    const renderSocialContent = () => {
         if (selectedReel) {
            return <FullScreenReelView reel={selectedReel} onClose={() => setSelectedReel(null)} user={user} requestLogin={() => setLoginModalOpen(true)} />
        }
        
        const homeViewProps = {
            user: user,
            requestLogin: () => setLoginModalOpen(true),
            selectedGovernorate: selectedGovernorate,
            onGovernorateChange: setSelectedGovernorate,
            selectedParty: selectedParty,
            onPartyChange: setSelectedParty,
            parties: parties,
            onSelectProfile: handleSelectProfile,
            onSelectReel: handleSelectReel,
            onSelectPost: handleSelectPost,
            language: language,
            activeTab: mainHomeTab,
            onTabChange: setMainHomeTab,
        };

        switch (activeTab) {
            case AppTab.Home:
            case AppTab.Discover:
                return <HomeView {...homeViewProps} />;
            case AppTab.TeaHouse:
                return <TeaHouseView user={user} requestLogin={() => setLoginModalOpen(true)} language={language} />;
            case AppTab.DebateRoom:
                return <DebateRoomView />;
            case AppTab.Navigate:
                return <CrossPlatformNavigationView onNavigateToCandidates={handleNavigateToCandidates} onQrScan={() => setQrScannerOpen(true)} />;
            case AppTab.Settings:
                return <SettingsView isHighContrast={isHighContrast} onToggleContrast={() => setHighContrast(p => !p)} activeTheme={activeTheme} onChangeTheme={setActiveTheme} />;
            case AppTab.UserProfile:
                return user ? <UserProfileView user={user} onUpdateUser={handleUpdateUser} language={language} onSelectProfile={handleSelectProfile} onSelectPost={handleSelectPost} /> : <HomeView {...homeViewProps} />;
            case AppTab.CandidateProfile:
                 return selectedProfile ? <CandidateProfileView candidate={selectedProfile} user={user} requestLogin={() => setLoginModalOpen(true)} language={language} onSelectProfile={handleSelectProfile} onSelectPost={handleSelectPost} /> : <HomeView {...homeViewProps} />;
            case AppTab.Dashboard:
                return user?.role === UserRole.Candidate ? <CandidateDashboardView user={user} language={language} onSelectProfile={handleSelectProfile} onSelectPost={handleSelectPost} /> : <HomeView {...homeViewProps} />;
            case AppTab.InvitationConsole:
                return <InvitationConsole />;
            default:
                return <HomeView {...homeViewProps} />;
        }
    }
    
    return (
        <div className={`min-h-screen font-sans ${isHighContrast ? 'high-contrast' : ''}`}>
            <Header 
                user={user} 
                onCompose={() => user ? setComposeModalOpen(true) : setLoginModalOpen(true)}
                onRequestLogin={() => setLoginModalOpen(true)}
                onNavigate={handleNavigate}
                homeViewMode={homeViewMode}
                onModeChange={setHomeViewMode}
                onQrScan={() => setQrScannerOpen(true)}
            />
            <Sidebar user={user} activeTab={activeTab} onNavigate={handleNavigate} />
            
            <main className="lg:pl-64 pt-24 pb-16 lg:pb-0">
                 <div className="p-4 sm:px-6 flex justify-center">
                    <LanguageSwitcher
                        language={language}
                        onLanguageChange={setLanguage}
                    />
                </div>
                {homeViewMode === 'Social' ? (
                    renderSocialContent()
                ) : (
                    <div className="p-4 sm:p-6">
                        <div className="mt-4">
                            <ElectionHero />
                        </div>
                        <div className="mt-6">
                            <ElectionManagementView path={electionPath} onNavigate={setElectionPath} />
                        </div>
                    </div>
                )}
            </main>
            
            {activeTab !== AppTab.TeaHouse && (
                <BottomBar user={user} activeTab={activeTab} onNavigate={handleNavigate} language={language} />
            )}

            {isLoginModalOpen && <LoginModal onLogin={handleLogin} onClose={() => setLoginModalOpen(false)} language={language} onLanguageChange={setLanguage} />}
            {/* Fix: Passed language prop to ComposeModal to be used by ComposeView. */}
            {isComposeModalOpen && user && <ComposeModal user={user} onClose={() => setComposeModalOpen(false)} language={language} />}
            {isQrScannerOpen && <QRScannerModal onClose={() => setQrScannerOpen(false)} onScanSuccess={handleQrScanSuccess} />}
            {selectedPostForDetail && <PostDetailModal post={selectedPostForDetail} user={user} onClose={handleClosePostDetail} requestLogin={() => setLoginModalOpen(true)} language={language} />}
        </div>
    );
};

export default App;

'use client'

import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Bookmark,
  BookOpen,
  Brain,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  Clock3,
  Download,
  Eye,
  FileText,
  Globe,
  Headphones,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Users,
  Wind,
  X,
} from 'lucide-react'
import { type Lang, translations } from '@/lib/i18n'
import {
  adminActivities,
  adminDepartments,
  adminReportsList,
  getModuleAcademicSource,
  getModuleLessonsExpanded,
  initialModules,
  initialNotifications,
  initialSchedule,
  type ModuleItem,
  type NotificationItem,
  psychometricItems,
  type PsychometricItem,
  type ResourceItem,
  resourceLibraryData,
  type ScheduleSession,
} from '@/lib/platform-data'

type Role = 'collaborator' | 'admin'
type View = 'overview' | 'assessment' | 'learning' | 'progress' | 'reports' | 'resources' | 'settings'
type Theme = 'light' | 'dark'

const activityDataByRange = {
  days7: {
    bars: [61, 74, 70, 83, 78, 91, 96],
    total: { en: '2h 15m', fr: '2h 15m', ar: 'ساعتان و15 د' },
  },
  days30: {
    bars: [52, 68, 75, 80, 85, 79, 92],
    total: { en: '9h 40m', fr: '9h 40m', ar: '9 ساعات و40 د' },
  },
  quarter: {
    bars: [44, 58, 66, 72, 81, 88, 95],
    total: { en: '26h 10m', fr: '26h 10m', ar: '26 ساعة و10 د' },
  },
}

const progressChartByPeriod = {
  month: {
    score: 72,
    delta: '+6',
    points: [58, 61, 64, 67, 70, 72],
    path: 'M0 130 C95 122, 160 112, 250 105 S420 82, 540 60 S650 48, 700 34',
  },
  months3: {
    score: 72,
    delta: '+14',
    points: [54, 58, 62, 65, 69, 72],
    path: 'M0 145 C85 138, 150 125, 240 118 S400 92, 520 68 S640 50, 700 34',
  },
  months6: {
    score: 72,
    delta: '+24',
    points: [48, 53, 57, 63, 68, 72],
    path: 'M0 155 C75 147, 90 130, 150 138 S240 128, 300 112 S385 118, 450 90 S535 85, 600 62 S660 58, 700 34',
  },
  year: {
    score: 72,
    delta: '+31',
    points: [41, 48, 54, 60, 67, 72],
    path: 'M0 172 C80 165, 140 152, 220 140 S360 115, 470 88 S590 60, 700 34',
  },
}

const adminStatsByQuarter = {
  q4: {
    participants: '66',
    partTrend: '100%',
    completion: '82%',
    compTrend: '+12%',
    progression: '+18%',
    progTrend: '+6%',
    activeWeek: '48',
    activeTrend: '73%',
    curve: 'M0 175 C90 165, 125 155, 180 160 S275 140, 340 130 S430 122, 500 95 S600 80, 700 58',
  },
  q3: {
    participants: '66',
    partTrend: 'J0',
    completion: '70%',
    compTrend: '+8%',
    progression: '+12%',
    progTrend: '+4%',
    activeWeek: '43',
    activeTrend: '65%',
    curve: 'M0 182 C90 175, 130 168, 190 164 S280 152, 350 142 S440 130, 520 112 S610 96, 700 82',
  },
  year: {
    participants: '66',
    partTrend: 'MIC',
    completion: '82%',
    compTrend: '+24%',
    progression: '+18%',
    progTrend: '+18%',
    activeWeek: '52',
    activeTrend: '79%',
    curve: 'M0 190 C90 180, 140 168, 210 155 S310 135, 390 118 S480 98, 570 76 S645 64, 700 50',
  },
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('fr')
  const [theme, setTheme] = useState<Theme>('light')
  const [role, setRole] = useState<Role>('collaborator')
  const [view, setView] = useState<View>('overview')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Interactive states (using option indices so language switching preserves selections!)
  const [assessmentStep, setAssessmentStep] = useState<number>(0) // 0..3, 4 = completed
  const [assessmentMode, setAssessmentMode] = useState<'initial' | 'final'>('initial')
  const [psychometricScores, setPsychometricScores] = useState<Record<string, number>>({
    'q-i-1': 2,
    'q-i-2': 3,
    'q-i-3': 2,
    'q-ii-1': 3,
    'q-ii-2': 2,
    'q-ii-3': 3,
    'q-iii-1': 2,
    'q-iii-2': 3,
    'q-iii-3': 2,
    'q-iv-1': 3,
    'q-iv-2': 3,
    'q-iv-3': 2,
  })
  const [assessmentAnswers, setAssessmentAnswers] = useState<{
    q0: number[]
    q1: number
    q2: number[]
    q3: number
  }>({
    q0: [0, 2],
    q1: 2,
    q2: [0],
    q3: 1,
  })

  const [modules, setModules] = useState<ModuleItem[]>(initialModules)
  const [activeModuleModal, setActiveModuleModal] = useState<ModuleItem | null>(null)
  const [activeResourceModal, setActiveResourceModal] = useState<ResourceItem | null>(null)
  const [savedResources, setSavedResources] = useState<string[]>(['calmer-mind'])
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [scheduleItems, setScheduleItems] = useState<ScheduleSession[]>(initialSchedule)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [sessionLocked, setSessionLocked] = useState(false)
  const [focusBonus, setFocusBonus] = useState(0)
  const [selectedDomainIdx, setSelectedDomainIdx] = useState(0)
  const [reflectionModalOpen, setReflectionModalOpen] = useState(false)
  const [previewReport, setPreviewReport] = useState<(typeof adminReportsList)[0] | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const t = translations[lang]
  const isRtl = t.dir === 'rtl'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
  }, [lang, t.dir])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const closeAllMenus = () => {
    setWorkspaceMenuOpen(false)
    setUserMenuOpen(false)
    setNotifOpen(false)
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    window.clearTimeout((window as unknown as { __toastTimer?: number }).__toastTimer)
    ;(window as unknown as { __toastTimer?: number }).__toastTimer = window.setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    showToast(next === 'dark' ? t.theme.dark : t.theme.light)
  }

  const unreadCount = notifications.filter((n) => n.unread).length
  const completedModulesCount = modules.filter((m) => m.status === 'completed').length
  const completionPct = Math.round((completedModulesCount / 12) * 100)

  const handleToggleCompleteModule = (moduleId: number) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, status: m.status === 'completed' ? 'in_progress' : 'completed' }
          : m
      )
    )
    setActiveModuleModal((prev) =>
      prev && prev.id === moduleId
        ? { ...prev, status: prev.status === 'completed' ? 'in_progress' : 'completed' }
        : prev
    )
    showToast(t.learning.completedBadge)
  }

  const handleToggleBookmark = (resId: string) => {
    setSavedResources((prev) => {
      const exists = prev.includes(resId)
      const next = exists ? prev.filter((id) => id !== resId) : [...prev, resId]
      showToast(exists ? t.common.saved : t.resourcesView.bookmarked)
      return next
    })
  }

  const handleRescheduleSession = (sessionId: string) => {
    const slots = ['09:00 – 09:45', '11:00 – 11:45', '14:30 – 15:15', '16:00 – 16:45']
    setScheduleItems((prev) =>
      prev.map((item) => {
        if (item.id !== sessionId) return item
        const nextSlot = slots[(slots.indexOf(item.time) + 1) % slots.length]
        return { ...item, time: nextSlot }
      })
    )
    showToast(
      lang === 'ar'
        ? 'تم تحديث موعد الورشة بنجاح!'
        : lang === 'fr'
          ? 'Créneau de l’atelier mis à jour !'
          : 'Workshop time slot updated!'
    )
  }

  const handleDownloadReport = (filename: string, title: string) => {
    const content = [
      `NEUROMAROC | NEURO TALENT — MINISTÈRE DE L'INDUSTRIE ET DU COMMERCE (MIC)`,
      `Rapport Analytique Agrégé & Anonymisé (Conforme Loi n° 09-08)`,
      `Intitulé : ${title}`,
      `Date : ${new Date().toISOString().slice(0, 10)}`,
      `Périmètre : ${role === 'admin' ? 'Cohorte Pilote #1 (66 Utilisateurs Autorisés)' : 'Synthèse Individuelle'}`,
      `----------------------------------------`,
      `Utilisateurs autorisés (Groupe Pilote) : 66`,
      `Taux de réalisation de l'évaluation initiale : 82% (54/66)`,
      `Progression collective moyenne : +18% sur les 4 domaines`,
      `Taux de participation hebdomadaire : 73% (48/66)`,
      ``,
      `Synthèse par domaine cognitif et comportemental :`,
      `- ${t.domains.focus}: 86% (+6% vs profil initial)`,
      `- ${t.domains.emotional}: 72% (+5% vs profil initial)`,
      `- ${t.domains.decision}: 90% (+6% vs profil initial)`,
      `- ${t.domains.collaboration}: 79% (+5% vs profil initial)`,
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    showToast(`${t.admin.downloadBtn}: ${filename}`)
  }

  const nav =
    role === 'collaborator'
      ? [
          { id: 'overview' as View, label: t.sidebar.nav.overview, icon: LayoutDashboard },
          { id: 'assessment' as View, label: t.sidebar.nav.assessment, icon: ClipboardCheck },
          { id: 'learning' as View, label: t.sidebar.nav.learning, icon: BookOpen },
          { id: 'progress' as View, label: t.sidebar.nav.progress, icon: TrendingUp },
        ]
      : [
          { id: 'overview' as View, label: t.sidebar.nav.overview, icon: LayoutDashboard },
          { id: 'progress' as View, label: t.sidebar.nav.pilotProgress, icon: BarChart3 },
          { id: 'reports' as View, label: t.sidebar.nav.reports, icon: FileText },
        ]

  if (sessionLocked) {
    return (
      <div className={`lock-screen ${theme === 'dark' ? 'dark' : ''}`} dir={t.dir}>
        <div className="card lock-card view-enter">
          <img className="brand-logo" src="./logosmall.png" alt="NEUROMAROC" />
          <h2>NEURO TALENT · NEUROMAROC</h2>
          <p className="subtitle">
            {lang === 'ar'
              ? 'الجلسة مقفلة لحماية سرية معطياتك (القانون 08-09). اختر الفضاء للمتابعة:'
              : lang === 'fr'
                ? 'Session verrouillée conformément à la Loi n° 09-08. Sélectionnez un espace pour reprendre :'
                : 'Session locked under Law 09-08 data protection. Choose a workspace to resume:'}
          </p>
          <div className="lock-actions">
            <button
              type="button"
              className="primary-button wide"
              onClick={() => {
                setRole('collaborator')
                setView('overview')
                setSessionLocked(false)
              }}
            >
              {t.sidebar.sarahName} ({t.sidebar.sarahRole})
            </button>
            <button
              type="button"
              className="outline-button wide"
              onClick={() => {
                setRole('admin')
                setView('overview')
                setSessionLocked(false)
              }}
            >
              {t.sidebar.adminName} ({t.sidebar.adminRole})
            </button>
          </div>
          <div className="lock-langs">
            {(['fr', 'ar', 'en'] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                className={`lang-pill ${lang === l ? 'active' : ''}`}
                onClick={() => setLang(l)}
              >
                {translations[l].langName}
              </button>
            ))}
            <button type="button" className="lang-pill" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`app-shell ${isRtl ? 'is-rtl' : ''} ${theme === 'dark' ? 'dark' : ''}`}
      dir={t.dir}
      onClick={closeAllMenus}
    >
      <aside className={`sidebar ${mobileOpen ? 'is-open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="brand">
          <img
            className="brand-logo"
            src="./logosmall.png"
            alt="International Neurofeedback Center"
            onClick={() => {
              setView('overview')
              closeAllMenus()
            }}
            style={{ cursor: 'pointer' }}
          />
          <div
            className="brand-wordmark"
            onClick={() => {
              setView('overview')
              closeAllMenus()
            }}
            style={{ cursor: 'pointer' }}
          >
            <strong>NEURO TALENT</strong>
            <span>NEUROMAROC</span>
          </div>
          <button
            type="button"
            className="close-mobile"
            onClick={() => setMobileOpen(false)}
            aria-label={t.common.close}
          >
            <X size={18} />
          </button>
        </div>

        {/* Clickable Workspace Switcher */}
        <div className="dropdown-anchor">
          <button
            type="button"
            className="workspace-switcher"
            onClick={() => {
              setWorkspaceMenuOpen((o) => !o)
              setUserMenuOpen(false)
              setNotifOpen(false)
            }}
            aria-expanded={workspaceMenuOpen}
          >
            <div className="workspace-avatar">MIC</div>
            <div>
              <span>{t.sidebar.workspace}</span>
              <strong>
                {role === 'collaborator' ? t.sidebar.pilotProgramme : t.sidebar.ministryWorkspace}
              </strong>
            </div>
            <ChevronDown size={15} />
          </button>
          {workspaceMenuOpen && (
            <div className="FloatingMenu view-enter">
              <button
                type="button"
                className={`menu-option ${role === 'collaborator' ? 'selected' : ''}`}
                onClick={() => {
                  setRole('collaborator')
                  setView('overview')
                  setWorkspaceMenuOpen(false)
                }}
              >
                <div className="workspace-avatar">SA</div>
                <div>
                  <strong>{t.sidebar.pilotProgramme}</strong>
                  <span>{t.sidebar.collaboratorWorkspace}</span>
                </div>
                {role === 'collaborator' && <Check size={14} />}
              </button>
              <button
                type="button"
                className={`menu-option ${role === 'admin' ? 'selected' : ''}`}
                onClick={() => {
                  setRole('admin')
                  setView('overview')
                  setWorkspaceMenuOpen(false)
                }}
              >
                <div className="workspace-avatar">MIC</div>
                <div>
                  <strong>{t.sidebar.ministryWorkspace}</strong>
                  <span>{t.sidebar.adminRole}</span>
                </div>
                {role === 'admin' && <Check size={14} />}
              </button>
            </div>
          )}
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <p className="nav-label">{t.sidebar.workspace}</p>
          {nav.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${view === item.id ? 'active' : ''}`}
                onClick={() => {
                  setView(item.id)
                  setMobileOpen(false)
                  closeAllMenus()
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.id === 'assessment' && (
                  <span className={`nav-badge ${assessmentStep >= 4 ? 'done' : ''}`}>
                    {assessmentStep >= 4 ? '✓' : '1'}
                  </span>
                )}
              </button>
            )
          })}
          <p className="nav-label nav-label-spaced">{t.sidebar.resources}</p>
          <button
            type="button"
            className={`nav-item ${view === 'resources' ? 'active' : ''}`}
            onClick={() => {
              setView('resources')
              setMobileOpen(false)
              closeAllMenus()
            }}
          >
            <Headphones size={18} />
            <span>{t.sidebar.resourceLibrary}</span>
          </button>
          <button
            type="button"
            className={`nav-item ${view === 'settings' ? 'active' : ''}`}
            onClick={() => {
              setView('settings')
              setMobileOpen(false)
              closeAllMenus()
            }}
          >
            <Settings size={18} />
            <span>{t.sidebar.settings}</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            className="privacy-note privacy-btn"
            onClick={() => {
              setView('settings')
              setMobileOpen(false)
              closeAllMenus()
            }}
          >
            <ShieldCheck size={16} />
            <span>
              {t.sidebar.privacyLine1}
              <br />
              <b>{t.sidebar.privacyLine2}</b>
            </span>
          </button>
          <div className="dropdown-anchor">
            <button
              type="button"
              className="user-switch"
              onClick={() => {
                setUserMenuOpen((o) => !o)
                setWorkspaceMenuOpen(false)
                setNotifOpen(false)
              }}
              title={t.sidebar.switchRoleHint}
            >
              <div className="avatar">{role === 'collaborator' ? 'SA' : 'MIC'}</div>
              <div>
                <strong>{role === 'collaborator' ? t.sidebar.sarahName : t.sidebar.adminName}</strong>
                <span>{role === 'collaborator' ? t.sidebar.sarahRole : t.sidebar.adminRole}</span>
              </div>
              <MoreHorizontal size={16} />
            </button>
            {userMenuOpen && (
              <div className="FloatingMenu user-menu-popup view-enter">
                <button
                  type="button"
                  className="menu-option"
                  onClick={() => {
                    const nextRole = role === 'collaborator' ? 'admin' : 'collaborator'
                    setRole(nextRole)
                    setView('overview')
                    setUserMenuOpen(false)
                  }}
                >
                  <Users size={15} />
                  <span>
                    {role === 'collaborator' ? t.sidebar.switchToAdmin : t.sidebar.switchToCollab}
                  </span>
                </button>
                <button
                  type="button"
                  className="menu-option"
                  onClick={() => {
                    setView('settings')
                    setUserMenuOpen(false)
                  }}
                >
                  <Settings size={15} />
                  <span>{t.sidebar.settings}</span>
                </button>
                <button
                  type="button"
                  className="menu-option danger"
                  onClick={() => {
                    setUserMenuOpen(false)
                    setSessionLocked(true)
                  }}
                >
                  <LogOut size={15} />
                  <span>{t.sidebar.signOut}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="scrim"
          onClick={() => setMobileOpen(false)}
          aria-label={t.common.close}
        />
      )}

      <main className="main-content">
        <header className="topbar" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          <div className="breadcrumbs">
            <button
              type="button"
              className="breadcrumb-link"
              onClick={() => {
                setView('overview')
                closeAllMenus()
              }}
            >
              NEURO TALENT
            </button>
            <ChevronRight size={14} className="rtl-flip" />
            <button
              type="button"
              className="breadcrumb-link active-crumb"
              onClick={() => {
                setView('overview')
                closeAllMenus()
              }}
            >
              <b>
                {role === 'collaborator'
                  ? t.sidebar.collaboratorWorkspace
                  : t.sidebar.ministryWorkspace}
              </b>
            </button>
            <button
              type="button"
              className="cohort-pill cohort-pill-btn"
              onClick={() => {
                setRole('admin')
                setView('progress')
                closeAllMenus()
                showToast(t.admin.pilotProgressTitle)
              }}
              title={t.admin.pilotProgressTitle}
            >
              MIC · 66
            </button>
          </div>

          <div className="top-actions">
            {/* Language Switcher: FR / AR / EN */}
            <div className="lang-switcher" role="group" aria-label={t.topbar.language}>
              <Globe size={14} className="lang-icon" />
              {(['fr', 'ar', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  className={`lang-btn ${lang === l ? 'active' : ''}`}
                  onClick={() => setLang(l)}
                  title={translations[l].langName}
                >
                  {translations[l].langShort}
                </button>
              ))}
            </div>

            {/* Light / Dark Theme Toggle */}
            <button
              type="button"
              className="icon-button theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={t.theme.toggle}
              title={theme === 'light' ? t.theme.dark : t.theme.light}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            {/* Search Button */}
            <button
              type="button"
              className="icon-button"
              aria-label="Search"
              onClick={() => {
                closeAllMenus()
                setSearchOpen(true)
              }}
            >
              <Search size={18} />
            </button>

            {/* Notifications Button & Popover */}
            <div className="dropdown-anchor">
              <button
                type="button"
                className="icon-button notification"
                aria-label={t.topbar.notifications}
                onClick={() => {
                  setNotifOpen((o) => !o)
                  setWorkspaceMenuOpen(false)
                  setUserMenuOpen(false)
                }}
              >
                <Bell size={18} />
                {unreadCount > 0 && <i />}
              </button>
              {notifOpen && (
                <div className="FloatingMenu notif-popover view-enter">
                  <div className="popover-head">
                    <strong>
                      {t.topbar.notifications} ({unreadCount})
                    </strong>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        className="text-link-xs"
                        onClick={() =>
                          setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
                        }
                      >
                        {t.topbar.markAllRead}
                      </button>
                    )}
                  </div>
                  <div className="notif-list">
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        className={`notif-item ${n.unread ? 'unread' : ''}`}
                        onClick={() => {
                          setNotifications((prev) =>
                            prev.map((item) =>
                              item.id === n.id ? { ...item, unread: false } : item
                            )
                          )
                          setView(n.targetView)
                          setNotifOpen(false)
                        }}
                      >
                        <div className="notif-title-row">
                          <strong>{n.title[lang]}</strong>
                          <small>{n.time[lang]}</small>
                        </div>
                        <p>{n.body[lang]}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Top Avatar Button */}
            <button
              type="button"
              className="top-avatar"
              onClick={() => {
                const nextRole = role === 'collaborator' ? 'admin' : 'collaborator'
                setRole(nextRole)
                setView('overview')
                closeAllMenus()
                showToast(
                  nextRole === 'admin'
                    ? `${t.sidebar.ministryWorkspace}`
                    : `${t.sidebar.collaboratorWorkspace}`
                )
              }}
              title={t.sidebar.switchRoleHint}
            >
              {role === 'collaborator' ? 'SA' : 'MIC'}
            </button>
          </div>
        </header>

        <div className="content-wrap">
          <div key={`${role}-${view}-${lang}`} className="view-enter">
            {view === 'resources' ? (
              <ResourceLibraryView
                lang={lang}
                savedResources={savedResources}
                onToggleBookmark={handleToggleBookmark}
                onOpenResource={(res) => setActiveResourceModal(res)}
              />
            ) : view === 'settings' ? (
              <SettingsView
                lang={lang}
                setLang={setLang}
                theme={theme}
                setTheme={setTheme}
                role={role}
                setRole={(r) => {
                  setRole(r)
                  setView('overview')
                }}
                onSave={() => showToast(t.settingsView.savedToast)}
                onExportData={() =>
                  handleDownloadReport('neuromaroc-personal-data-loi-09-08.json', 'Export Loi 09-08')
                }
              />
            ) : role === 'collaborator' ? (
              <CollaboratorView
                lang={lang}
                view={view}
                setView={setView}
                assessmentStep={assessmentStep}
                setAssessmentStep={setAssessmentStep}
                assessmentMode={assessmentMode}
                setAssessmentMode={setAssessmentMode}
                assessmentAnswers={assessmentAnswers}
                setAssessmentAnswers={setAssessmentAnswers}
                psychometricScores={psychometricScores}
                setPsychometricScores={setPsychometricScores}
                modules={modules}
                completedModulesCount={completedModulesCount}
                completionPct={completionPct}
                focusBonus={focusBonus}
                selectedDomainIdx={selectedDomainIdx}
                setSelectedDomainIdx={setSelectedDomainIdx}
                onOpenReflectionModal={() => setReflectionModalOpen(true)}
                onOpenSchedule={() => setScheduleOpen(true)}
                onOpenModule={(m) => setActiveModuleModal(m)}
                onOpenResource={(r) => setActiveResourceModal(r)}
                onDownloadSynthesis={() =>
                  handleDownloadReport(
                    'Synthese-Individuelle-Progression-MIC.txt',
                    t.assessment.synthesisTitle
                  )
                }
                onShowToast={showToast}
              />
            ) : (
              <AdminView
                lang={lang}
                view={view}
                setView={setView}
                onPreviewReport={(rep) => setPreviewReport(rep)}
                onDownloadReport={handleDownloadReport}
                onShowToast={showToast}
              />
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (Thumb-friendly native app feel on phones) */}
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={`mob-${item.id}`}
              type="button"
              className={`mobile-tab-btn ${view === item.id ? 'active' : ''}`}
              onClick={() => {
                setView(item.id)
                setMobileOpen(false)
                closeAllMenus()
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          )
        })}
        <button
          type="button"
          className={`mobile-tab-btn ${view === 'resources' ? 'active' : ''}`}
          onClick={() => {
            setView('resources')
            setMobileOpen(false)
            closeAllMenus()
          }}
        >
          <Headphones size={18} />
          <span>{t.sidebar.resourceLibrary}</span>
        </button>
        <button
          type="button"
          className={`mobile-tab-btn ${view === 'settings' ? 'active' : ''}`}
          onClick={() => {
            setView('settings')
            setMobileOpen(false)
            closeAllMenus()
          }}
        >
          <Settings size={18} />
          <span>{t.sidebar.settings}</span>
        </button>
      </nav>

      {/* Module Player & Coherence Breathing Modal */}
      {activeModuleModal && (
        <ModulePlayerModal
          lang={lang}
          module={activeModuleModal}
          allModules={modules}
          onSelectModule={(m) => setActiveModuleModal(m)}
          onClose={() => setActiveModuleModal(null)}
          onToggleComplete={() => handleToggleCompleteModule(activeModuleModal.id)}
        />
      )}

      {/* Resource Viewer Modal */}
      {activeResourceModal && (
        <ResourcePlayerModal
          lang={lang}
          resource={activeResourceModal}
          isSaved={savedResources.includes(activeResourceModal.id)}
          onToggleBookmark={() => handleToggleBookmark(activeResourceModal.id)}
          onDownloadGuide={() =>
            handleDownloadReport(`${activeResourceModal.id}-fiche-MIC.txt`, activeResourceModal.title[lang])
          }
          onClose={() => setActiveResourceModal(null)}
        />
      )}

      {/* Schedule Modal */}
      {scheduleOpen && (
        <ScheduleModal
          lang={lang}
          sessions={scheduleItems}
          onAddSession={(newSession) => {
            setScheduleItems((prev) => [newSession, ...prev])
            showToast(t.schedule.bookedToast)
          }}
          onRescheduleSession={handleRescheduleSession}
          onLaunchSession={(sessionTitle) => {
            setScheduleOpen(false)
            setActiveModuleModal(modules[3])
            showToast(sessionTitle)
          }}
          onClose={() => setScheduleOpen(false)}
        />
      )}

      {/* Daily Cognitive Reflection Modal */}
      {reflectionModalOpen && (
        <ReflectionModal
          lang={lang}
          onClose={() => setReflectionModalOpen(false)}
          onSubmitReflection={(note) => {
            setFocusBonus((b) => b + 2)
            setReflectionModalOpen(false)
            showToast(note ? `${t.progress.reflectionSaved}` : t.progress.reflectionSaved)
          }}
        />
      )}

      {/* Admin Report Preview Modal */}
      {previewReport && (
        <ReportPreviewModal
          lang={lang}
          report={previewReport}
          onDownload={() => handleDownloadReport(`${previewReport.code}.txt`, previewReport.title[lang])}
          onClose={() => setPreviewReport(null)}
        />
      )}

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="modal-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="card modal-card search-modal view-enter" onClick={(e) => e.stopPropagation()}>
            <div className="search-input-row">
              <Search size={18} />
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.topbar.searchPlaceholder}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="text-link-xs"
                  onClick={() => setSearchQuery('')}
                >
                  ×
                </button>
              )}
              <button
                type="button"
                className="icon-button"
                onClick={() => setSearchOpen(false)}
                aria-label={t.common.close}
              >
                <X size={18} />
              </button>
            </div>
            <div className="search-results">
              {modules
                .filter((m) =>
                  m.title[lang].toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((m) => (
                  <button
                    key={`mod-${m.id}`}
                    type="button"
                    className="search-result-item"
                    onClick={() => {
                      setSearchOpen(false)
                      setActiveModuleModal(m)
                    }}
                  >
                    <Brain size={16} />
                    <div>
                      <strong>{m.title[lang]}</strong>
                      <small>{m.meta[lang]}</small>
                    </div>
                    <ArrowUpRight size={14} className="rtl-flip" />
                  </button>
                ))}
              {resourceLibraryData
                .filter((r) =>
                  r.title[lang].toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((r) => (
                  <button
                    key={`res-${r.id}`}
                    type="button"
                    className="search-result-item"
                    onClick={() => {
                      setSearchOpen(false)
                      setActiveResourceModal(r)
                    }}
                  >
                    <BookOpen size={16} />
                    <div>
                      <strong>{r.title[lang]}</strong>
                      <small>{r.duration[lang]}</small>
                    </div>
                    <ArrowUpRight size={14} className="rtl-flip" />
                  </button>
                ))}
              {adminReportsList
                .filter((rep) =>
                  rep.title[lang].toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((rep) => (
                  <button
                    key={`rep-${rep.id}`}
                    type="button"
                    className="search-result-item"
                    onClick={() => {
                      setSearchOpen(false)
                      setPreviewReport(rep)
                    }}
                  >
                    <FileText size={16} />
                    <div>
                      <strong>{rep.title[lang]}</strong>
                      <small>{rep.code} · {rep.date}</small>
                    </div>
                    <ArrowUpRight size={14} className="rtl-flip" />
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="toast-banner view-enter" role="status" aria-live="polite">
          <Check size={15} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

function CollaboratorView({
  lang,
  view,
  setView,
  assessmentStep,
  setAssessmentStep,
  assessmentMode,
  setAssessmentMode,
  assessmentAnswers,
  setAssessmentAnswers,
  psychometricScores,
  setPsychometricScores,
  modules,
  completedModulesCount,
  completionPct,
  focusBonus,
  selectedDomainIdx,
  setSelectedDomainIdx,
  onOpenReflectionModal,
  onOpenSchedule,
  onOpenModule,
  onOpenResource,
  onDownloadSynthesis,
  onShowToast,
}: {
  lang: Lang
  view: View
  setView: (v: View) => void
  assessmentStep: number
  setAssessmentStep: (s: number) => void
  assessmentMode: 'initial' | 'final'
  setAssessmentMode: (m: 'initial' | 'final') => void
  assessmentAnswers: { q0: number[]; q1: number; q2: number[]; q3: number }
  setAssessmentAnswers: React.Dispatch<
    React.SetStateAction<{ q0: number[]; q1: number; q2: number[]; q3: number }>
  >
  psychometricScores: Record<string, number>
  setPsychometricScores: React.Dispatch<React.SetStateAction<Record<string, number>>>
  modules: ModuleItem[]
  completedModulesCount: number
  completionPct: number
  focusBonus: number
  selectedDomainIdx: number
  setSelectedDomainIdx: (idx: number) => void
  onOpenReflectionModal: () => void
  onOpenSchedule: () => void
  onOpenModule: (m: ModuleItem) => void
  onOpenResource: (r: ResourceItem) => void
  onDownloadSynthesis: () => void
  onShowToast: (msg: string) => void
}) {
  const t = translations[lang]
  const [activityRange, setActivityRange] = useState<'days7' | 'days30' | 'quarter'>('days7')
  const [selectedBarIdx, setSelectedBarIdx] = useState<number | null>(null)

  // Scores réels calculés via la formule normalisée de NotebookLM : Sp = ((Sum - 3) / 12) * 100
  const sumP1 =
    (psychometricScores['q-i-1'] || 2) +
    (psychometricScores['q-i-2'] || 3) +
    (psychometricScores['q-i-3'] || 2)
  const sP1 = Math.round(((sumP1 - 3) / 12) * 100)

  const sumP2 =
    (psychometricScores['q-ii-1'] || 3) +
    (psychometricScores['q-ii-2'] || 2) +
    (psychometricScores['q-ii-3'] || 3)
  const sP2 = Math.round(((sumP2 - 3) / 12) * 100)

  const sumP3 =
    (psychometricScores['q-iii-1'] || 2) +
    (psychometricScores['q-iii-2'] || 3) +
    (psychometricScores['q-iii-3'] || 2)
  const sP3 = Math.round(((sumP3 - 3) / 12) * 100)

  const sumP4 =
    (psychometricScores['q-iv-1'] || 3) +
    (psychometricScores['q-iv-2'] || 3) +
    (psychometricScores['q-iv-3'] || 2)
  const sP4 = Math.round(((sumP4 - 3) / 12) * 100)

  const domainScores = [
    {
      label: t.domains.focus,
      initial: 42,
      value: Math.min(100, sP1 + focusBonus),
      color: '#2b7288',
      moduleIdx: 0,
    },
    {
      label: t.domains.emotional,
      initial: 48,
      value: sP2,
      color: '#d49a60',
      moduleIdx: 3,
    },
    {
      label: t.domains.decision,
      initial: 41,
      value: sP3,
      color: '#43658b',
      moduleIdx: 6,
    },
    {
      label: t.domains.collaboration,
      initial: 47,
      value: sP4,
      color: '#829e75',
      moduleIdx: 9,
    },
  ]

  if (view === 'assessment') {
    return (
      <Assessment
        lang={lang}
        step={assessmentStep}
        setStep={setAssessmentStep}
        mode={assessmentMode}
        setMode={setAssessmentMode}
        scores={psychometricScores}
        setScores={setPsychometricScores}
        domains={domainScores}
        allModules={modules}
        onGoToLearning={() => setView('learning')}
        onGoToSettings={() => setView('settings')}
        onOpenModule={(m) => onOpenModule(m)}
        onDownloadSynthesis={onDownloadSynthesis}
      />
    )
  }

  if (view === 'learning') {
    return (
      <Learning
        lang={lang}
        modules={modules}
        onOpenModule={onOpenModule}
        onFindResource={() => setView('resources')}
      />
    )
  }

  if (view === 'progress') {
    return (
      <Progress
        lang={lang}
        focusBonus={focusBonus}
        domains={domainScores}
        selectedDomain={selectedDomainIdx}
        setSelectedDomain={setSelectedDomainIdx}
        onAddReflection={onOpenReflectionModal}
        onOpenModule={(idx) => onOpenModule(modules[idx] || modules[0])}
      />
    )
  }

  const currentActivity = activityDataByRange[activityRange]
  const nextActivityRange = () => {
    const order: ('days7' | 'days30' | 'quarter')[] = ['days7', 'days30', 'quarter']
    const next = order[(order.indexOf(activityRange) + 1) % order.length]
    setActivityRange(next)
    setSelectedBarIdx(null)
  }

  const nextModule = modules.find((m) => m.status !== 'completed') || modules[3]

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{t.overview.dateEyebrow}</p>
          <h1>
            {t.overview.greeting} <span className="pulse-star">✦</span>
          </h1>
          <p className="subtitle">{t.overview.subtitle}</p>
        </div>
        <button type="button" className="outline-button" onClick={onOpenSchedule}>
          <Clock3 size={16} /> {t.overview.mySchedule}
        </button>
      </div>

      {assessmentStep < 4 ? (
        <section className="welcome-banner">
          <div className="banner-orb float-slow">
            <Sparkles size={25} />
          </div>
          <div>
            <p className="eyebrow warm">{t.overview.nextStepEyebrow}</p>
            <h2>{t.overview.completeAssessmentTitle}</h2>
            <p>{t.overview.completeAssessmentDesc}</p>
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              setAssessmentMode('initial')
              setView('assessment')
            }}
          >
            {t.overview.startAssessment} <ArrowUpRight size={16} className="rtl-flip" />
          </button>
        </section>
      ) : (
        <section className="welcome-banner calibrated">
          <div className="banner-orb float-slow">
            <Check size={24} />
          </div>
          <div>
            <p className="eyebrow warm">{t.overview.assessmentDoneEyebrow}</p>
            <h2>{t.overview.assessmentDoneTitle}</h2>
            <p>{t.overview.assessmentDoneDesc}</p>
          </div>
          <button
            type="button"
            className="outline-button"
            onClick={() => {
              setAssessmentMode('final')
              setView('assessment')
            }}
          >
            {t.overview.reviewAssessment} <ArrowUpRight size={16} className="rtl-flip" />
          </button>
        </section>
      )}

      <section className="metrics-grid">
        <Metric
          icon={Target}
          label={t.overview.metrics.pathCompletion}
          value={`${completionPct}%`}
          trend="+8%"
          sub={t.overview.metrics.sinceLastMonth}
          color="blue"
          onClick={() => setView('learning')}
        />
        <Metric
          icon={Clock3}
          label={t.overview.metrics.timeInvested}
          value="4h 35m"
          trend="+42m"
          sub={t.overview.metrics.thisMonth}
          color="gold"
          onClick={() => setView('learning')}
        />
        <Metric
          icon={TrendingUp}
          label={t.overview.metrics.currentStreak}
          value={`6 ${t.overview.metrics.days}`}
          trend="+2"
          sub={t.overview.metrics.personalBest}
          color="green"
          onClick={() => setView('progress')}
        />
        <Metric
          icon={Brain}
          label={t.overview.metrics.focusScore}
          value={`${72 + focusBonus}/100`}
          trend={`+${6 + focusBonus} pts`}
          sub={t.overview.metrics.fromBaseline}
          color="purple"
          onClick={() => setView('progress')}
        />
      </section>

      <div className="dashboard-grid">
        <section className="card journey-card">
          <CardHeader
            title={t.overview.journeyTitle}
            action={t.overview.viewFullPath}
            onAction={() => setView('learning')}
          />
          <div className="journey-progress">
            <button
              type="button"
              className="progress-ring progress-ring-btn"
              onClick={() => setView('learning')}
              style={{
                background: `conic-gradient(var(--teal) ${completionPct}%, var(--track-bg) 0)`,
              }}
              title={t.overview.viewFullPath}
            >
              <div>
                <strong>{completionPct}%</strong>
                <span>{t.overview.complete}</span>
              </div>
            </button>
            <div className="journey-copy">
              <h3>{t.overview.buildingFoundation}</h3>
              <p>{t.overview.journeyDesc}</p>
              <div className="mini-progress">
                <span style={{ width: `${completionPct}%` }} />
              </div>
              <small>
                {completedModulesCount} {t.overview.modulesCompleted}
              </small>
            </div>
          </div>
          <button
            type="button"
            className="next-module next-module-btn"
            onClick={() => onOpenModule(nextModule)}
          >
            <div className="module-icon">
              <Play size={16} fill="currentColor" />
            </div>
            <div>
              <small>{t.overview.nextModuleMeta}</small>
              <strong>{nextModule.title[lang]}</strong>
            </div>
            <ChevronRight size={18} className="rtl-flip" />
          </button>
        </section>

        <section className="card activity-card">
          <CardHeader
            title={t.overview.weeklyActivity}
            action={t.overview.timeframes[activityRange]}
            onAction={nextActivityRange}
          />
          <div className="activity-chart">
            <img className="chart-watermark" src="./logosmall.png" alt="" aria-hidden="true" />
            <div className="chart-y">
              <span>60m</span>
              <span>40m</span>
              <span>20m</span>
              <span>0</span>
            </div>
            <div className="bars">
              {currentActivity.bars.map((h, i) => (
                <button
                  type="button"
                  className={`bar-wrap bar-btn ${selectedBarIdx === i ? 'bar-selected' : ''}`}
                  key={i}
                  onClick={() => {
                    setSelectedBarIdx(i)
                    onShowToast(`${t.overview.dayLabels[i]}: ${Math.round(h * 0.55)} min`)
                  }}
                  title={`${Math.round(h * 0.55)} min`}
                >
                  <div className="bar bar-animate" style={{ height: `${h * 0.72}%` }} />
                  <span>{t.overview.dayLabels[i]}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="chart-foot">
            <span>
              <i className="dot teal" /> {t.overview.learningTime}
            </span>
            <b>
              {selectedBarIdx !== null
                ? `${t.overview.dayLabels[selectedBarIdx]}: ${Math.round(currentActivity.bars[selectedBarIdx] * 0.55)} min`
                : currentActivity.total[lang]}{' '}
              <small>{t.overview.thisWeek}</small>
            </b>
          </div>
        </section>
      </div>

      <div className="lower-grid">
        <section className="card focus-card">
          <CardHeader
            title={t.overview.focusAreasTitle}
            action={t.overview.seeInsights}
            onAction={() => setView('progress')}
          />
          {domainScores.map((a, idx) => (
            <button
              type="button"
              className="focus-row focus-row-btn"
              key={a.label}
              onClick={() => {
                setSelectedDomainIdx(idx)
                setView('progress')
              }}
            >
              <div className="focus-label">
                <span className="focus-dot" style={{ background: a.color }} />
                {a.label}
              </div>
              <div className="focus-track">
                <span style={{ width: `${a.value}%`, background: a.color }} />
              </div>
              <b>{a.value}%</b>
            </button>
          ))}
        </section>

        <section
          className="card recommendation recommendation-clickable"
          onClick={() => onOpenResource(resourceLibraryData[0])}
        >
          <div className="recommendation-icon">
            <BookOpen size={19} />
          </div>
          <div>
            <p className="eyebrow">{t.overview.recommendedEyebrow}</p>
            <h3>{t.overview.recommendedTitle}</h3>
            <p>{t.overview.recommendedDesc}</p>
            <button
              type="button"
              className="text-button"
              onClick={(e) => {
                e.stopPropagation()
                onOpenResource(resourceLibraryData[0])
              }}
            >
              {t.overview.exploreResource} <ArrowUpRight size={15} className="rtl-flip" />
            </button>
          </div>
        </section>
      </div>
    </>
  )
}

function Assessment({
  lang,
  step,
  setStep,
  mode,
  setMode,
  scores,
  setScores,
  domains,
  allModules,
  onGoToLearning,
  onGoToSettings,
  onOpenModule,
  onDownloadSynthesis,
}: {
  lang: Lang
  step: number
  setStep: (s: number) => void
  mode: 'initial' | 'final'
  setMode: (m: 'initial' | 'final') => void
  scores: Record<string, number>
  setScores: React.Dispatch<React.SetStateAction<Record<string, number>>>
  domains: { label: string; initial: number; value: number; color: string; moduleIdx: number }[]
  allModules: ModuleItem[]
  onGoToLearning: () => void
  onGoToSettings: () => void
  onOpenModule: (m: ModuleItem) => void
  onDownloadSynthesis: () => void
}) {
  const t = translations[lang]

  const pillars = [
    {
      id: 'pillar1' as const,
      num: '01',
      title: {
        fr: 'Pilier I : Attention & Clarté Mentale',
        ar: 'المحور 1: الانتباه والصفاء الذهني',
        en: 'Pillar I: Attention & Mental Clarity',
      },
      sub: {
        fr: 'Évaluation du Deep Work, du résidu attentionnel et de la charge cognitive (Modules M1 à M3).',
        ar: 'تقييم العمل العميق، تصفية المشتتات والتحكم في سعة ذاكرة العمل (الوحدات 1 إلى 3).',
        en: 'Evaluation of Deep Work, attention residue, and working memory limits (Modules M1 to M3).',
      },
      color: '#2b7288',
      items: psychometricItems.filter((i) => i.pillarId === 'pillar1'),
    },
    {
      id: 'pillar2' as const,
      num: '02',
      title: {
        fr: 'Pilier II : Régulation Émotionnelle & Stress',
        ar: 'المحور 2: التنظيم الانفعالي وإدارة الضغوط',
        en: 'Pillar II: Emotional Regulation & Stress',
      },
      sub: {
        fr: 'Évaluation de la réévaluation cognitive, de la VFC et de la fatigue décisionnelle (Modules M4 à M6).',
        ar: 'تقييم إعادة التأطير المعرفي، التباين القلبي والوقاية من إجهاد القرار (الوحدات 4 إلى 6).',
        en: 'Evaluation of cognitive reappraisal, HRV vagal tone, and decision fatigue (Modules M4 to M6).',
      },
      color: '#d49a60',
      items: psychometricItems.filter((i) => i.pillarId === 'pillar2'),
    },
    {
      id: 'pillar3' as const,
      num: '03',
      title: {
        fr: 'Pilier III : Prise de Décision & Agilité',
        ar: 'المحور 3: اتخاذ القرارات والرشاقة الاستراتيجية',
        en: 'Pillar III: Decision-Making & Cognitive Agility',
      },
      sub: {
        fr: 'Évaluation du débiasing Système 1/2, du Pre-Mortem et des scénarios sous incertitude (Modules M7 à M9).',
        ar: 'تقييم مكافحة الانحيازات، التشريح الاستباقي وسيناريوهات عدم اليقين (الوحدات 7 إلى 9).',
        en: 'Evaluation of System 1/2 debiasing, Pre-Mortem, and probabilistic scenario analysis (Modules M7 to M9).',
      },
      color: '#43658b',
      items: psychometricItems.filter((i) => i.pillarId === 'pillar3'),
    },
    {
      id: 'pillar4' as const,
      num: '04',
      title: {
        fr: 'Pilier IV : Co-Régulation & Leadership',
        ar: 'المحور 4: التنظيم المشترك والذكاء الجماعي',
        en: 'Pillar IV: Co-Regulation & Collective Intelligence',
      },
      sub: {
        fr: 'Évaluation des neurones miroirs, de la sécurité psychologique et de la négociation d’intérêts (Modules M10 à M12).',
        ar: 'تقييم الخلايا المرآتية، الأمان النفسي والتفاوض القائم على المصالح (الوحدات 10 إلى 12).',
        en: 'Evaluation of mirror neurons, psychological safety, and interest-based negotiation (Modules M10 to M12).',
      },
      color: '#829e75',
      items: psychometricItems.filter((i) => i.pillarId === 'pillar4'),
    },
  ]

  const activePillarIdx = Math.min(step, 3)
  const currentPillar = pillars[activePillarIdx]

  // Normalisation Mathématique : Sp = ((Sum - 3) / 12) * 100
  const calcPillarScore = (pItems: typeof psychometricItems) => {
    const sum = pItems.reduce((acc, it) => acc + (scores[it.id] || 3), 0)
    return Math.round(((sum - 3) / 12) * 100)
  }

  const sP1 = calcPillarScore(pillars[0].items)
  const sP2 = calcPillarScore(pillars[1].items)
  const sP3 = calcPillarScore(pillars[2].items)
  const sP4 = calcPillarScore(pillars[3].items)
  const currentPillarScore = calcPillarScore(currentPillar.items)

  const globalScore = Math.round((sP1 + sP2 + sP3 + sP4) / 4)

  const getTier = (score: number) => {
    if (score < 50) return { label: t.assessment.tierLabels.tier1, badgeClass: 'tier-1', color: '#d97706' }
    if (score < 75) return { label: t.assessment.tierLabels.tier2, badgeClass: 'tier-2', color: '#2b7288' }
    return { label: t.assessment.tierLabels.tier3, badgeClass: 'tier-3', color: '#059669' }
  }

  const currentTier = getTier(globalScore)

  // Algorithme d'orientation automatique T0 avec bris d'égalité institutionnel
  const tieWeights: Record<number, number> = {
    1: 12, 4: 11, 7: 10, 2: 9, 5: 8, 8: 7, 3: 6, 6: 5, 9: 4, 10: 3, 11: 2, 12: 1,
  }

  const rankedItems = [...psychometricItems].sort((a, b) => {
    const scoreA = scores[a.id] || 3
    const scoreB = scores[b.id] || 3
    if (scoreA !== scoreB) {
      return scoreA - scoreB // plus faible d'abord
    }
    return (tieWeights[b.targetModuleId] || 0) - (tieWeights[a.targetModuleId] || 0)
  })

  const top3RecommendedModules = rankedItems.slice(0, 3).map((it) => {
    return allModules.find((m) => m.id === it.targetModuleId) || allModules[0]
  })

  // Données officielles de comparaison T0 vs T1 issues du rapport de cohorte
  const cohortSynthesisData = [
    { label: t.domains.focus, t0: 42.1, t1: 69.8, delta: '+27.7 pts', color: '#2b7288', moduleIdx: 0 },
    { label: t.domains.emotional, t0: 48.5, t1: 74.2, delta: '+25.7 pts', color: '#d49a60', moduleIdx: 3 },
    { label: t.domains.decision, t0: 41.2, t1: 61.5, delta: '+20.3 pts', color: '#43658b', moduleIdx: 6 },
    { label: t.domains.collaboration, t0: 46.8, t1: 78.4, delta: '+31.6 pts', color: '#829e75', moduleIdx: 9 },
  ]

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{t.assessment.eyebrow}</p>
          <h1>{t.assessment.title}</h1>
          <p className="subtitle">{t.assessment.subtitle}</p>
        </div>
        <div className="filter-pills">
          <button
            type="button"
            className={`filter-pill ${mode === 'initial' ? 'active' : ''}`}
            onClick={() => setMode('initial')}
          >
            {t.assessment.modeInitial}
          </button>
          <button
            type="button"
            className={`filter-pill ${mode === 'final' ? 'active' : ''}`}
            onClick={() => setMode('final')}
          >
            {t.assessment.modeFinal}
          </button>
        </div>
      </div>

      <section className="assessment-layout">
        <div className="card assessment-main">
          {mode === 'final' ? (
            <div className="synthesis-comparison view-enter">
              <div className="question-number">ARTICLE 2 · §1.4.b · BILAN D’IMPACT COHORTE (66 CADRES)</div>
              <h2>{t.assessment.synthesisTitle}</h2>
              <p className="question-help">{t.assessment.synthesisSub}</p>

              <div className="comparison-legend">
                <span>
                  <i className="dot gold" /> {t.assessment.initialLabel} (T0 Baseline)
                </span>
                <span>
                  <i className="dot teal" /> {t.assessment.currentLabel} (T1 Consolidé)
                </span>
              </div>

              <div className="comparison-bars-list">
                {cohortSynthesisData.map((d) => (
                  <button
                    key={d.label}
                    type="button"
                    className="comparison-domain-item comparison-domain-btn"
                    onClick={() => onOpenModule(allModules[d.moduleIdx] || allModules[0])}
                  >
                    <div className="comparison-domain-head">
                      <strong>{d.label}</strong>
                      <span className="up">
                        {d.t0}% → <b>{d.t1}%</b> ({d.delta})
                      </span>
                    </div>
                    <div className="dual-bar-track">
                      <div
                        className="initial-bar"
                        style={{ width: `${d.t0}%` }}
                        title={`${t.assessment.initialLabel}: ${d.t0}%`}
                      />
                      <div
                        className="current-bar"
                        style={{ width: `${d.t1}%`, background: d.color }}
                        title={`${t.assessment.currentLabel}: ${d.t1}%`}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Synthèse globale chiffrée */}
              <div className="report-preview-stats" style={{ marginTop: 24 }}>
                <div className="preview-stat-box">
                  <small>Score Global T0 (Baseline)</small>
                  <strong>44,65 / 100</strong>
                </div>
                <div className="preview-stat-box">
                  <small>Score Global T1 (Synthèse)</small>
                  <strong>70,98 / 100</strong>
                </div>
                <div className="preview-stat-box">
                  <small>Delta Progression Collective</small>
                  <strong style={{ color: 'var(--teal)' }}>+26,33 pts (+59 %)</strong>
                </div>
              </div>

              <div className="assessment-actions" style={{ marginTop: 26 }}>
                <button type="button" className="primary-button wide" onClick={onGoToLearning}>
                  {t.assessment.goToLearning} <ArrowUpRight size={16} className="rtl-flip" />
                </button>
                <button
                  type="button"
                  className="outline-button"
                  onClick={onDownloadSynthesis}
                >
                  <Download size={15} /> {t.admin.downloadBtn}
                </button>
                <button
                  type="button"
                  className="outline-button"
                  onClick={() => setMode('initial')}
                >
                  {t.assessment.modeInitial}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Indicateurs de progression sur les 4 Piliers Cognitifs */}
              <div className="step-pills-row">
                {pillars.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`step-pill-btn ${activePillarIdx === idx && step < 4 ? 'active' : ''} ${step > idx ? 'done' : ''}`}
                    onClick={() => setStep(idx)}
                    title={p.title[lang]}
                  >
                    {p.num} · {p.title[lang].split(':')[0]}
                  </button>
                ))}
              </div>

              <div className="assessment-progress">
                <span style={{ width: `${step >= 4 ? 100 : (activePillarIdx + 1) * 25}%` }} />
              </div>

              {step >= 4 ? (
                /* Écran des Résultats et Orientation Automatique */
                <div className="assessment-completed-box view-enter">
                  <div className="completed-badge-large">
                    <Check size={28} />
                  </div>
                  <h2>{t.assessment.completedTitle}</h2>
                  <p className="question-help">{t.assessment.completedDesc}</p>

                  {/* Résultat Global et Niveau de Maturité */}
                  <div className="score-callout-card" style={{ margin: '20px 0', padding: '16px', background: 'var(--card-subtle)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Score Global de Performance Neuro-Cognitive
                        </span>
                        <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--teal)' }}>
                          {globalScore} <small style={{ fontSize: '1rem', color: 'var(--muted)' }}>/ 100</small>
                        </div>
                      </div>
                      <span className={`status-chip`} style={{ background: `${currentTier.color}20`, color: currentTier.color, border: `1px solid ${currentTier.color}40`, padding: '6px 14px', borderRadius: '20px', fontWeight: 600 }}>
                        {currentTier.label}
                      </span>
                    </div>

                    {/* Breakdown des 4 Piliers */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginTop: 16 }}>
                      <div className="preview-stat-box">
                        <small>Pilier I (Focus)</small>
                        <strong>{sP1}%</strong>
                      </div>
                      <div className="preview-stat-box">
                        <small>Pilier II (Stress)</small>
                        <strong>{sP2}%</strong>
                      </div>
                      <div className="preview-stat-box">
                        <small>Pilier III (Décision)</small>
                        <strong>{sP3}%</strong>
                      </div>
                      <div className="preview-stat-box">
                        <small>Pilier IV (Équipe)</small>
                        <strong>{sP4}%</strong>
                      </div>
                    </div>
                  </div>

                  {/* Parcours Initial Recommandé (Algorithme d'Orientation T0) */}
                  <div style={{ marginTop: 24, textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 4 }}>
                      <Sparkles size={16} style={{ display: 'inline', marginRight: 6, color: 'var(--teal)' }} />
                      {t.assessment.recommendedPathTitle}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 16 }}>
                      {t.assessment.recommendedPathSub}
                    </p>

                    <div className="recommended-modules-grid" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {top3RecommendedModules.map((m, idx) => (
                        <div
                          key={m.id}
                          className="recommended-module-item card"
                          style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}
                        >
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase' }}>
                              Priorité #{idx + 1} · {m.protocolName[lang]}
                            </span>
                            <h4 style={{ margin: '4px 0', fontSize: '0.98rem' }}>{m.title[lang]}</h4>
                            <small style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
                              {m.scientificRef} · {m.durationMinutes} min
                            </small>
                          </div>
                          <button
                            type="button"
                            className="primary-button"
                            onClick={() => onOpenModule(m)}
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            <Play size={13} fill="currentColor" /> {t.learning.startModule}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mention Déontologique & Confidentialité CNDP */}
                  <div className="cndp-banner" style={{ marginTop: 24, padding: '14px 16px', background: 'var(--card-subtle)', borderRadius: '10px', border: '1px solid var(--border)', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)' }}>
                      <ShieldCheck size={16} style={{ color: 'var(--teal)' }} />
                      {t.assessment.cndpNoticeTitle}
                    </div>
                    <p style={{ margin: '8px 0 0', fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                      {t.assessment.cndpNoticeBody}
                    </p>
                  </div>

                  <div className="assessment-actions" style={{ marginTop: 24 }}>
                    <button type="button" className="primary-button wide" onClick={onGoToLearning}>
                      {t.assessment.goToLearning} <ArrowUpRight size={16} className="rtl-flip" />
                    </button>
                    <button
                      type="button"
                      className="outline-button"
                      onClick={() => setMode('final')}
                    >
                      {t.assessment.modeFinal}
                    </button>
                    <button type="button" className="outline-button" onClick={() => setStep(0)}>
                      {t.assessment.retake}
                    </button>
                  </div>
                </div>
              ) : (
                /* Écran des Questions du Pilier Actif (3 items par pilier) */
                <div key={activePillarIdx} className="view-enter">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                    <div>
                      <div className="question-number">
                        {currentPillar.num} <span>/ 04</span>
                      </div>
                      <h2 style={{ margin: '4px 0' }}>{currentPillar.title[lang]}</h2>
                      <p className="question-help">{currentPillar.sub[lang]}</p>
                    </div>
                    <div style={{ padding: '6px 12px', background: 'var(--card-subtle)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--muted)' }}>Score Pilier : </span>
                      <strong style={{ color: currentPillar.color }}>{currentPillarScore}/100</strong>
                    </div>
                  </div>

                  {/* Les 3 Items Psychométriques Contextualisés */}
                  <div className="psychometric-items-list" style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: '20px 0' }}>
                    {currentPillar.items.map((it) => {
                      const currentVal = scores[it.id] || 3
                      return (
                        <div
                          key={it.id}
                          className="psychometric-item-card"
                          style={{
                            padding: '16px',
                            background: 'var(--card-subtle)',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase' }}>
                              Item {it.itemCode}
                            </span>
                            <small style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                              {it.help[lang]}
                            </small>
                          </div>
                          <p style={{ margin: '0 0 14px', fontSize: '0.92rem', lineHeight: 1.5, fontWeight: 500 }}>
                            {it.question[lang]}
                          </p>

                          {/* Échelle de Likert à 5 niveaux */}
                          <div
                            className="likert-buttons-row"
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(5, 1fr)',
                              gap: 6,
                            }}
                          >
                            {[1, 2, 3, 4, 5].map((val) => {
                              const isSelected = currentVal === val
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  className={`scale-btn ${isSelected ? 'selected-scale' : ''}`}
                                  style={{
                                    padding: '8px 4px',
                                    borderRadius: '6px',
                                    border: isSelected ? '2px solid var(--teal)' : '1px solid var(--border)',
                                    background: isSelected ? 'var(--teal)' : 'var(--bg)',
                                    color: isSelected ? '#fff' : 'var(--text)',
                                    fontSize: '0.78rem',
                                    fontWeight: isSelected ? 700 : 500,
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.15s ease',
                                  }}
                                  onClick={() =>
                                    setScores((prev) => ({ ...prev, [it.id]: val }))
                                  }
                                  title={t.assessment.likertScale[val - 1]}
                                >
                                  <div>{val}</div>
                                  <div style={{ fontSize: '0.65rem', opacity: 0.85, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {val === 1
                                      ? 'Jamais'
                                      : val === 2
                                        ? 'Rare'
                                        : val === 3
                                          ? 'Moyen'
                                          : val === 4
                                            ? 'Souvent'
                                            : 'Toujours'}
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="assessment-actions">
                    {activePillarIdx > 0 && (
                      <button
                        type="button"
                        className="outline-button"
                        onClick={() => setStep(activePillarIdx - 1)}
                      >
                        {t.assessment.back}
                      </button>
                    )}
                    <button
                      type="button"
                      className="primary-button wide"
                      onClick={() => setStep(activePillarIdx + 1)}
                    >
                      {activePillarIdx === 3 ? t.assessment.finish : t.assessment.saveContinue}{' '}
                      <ArrowUpRight size={16} className="rtl-flip" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <aside className="assessment-aside">
          <div className="aside-illustration float-slow">
            <Brain size={46} strokeWidth={1.3} />
          </div>
          <h3>{t.assessment.asideTitle}</h3>
          <p>{t.assessment.asideDesc}</p>
          <button type="button" className="secure-line secure-line-btn" onClick={onGoToSettings}>
            <ShieldCheck size={16} /> {t.assessment.secureLine}
          </button>
        </aside>
      </section>
    </div>
  )
}

function Learning({
  lang,
  modules,
  onOpenModule,
  onFindResource,
}: {
  lang: Lang
  modules: ModuleItem[]
  onOpenModule: (m: ModuleItem) => void
  onFindResource: () => void
}) {
  const t = translations[lang]
  const [filter, setFilter] = useState<'all' | 'completed' | 'up_next'>('all')
  const [pillarFilter, setPillarFilter] = useState<'all' | 'pillar1' | 'pillar2' | 'pillar3' | 'pillar4'>('all')

  const filteredModules = modules.filter((m) => {
    if (filter === 'completed' && m.status !== 'completed') return false
    if (filter === 'up_next' && m.status === 'completed') return false
    if (pillarFilter !== 'all' && m.pillarId !== pillarFilter) return false
    return true
  })

  const heroModule = modules.find((m) => m.status !== 'completed') || modules[3]

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{t.learning.eyebrow}</p>
          <h1>{t.learning.title}</h1>
          <p className="subtitle">{t.learning.subtitle}</p>
        </div>
        <button type="button" className="outline-button" onClick={onFindResource}>
          <Search size={16} /> {t.learning.findResource}
        </button>
      </div>

      <section className="learning-hero">
        <div>
          <p className="eyebrow warm">{t.learning.continueEyebrow}</p>
          <h2>{heroModule.title[lang]}</h2>
          <p>{heroModule.meta[lang]}</p>
          <div style={{ margin: '8px 0 14px', fontSize: '0.82rem', color: 'var(--muted)' }}>
            <strong>{heroModule.protocolName[lang]}</strong> · {heroModule.scientificRef}
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={() => onOpenModule(heroModule)}
          >
            {t.learning.continueModule} <Play size={15} fill="currentColor" />
          </button>
        </div>
        <button
          type="button"
          className="hero-symbol float-slow"
          onClick={() => onOpenModule(heroModule)}
          style={{ border: 0 }}
          aria-label={heroModule.title[lang]}
        >
          <Brain size={70} strokeWidth={1} />
        </button>
      </section>

      {/* Filtres par Piliers Cognitifs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '20px 0 12px' }}>
        <button
          type="button"
          className={`filter-pill ${pillarFilter === 'all' ? 'active' : ''}`}
          onClick={() => setPillarFilter('all')}
        >
          Tous les 4 Piliers (12 Modules)
        </button>
        <button
          type="button"
          className={`filter-pill ${pillarFilter === 'pillar1' ? 'active' : ''}`}
          onClick={() => setPillarFilter('pillar1')}
        >
          Pilier I : Attention (M1–M3)
        </button>
        <button
          type="button"
          className={`filter-pill ${pillarFilter === 'pillar2' ? 'active' : ''}`}
          onClick={() => setPillarFilter('pillar2')}
        >
          Pilier II : Régulation (M4–M6)
        </button>
        <button
          type="button"
          className={`filter-pill ${pillarFilter === 'pillar3' ? 'active' : ''}`}
          onClick={() => setPillarFilter('pillar3')}
        >
          Pilier III : Décision (M7–M9)
        </button>
        <button
          type="button"
          className={`filter-pill ${pillarFilter === 'pillar4' ? 'active' : ''}`}
          onClick={() => setPillarFilter('pillar4')}
        >
          Pilier IV : Co-Régulation (M10–M12)
        </button>
      </div>

      <div className="section-header-row">
        <h2 className="section-title">{t.learning.yourModules}</h2>
        <div className="filter-pills">
          <button
            type="button"
            className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t.learning.filterAll} ({modules.length})
          </button>
          <button
            type="button"
            className={`filter-pill ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            {t.learning.filterCompleted} ({modules.filter((m) => m.status === 'completed').length})
          </button>
          <button
            type="button"
            className={`filter-pill ${filter === 'up_next' ? 'active' : ''}`}
            onClick={() => setFilter('up_next')}
          >
            {t.learning.filterUpNext} ({modules.filter((m) => m.status !== 'completed').length})
          </button>
        </div>
      </div>

      <div className="module-grid">
        {filteredModules.map((m) => {
          const statusLabel =
            m.status === 'completed'
              ? t.learning.statusCompleted
              : m.status === 'in_progress'
                ? t.learning.statusInProgress
                : t.learning.statusUpNext
          return (
            <button
              type="button"
              className="card module-card module-card-btn"
              key={m.id}
              onClick={() => onOpenModule(m)}
            >
              <div className={`module-cover ${m.coverClass}`}>
                <Brain size={30} />
                {m.status === 'completed' && (
                  <span className="module-completed-chip">
                    <Check size={12} />
                  </span>
                )}
              </div>
              <div className="module-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--teal)', fontWeight: 700 }}>
                    {m.pillarName[lang].split(':')[0]}
                  </span>
                  <small style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{statusLabel}</small>
                </div>
                <h3>{m.title[lang]}</h3>
                <div style={{ fontSize: '0.76rem', color: 'var(--teal)', fontWeight: 600, margin: '2px 0 4px' }}>
                  {m.protocolName[lang]}
                </div>
                <p style={{ margin: '0 0 6px', fontSize: '0.75rem', color: 'var(--muted)' }}>
                  {m.scientificRef}
                </p>
                <div className="module-cta-row">
                  <b>
                    {m.status === 'completed' ? t.learning.reviewModule : t.learning.startModule}
                  </b>
                  <ArrowUpRight size={14} className="rtl-flip" />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Progress({
  lang,
  focusBonus,
  domains,
  selectedDomain,
  setSelectedDomain,
  onAddReflection,
  onOpenModule,
}: {
  lang: Lang
  focusBonus: number
  domains: { label: string; initial: number; value: number; color: string; moduleIdx: number }[]
  selectedDomain: number
  setSelectedDomain: (idx: number) => void
  onAddReflection: () => void
  onOpenModule: (moduleIdx: number) => void
}) {
  const t = translations[lang]
  const [period, setPeriod] = useState<'months6' | 'months3' | 'month' | 'year'>('months6')
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number | null>(null)

  const cyclePeriod = () => {
    const order: ('month' | 'months3' | 'months6' | 'year')[] = [
      'month',
      'months3',
      'months6',
      'year',
    ]
    setPeriod(order[(order.indexOf(period) + 1) % order.length])
    setSelectedMonthIdx(null)
  }

  const chartData = progressChartByPeriod[period]
  const currentScore =
    selectedMonthIdx !== null
      ? chartData.points[selectedMonthIdx] + focusBonus
      : chartData.score + focusBonus

  const activeDom = domains[selectedDomain] || domains[0]

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{t.progress.eyebrow}</p>
          <h1>{t.progress.title}</h1>
          <p className="subtitle">{t.progress.subtitle}</p>
        </div>
        <div className="heading-actions">
          <button type="button" className="outline-button" onClick={cyclePeriod}>
            {t.progress.periods[period]} <ChevronDown size={15} />
          </button>
          <button type="button" className="primary-button" onClick={onAddReflection}>
            <Sparkles size={15} /> {t.progress.logReflection}
          </button>
        </div>
      </div>

      <section className="card big-chart">
        <CardHeader
          title={t.progress.chartTitle}
          action={t.progress.periods[period]}
          onAction={cyclePeriod}
        />
        <div className="line-chart">
          <svg
            viewBox="0 0 700 190"
            preserveAspectRatio="none"
            role="img"
            aria-label={t.progress.chartTitle}
          >
            <path
              className="line-draw"
              d={chartData.path}
              fill="none"
              stroke="var(--teal)"
              strokeWidth="3"
            />
            <path
              d={`${chartData.path} L700 190 L0 190Z`}
              fill="url(#fill)"
              opacity=".2"
            />
            <defs>
              <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                <stop stopColor="var(--teal)" />
                <stop offset="1" stopColor="var(--teal)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="line-labels">
            {t.progress.months.map((m, idx) => (
              <button
                key={m}
                type="button"
                className={`month-label-btn ${selectedMonthIdx === idx ? 'active' : ''}`}
                onClick={() => setSelectedMonthIdx(idx === selectedMonthIdx ? null : idx)}
              >
                {m} ({chartData.points[idx] + focusBonus})
              </button>
            ))}
          </div>
        </div>
        <div className="score-callout">
          <b>{currentScore}</b>
          <span>
            {selectedMonthIdx !== null
              ? t.progress.months[selectedMonthIdx]
              : t.progress.currentScore}
          </span>
          <i>
            {chartData.delta} pts {t.progress.sinceBaseline}
          </i>
        </div>
      </section>

      <section className="card domain-insights-section">
        <CardHeader
          title={t.progress.domainBreakdown}
          action={t.learning.startModule}
          onAction={() => onOpenModule(activeDom.moduleIdx)}
        />
        <div className="domain-pills-grid">
          {domains.map((d, idx) => (
            <button
              key={d.label}
              type="button"
              className={`domain-insight-card ${selectedDomain === idx ? 'active' : ''}`}
              onClick={() => setSelectedDomain(idx)}
            >
              <div className="domain-insight-top">
                <span className="focus-dot" style={{ background: d.color }} />
                <strong>{d.label}</strong>
              </div>
              <div className="domain-insight-score" style={{ color: d.color }}>
                {d.value}%
              </div>
              <div className="focus-track">
                <span style={{ width: `${d.value}%`, background: d.color }} />
              </div>
              <small className="domain-delta">
                J0: {d.initial}% → +{d.value - d.initial} pts
              </small>
            </button>
          ))}
        </div>

        {/* Selected Domain Coaching Action Box */}
        <div className="domain-detail-banner">
          <div>
            <strong>
              {activeDom.label} ({activeDom.initial}% → {activeDom.value}%)
            </strong>
            <p className="subtitle" style={{ marginTop: 4 }}>
              {lang === 'ar'
                ? 'واصلي ترسيخ هذا المجال عبر التسلسل التفاعلي المخصص في مسارك.'
                : lang === 'fr'
                  ? 'Consolidez cet acquis avec la séquence interactive associée dans votre parcours personnalisé.'
                  : 'Consolidate this competency with the interactive training sequence in your path.'}
            </p>
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={() => onOpenModule(activeDom.moduleIdx)}
          >
            <Play size={14} fill="currentColor" /> {t.learning.startModule}
          </button>
        </div>
      </section>
    </div>
  )
}

function AdminView({
  lang,
  view,
  setView,
  onPreviewReport,
  onDownloadReport,
  onShowToast,
}: {
  lang: Lang
  view: View
  setView: (v: View) => void
  onPreviewReport: (rep: (typeof adminReportsList)[0]) => void
  onDownloadReport: (filename: string, title: string) => void
  onShowToast: (msg: string) => void
}) {
  const t = translations[lang]
  const [quarter, setQuarter] = useState<'q4' | 'q3' | 'year'>('q4')
  const [showAllActivities, setShowAllActivities] = useState(false)
  const [selectedDepId, setSelectedDepId] = useState<string>(adminDepartments[0].id)

  const cycleQuarter = () => {
    const order: ('q4' | 'q3' | 'year')[] = ['q4', 'q3', 'year']
    setQuarter(order[(order.indexOf(quarter) + 1) % order.length])
  }

  const stats = adminStatsByQuarter[quarter]
  const domains = [
    { label: t.domains.focus, value: 78, color: '#2b7288' },
    { label: t.domains.emotional, value: 64, color: '#d49a60' },
    { label: t.domains.decision, value: 82, color: '#43658b' },
    { label: t.domains.collaboration, value: 71, color: '#829e75' },
  ]

  // Dedicated Admin View: Analytical Reports
  if (view === 'reports') {
    return (
      <div>
        <div className="page-heading">
          <div>
            <p className="eyebrow">{t.admin.eyebrow}</p>
            <h1>{t.admin.reportsTitle}</h1>
            <p className="subtitle">{t.admin.reportsSubtitle}</p>
          </div>
          <div className="heading-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => onPreviewReport(adminReportsList[0])}
            >
              <Plus size={16} /> {t.admin.generateCustomReport}
            </button>
          </div>
        </div>

        <div className="reports-list-grid">
          {adminReportsList.map((rep) => (
            <section className="card report-item-card" key={rep.id}>
              <div className="report-meta-top">
                <span className="report-code">{rep.code}</span>
                <small>{rep.date}</small>
              </div>
              <h3>{rep.title[lang]}</h3>
              <p>{rep.desc[lang]}</p>
              <div className="report-actions">
                <button
                  type="button"
                  className="outline-button"
                  onClick={() => onPreviewReport(rep)}
                >
                  <Eye size={15} />{' '}
                  {lang === 'ar' ? 'معاينة' : lang === 'fr' ? 'Aperçu' : 'Preview'}
                </button>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => onDownloadReport(`${rep.code}.txt`, rep.title[lang])}
                >
                  <Download size={15} /> {t.admin.downloadBtn}
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    )
  }

  // Dedicated Admin View: Pilot Progress
  if (view === 'progress') {
    return (
      <div>
        <div className="page-heading">
          <div>
            <p className="eyebrow">{t.admin.eyebrow}</p>
            <h1>{t.admin.pilotProgressTitle}</h1>
            <p className="subtitle">{t.admin.pilotProgressSubtitle}</p>
          </div>
          <div className="heading-actions">
            <button type="button" className="outline-button" onClick={cycleQuarter}>
              <ChevronDown size={15} /> {t.admin.quarters[quarter]}
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={() =>
                onDownloadReport('MIC-Progression-Par-Direction.txt', t.admin.pilotProgressTitle)
              }
            >
              <FileText size={16} /> {t.admin.exportReport}
            </button>
          </div>
        </div>

        <section className="card activity-table" style={{ marginBottom: 18 }}>
          <CardHeader
            title={t.admin.departmentsTitle}
            action={t.admin.exportReport}
            onAction={() =>
              onDownloadReport('MIC-Directions-Synthese.txt', t.admin.departmentsTitle)
            }
          />
          <div className="table-row table-head">
            <span>{t.admin.tableHead.activity}</span>
            <span>{t.admin.tableHead.participants}</span>
            <span>{t.admin.tableHead.completion}</span>
            <span>{t.admin.metrics.avgProgression}</span>
          </div>
          {adminDepartments.map((dep) => (
            <button
              type="button"
              className={`table-row table-row-btn ${selectedDepId === dep.id ? 'row-selected' : ''}`}
              key={dep.id}
              onClick={() => {
                setSelectedDepId(dep.id)
                onShowToast(
                  `${dep.name[lang]} — ${dep.participants} cadres (${dep.completion}%, ${dep.progression})`
                )
              }}
            >
              <strong>{dep.name[lang]}</strong>
              <span>{dep.participants} / 66</span>
              <span>{dep.completion}%</span>
              <span className="status-pill">
                <span />
                {dep.progression}
              </span>
            </button>
          ))}
        </section>

        <section className="card domain-card">
          <CardHeader
            title={t.admin.developmentDomains}
            action={t.sidebar.nav.reports}
            onAction={() => setView('reports')}
          />
          {domains.map((a) => (
            <button
              type="button"
              className="domain-row domain-row-btn"
              key={a.label}
              onClick={() => onShowToast(`${a.label}: ${a.value + 8}% (+${Math.round(a.value / 14)}%)`)}
            >
              <div>
                <span className="focus-dot" style={{ background: a.color }} />
                {a.label}
              </div>
              <strong>{a.value + 8}%</strong>
              <span className="up">+{Math.round(a.value / 14)}%</span>
            </button>
          ))}
        </section>
      </div>
    )
  }

  const displayedActivities = showAllActivities
    ? adminActivities
    : adminActivities.slice(0, 3)

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{t.admin.eyebrow}</p>
          <h1>{t.admin.title}</h1>
          <p className="subtitle">{t.admin.subtitle}</p>
        </div>
        <div className="heading-actions">
          <button type="button" className="outline-button" onClick={cycleQuarter}>
            <ChevronDown size={15} /> {t.admin.quarters[quarter]}
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              onDownloadReport('MIC-Rapport-Analytique-Agrege.txt', t.admin.title)
            }
          >
            <FileText size={16} /> {t.admin.exportReport}
          </button>
        </div>
      </div>

      <section className="admin-metrics">
        <Metric
          icon={Users}
          label={t.admin.metrics.participants}
          value={stats.participants}
          trend={stats.partTrend}
          sub={t.admin.metrics.thisQuarter}
          color="blue"
          onClick={() => setView('progress')}
        />
        <Metric
          icon={ClipboardCheck}
          label={t.admin.metrics.completion}
          value={stats.completion}
          trend={stats.compTrend}
          sub={t.admin.metrics.vsLastQuarter}
          color="gold"
          onClick={() => setView('progress')}
        />
        <Metric
          icon={TrendingUp}
          label={t.admin.metrics.avgProgression}
          value={stats.progression}
          trend={stats.progTrend}
          sub={t.admin.metrics.acrossDomains}
          color="green"
          onClick={() => setView('reports')}
        />
        <Metric
          icon={Clock3}
          label={t.admin.metrics.activeWeek}
          value={stats.activeWeek}
          trend={stats.activeTrend}
          sub={t.admin.metrics.ofParticipants}
          color="purple"
          onClick={() => setView('progress')}
        />
      </section>

      <div className="admin-grid">
        <section className="card admin-chart">
          <CardHeader
            title={t.admin.collectiveProgression}
            action={t.admin.viewDetailedAnalysis}
            onAction={() => setView('progress')}
          />
          <div className="chart-legend">
            <span>
              <i className="dot teal" /> {t.admin.currentCohort}
            </span>
            <span>
              <i className="dot gold" /> {t.admin.baseline}
            </span>
          </div>
          <div className="line-chart admin-line">
            <svg
              viewBox="0 0 700 220"
              preserveAspectRatio="none"
              aria-label={t.admin.collectiveProgression}
              role="img"
            >
              <path
                className="line-draw"
                d={stats.curve}
                fill="none"
                stroke="var(--teal)"
                strokeWidth="3"
              />
              <path
                d="M0 178 C100 174, 145 174, 210 170 S320 167, 380 165 S470 158, 550 152 S650 146, 700 140"
                fill="none"
                stroke="#d49a60"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
            <div className="line-labels">
              {t.admin.adminMonths.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="card domain-card">
          <CardHeader
            title={t.admin.developmentDomains}
            action={t.sidebar.nav.pilotProgress}
            onAction={() => setView('progress')}
          />
          {domains.map((a) => (
            <button
              type="button"
              className="domain-row domain-row-btn"
              key={a.label}
              onClick={() => setView('progress')}
            >
              <div>
                <span className="focus-dot" style={{ background: a.color }} />
                {a.label}
              </div>
              <strong>{a.value + 8}%</strong>
              <span className="up">+{Math.round(a.value / 14)}%</span>
            </button>
          ))}
        </section>
      </div>

      <section className="card activity-table">
        <CardHeader
          title={t.admin.recentActivity}
          action={showAllActivities ? t.admin.showLessActivity : t.admin.seeAllActivity}
          onAction={() => setShowAllActivities((s) => !s)}
        />
        <div className="table-row table-head">
          <span>{t.admin.tableHead.activity}</span>
          <span>{t.admin.tableHead.participants}</span>
          <span>{t.admin.tableHead.completion}</span>
          <span>{t.admin.tableHead.status}</span>
        </div>
        {displayedActivities.map((r) => (
          <button
            type="button"
            className="table-row table-row-btn"
            key={r.id}
            onClick={() => onShowToast(r.detail[lang])}
          >
            <strong>{r.name[lang]}</strong>
            <span>{r.participants}</span>
            <span>{r.completion}</span>
            <span className="status-pill">
              <span />
              {t.admin.statuses[r.statusKey]}
            </span>
          </button>
        ))}
      </section>
    </div>
  )
}

function ResourceLibraryView({
  lang,
  savedResources,
  onToggleBookmark,
  onOpenResource,
}: {
  lang: Lang
  savedResources: string[]
  onToggleBookmark: (id: string) => void
  onOpenResource: (r: ResourceItem) => void
}) {
  const t = translations[lang]
  const [cat, setCat] = useState<'all' | 'audio' | 'video' | 'guide' | 'saved'>('all')
  const [localQuery, setLocalQuery] = useState('')

  const filtered = resourceLibraryData.filter((r) => {
    const matchesCat =
      cat === 'saved'
        ? savedResources.includes(r.id)
        : cat === 'all'
          ? true
          : r.category === cat
    const matchesSearch =
      !localQuery ||
      r.title[lang].toLowerCase().includes(localQuery.toLowerCase()) ||
      r.description[lang].toLowerCase().includes(localQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{t.resourcesView.eyebrow}</p>
          <h1>{t.resourcesView.title}</h1>
          <p className="subtitle">{t.resourcesView.subtitle}</p>
        </div>
        <div className="inline-search-box">
          <Search size={15} />
          <input
            type="search"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder={t.topbar.searchPlaceholder}
          />
        </div>
      </div>

      <div className="filter-pills" style={{ marginBottom: 20 }}>
        {(['all', 'audio', 'video', 'guide', 'saved'] as const).map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-pill ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
          >
            {t.resourcesView.categories[c]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card settings-card" style={{ textAlign: 'center', padding: 36 }}>
          <p className="subtitle" style={{ marginBottom: 14 }}>
            {lang === 'ar'
              ? 'لا توجد موارد مطابقة حالياً.'
              : lang === 'fr'
                ? 'Aucun contenu trouvé pour ce filtre.'
                : 'No resources match this filter.'}
          </p>
          <button
            type="button"
            className="outline-button"
            onClick={() => {
              setCat('all')
              setLocalQuery('')
            }}
          >
            {t.resourcesView.categories.all}
          </button>
        </div>
      ) : (
        <div className="reports-list-grid">
          {filtered.map((res) => {
            const isSaved = savedResources.includes(res.id)
            return (
              <section className="card report-item-card" key={res.id}>
                <div className="report-meta-top">
                  <span className="report-code">{res.duration[lang]}</span>
                  <button
                    type="button"
                    className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
                    onClick={() => onToggleBookmark(res.id)}
                  >
                    <Bookmark size={14} />{' '}
                    {isSaved ? t.resourcesView.bookmarked : t.resourcesView.bookmark}
                  </button>
                </div>
                <h3
                  onClick={() => onOpenResource(res)}
                  style={{ cursor: 'pointer' }}
                >
                  {res.title[lang]}
                </h3>
                <p>{res.description[lang]}</p>
                <div className="report-actions">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => onOpenResource(res)}
                  >
                    <Play size={14} fill="currentColor" /> {t.resourcesView.openResource}
                  </button>
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

function SettingsView({
  lang,
  setLang,
  theme,
  setTheme,
  role,
  setRole,
  onSave,
  onExportData,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  theme: Theme
  setTheme: (t: Theme) => void
  role: Role
  setRole: (r: Role) => void
  onSave: () => void
  onExportData: () => void
}) {
  const t = translations[lang]
  const [prefs, setPrefs] = useState({
    dailyReminder: true,
    weeklyDigest: true,
    soundEffects: true,
  })

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{t.settingsView.eyebrow}</p>
          <h1>{t.settingsView.title}</h1>
          <p className="subtitle">{t.settingsView.subtitle}</p>
        </div>
        <button type="button" className="outline-button" onClick={onExportData}>
          <Download size={15} /> {t.settingsView.exportMyData}
        </button>
      </div>

      <div className="settings-stack">
        <section className="card settings-card">
          <h3>{t.settingsView.themeSection}</h3>
          <p className="subtitle">{t.settingsView.themeDesc}</p>
          <div className="settings-btn-group">
            <button
              type="button"
              className={theme === 'light' ? 'primary-button' : 'outline-button'}
              onClick={() => setTheme('light')}
            >
              <Sun size={15} /> {t.theme.light}
            </button>
            <button
              type="button"
              className={theme === 'dark' ? 'primary-button' : 'outline-button'}
              onClick={() => setTheme('dark')}
            >
              <Moon size={15} /> {t.theme.dark}
            </button>
          </div>
        </section>

        <section className="card settings-card">
          <h3>{t.settingsView.languageSection}</h3>
          <p className="subtitle">{t.settingsView.languageDesc}</p>
          <div className="settings-btn-group">
            {(['fr', 'ar', 'en'] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                className={lang === l ? 'primary-button' : 'outline-button'}
                onClick={() => setLang(l)}
              >
                <Globe size={15} /> {translations[l].langName} ({translations[l].dir.toUpperCase()})
              </button>
            ))}
          </div>
        </section>

        <section className="card settings-card">
          <h3>{t.settingsView.roleSection}</h3>
          <p className="subtitle">{t.settingsView.roleDesc}</p>
          <div className="settings-btn-group">
            <button
              type="button"
              className={role === 'collaborator' ? 'primary-button' : 'outline-button'}
              onClick={() => setRole('collaborator')}
            >
              {t.sidebar.sarahName} ({t.sidebar.sarahRole})
            </button>
            <button
              type="button"
              className={role === 'admin' ? 'primary-button' : 'outline-button'}
              onClick={() => setRole('admin')}
            >
              {t.sidebar.adminName} ({t.sidebar.adminRole})
            </button>
          </div>
        </section>

        <section className="card settings-card">
          <h3>{t.settingsView.notificationsSection}</h3>
          <div className="toggle-list">
            {(
              [
                ['dailyReminder', t.settingsView.dailyReminder],
                ['weeklyDigest', t.settingsView.weeklyDigest],
                ['soundEffects', t.settingsView.soundEffects],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className="toggle-row"
                onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
              >
                <span>{label}</span>
                <span className={`toggle-pill ${prefs[key] ? 'on' : ''}`}>
                  <i />
                </span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <button type="button" className="primary-button" onClick={onSave}>
              <Check size={15} /> {t.settingsView.saveSettings}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

function ModulePlayerModal({
  lang,
  module,
  allModules,
  onSelectModule,
  onClose,
  onToggleComplete,
}: {
  lang: Lang
  module: ModuleItem
  allModules: ModuleItem[]
  onSelectModule: (m: ModuleItem) => void
  onClose: () => void
  onToggleComplete: () => void
}) {
  const t = translations[lang]
  const [checkedLessons, setCheckedLessons] = useState<number[]>([0])
  const [expandedLesson, setExpandedLesson] = useState<number | null>(0)
  const [showSources, setShowSources] = useState<boolean>(true)
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale')

  const academicSource = getModuleAcademicSource(module.id)
  const expandedLessons = getModuleLessonsExpanded(module.id)

  useEffect(() => {
    if (!breathingActive) return
    const timer = window.setInterval(() => {
      setBreathPhase((p) => (p === 'inhale' ? 'exhale' : 'inhale'))
    }, 5000)
    return () => window.clearInterval(timer)
  }, [breathingActive])

  const toggleLesson = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCheckedLessons((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  const handleDownloadMemo = () => {
    const content = `========================================================================
ROYAUME DU MAROC · MINISTÈRE DE L’INDUSTRIE ET DU COMMERCE
PROGRAMME NEURO TALENT (COHORTE PILOTE 66 CADRES)
FICHE MÉTHODOLOGIQUE & FONDEMENTS SCIENTIFIQUES DU MODULE M${module.id}
========================================================================
Titre : ${module.title[lang]}
Pilier : ${module.pillarName[lang]}
Protocole Opérationnel : ${module.protocolName[lang]}
Durée recommandée : ${module.durationMinutes} minutes

1. FONDEMENTS SCIENTIFIQUES ET REVUES À COMITÉ DE LECTURE :
- Chercheurs principaux : ${academicSource.leadScientist}
- Institutions académiques : ${academicSource.institutions}
- Revue à comité de lecture (Peer-reviewed) : ${academicSource.peerReviewJournal}
- Publication séminale : ${academicSource.seminalPaper}

Synthèse Neuroscientifique :
${academicSource.executiveSummary[lang]}

Pertinence institutionnelle (Ministère de l'Industrie et du Commerce) :
${academicSource.ministryRelevance[lang]}

2. CAS PRATIQUES ET DÉROULÉ PÉDAGOGIQUE PAR LEÇON :
${module.lessons[lang]
  .map((l, idx) => {
    const detail = expandedLessons[idx]
    return `
[LEÇON ${l}]
- Fondement scientifique : ${detail ? detail.scientificBasis[lang] : 'Analyse cognitive validée.'}
- Cas concret au Ministère : ${detail ? detail.ministryCase[lang] : 'Application immédiate aux dossiers administratifs.'}
- Protocole d'action immédiat : ${detail ? detail.actionStep[lang] : 'Consigner et exécuter.'}`
  })
  .join('\n')}

3. CERTIFICATION & CONFORMITÉ :
Programme développé pour le Ministère de l'Industrie et du Commerce.
Conformité stricte à la Loi marocaine n° 09-08 (CNDP).
NEUROMAROC © 2026 · Tous droits réservés.
========================================================================`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `NEURO_TALENT_MIC_Module_M${module.id}_Fiche_Protocole.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const nextMod = allModules[(allModules.findIndex((m) => m.id === module.id) + 1) % allModules.length]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="card modal-card view-enter" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        <div className="modal-head">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
              <span className="report-code" style={{ fontSize: '0.72rem' }}>
                ROYAUME DU MAROC · MINISTÈRE DE L’INDUSTRIE ET DU COMMERCE
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>
                COHORTE #1 (66 CADRES)
              </span>
            </div>
            <h2>{module.title[lang]}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label={t.common.close}>
            <X size={18} />
          </button>
        </div>

        <p className="subtitle" style={{ marginBottom: 12 }}>
          {module.summary[lang]}
        </p>

        {/* Badges bar with toggle button for Academic Sources */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--teal)', background: 'var(--card-subtle)', padding: '5px 12px', borderRadius: '6px', border: '1px solid var(--border)' }}>
            ⚙️ {module.protocolName[lang]}
          </span>
          <button
            type="button"
            onClick={() => setShowSources((s) => !s)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.78rem',
              fontWeight: 600,
              color: showSources ? 'var(--teal)' : 'var(--muted)',
              background: 'var(--card-subtle)',
              padding: '5px 12px',
              borderRadius: '6px',
              border: `1px solid ${showSources ? 'var(--teal)' : 'var(--border)'}`,
              cursor: 'pointer',
            }}
          >
            <BookOpen size={13} />
            <span>🔬 {lang === 'ar' ? 'المصادر والأسس العلمية الأكاديمية' : lang === 'fr' ? 'Fondements & Sources Académiques' : 'Peer-Reviewed Academic Sources'}</span>
            {showSources ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>

        {/* Collapsible Academic Sources Section */}
        {showSources && (
          <div
            style={{
              background: 'rgba(43, 114, 136, 0.05)',
              border: '1px solid rgba(43, 114, 136, 0.25)',
              borderRadius: '10px',
              padding: '14px 16px',
              marginBottom: 16,
              fontSize: '0.8rem',
              lineHeight: 1.5,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong style={{ color: 'var(--teal)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={15} />
                {lang === 'ar' ? 'اعتماد المصادر العلمية الموثقة' : lang === 'fr' ? 'Validation Scientifique & Sources Académiques' : 'Peer-Reviewed Academic Credentials'}
              </strong>
              <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--card-subtle)', color: 'var(--muted)', fontWeight: 600 }}>
                {lang === 'ar' ? 'معتمدة دولياً' : 'Revue par les pairs'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px 16px', marginBottom: 10 }}>
              <div>
                <span style={{ color: 'var(--muted)', fontSize: '0.74rem', display: 'block' }}>
                  {lang === 'ar' ? 'الباحثون والمؤسسات الأكاديمية :' : lang === 'fr' ? 'Chercheurs & Universités de rattachement :' : 'Lead Scientists & Affiliations:'}
                </span>
                <strong>{academicSource.leadScientist}</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{academicSource.institutions}</div>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', fontSize: '0.74rem', display: 'block' }}>
                  {lang === 'ar' ? 'الدورية العلمية المحكمة :' : lang === 'fr' ? 'Revue à comité de lecture & Étude :' : 'Journal & Landmark Study:'}
                </span>
                <em style={{ fontSize: '0.76rem', color: 'var(--teal)' }}>{academicSource.peerReviewJournal}</em>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{academicSource.seminalPaper}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(43, 114, 136, 0.15)', paddingTop: 8, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>
                <b style={{ color: 'var(--text)' }}>
                  {lang === 'ar' ? 'الخلاصة البيولوجية المعرفية :' : lang === 'fr' ? 'Synthèse Neuroscientifique :' : 'Neurocognitive Summary:'}
                </b>{' '}
                <span style={{ color: 'var(--text)' }}>{academicSource.executiveSummary[lang]}</span>
              </div>
              <div>
                <b style={{ color: 'var(--teal)' }}>
                  {lang === 'ar' ? 'التطبيق بوزارة الصناعة والتجارة :' : lang === 'fr' ? 'Pertinence Ministère (MIC) :' : 'Ministry Context:'}
                </b>{' '}
                <span style={{ color: 'var(--text)' }}>{academicSource.ministryRelevance[lang]}</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Lessons Accordion with Ministry Cases */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {module.lessons[lang].map((lesson, idx) => {
            const done = checkedLessons.includes(idx) || module.status === 'completed'
            const isExpanded = expandedLesson === idx
            const lessonDetail = expandedLessons[idx]

            return (
              <div
                key={lesson}
                style={{
                  border: `1px solid ${isExpanded ? 'var(--teal)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  background: isExpanded ? 'var(--card-subtle)' : 'var(--card)',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    cursor: 'pointer',
                    gap: 12,
                  }}
                  onClick={() => setExpandedLesson(isExpanded ? null : idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    <button
                      type="button"
                      className={`choice-check ${done ? 'selected' : ''}`}
                      style={{ flexShrink: 0, width: 22, height: 22 }}
                      onClick={(e) => toggleLesson(idx, e)}
                      title={lang === 'ar' ? 'تأكيد إكمال الدرس' : 'Valider cette leçon'}
                    >
                      {done && <Check size={13} />}
                    </button>
                    <strong style={{ fontSize: '0.85rem', color: isExpanded ? 'var(--teal)' : 'var(--text)' }}>
                      {lesson}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted)', background: 'var(--border)', padding: '2px 8px', borderRadius: '4px' }}>
                      {isExpanded
                        ? lang === 'ar' ? 'إغلاق' : 'Masquer'
                        : lang === 'ar' ? 'تفاصيل وحالة عملية' : 'Détails & Cas MIC'}
                    </span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {isExpanded && lessonDetail && (
                  <div
                    style={{
                      padding: '12px 16px 14px 16px',
                      borderTop: '1px solid var(--border)',
                      background: 'rgba(0,0,0,0.02)',
                      fontSize: '0.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, fontWeight: 700, color: 'var(--teal)' }}>
                        🔬 {lang === 'ar' ? 'الأساس العلمي :' : lang === 'fr' ? 'Fondement :' : 'Basis:'}
                      </span>
                      <span style={{ color: 'var(--text)' }}>{lessonDetail.scientificBasis[lang]}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, fontWeight: 700, color: '#d97706' }}>
                        🏛️ {lang === 'ar' ? 'سياق العمل بالوزارة :' : lang === 'fr' ? 'Cas Ministère (MIC) :' : 'Ministry Case:'}
                      </span>
                      <span style={{ color: 'var(--text)' }}>{lessonDetail.ministryCase[lang]}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: 'rgba(43, 114, 136, 0.08)', padding: '8px 10px', borderRadius: '6px' }}>
                      <span style={{ flexShrink: 0, fontWeight: 700, color: 'var(--teal)' }}>
                        ⚡ {lang === 'ar' ? 'الإجراء العملي الفوري :' : lang === 'fr' ? 'Protocole Immédiat :' : 'Immediate Protocol:'}
                      </span>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>{lessonDetail.actionStep[lang]}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Interactive Coherence Breathing Pacer */}
        <div className="coherence-box">
          <div className="coherence-info">
            <strong>
              <Wind size={15} /> {t.learning.breathingTitle}
            </strong>
            {breathingActive && (
              <span className="breath-instruction">
                {breathPhase === 'inhale' ? t.learning.inhale : t.learning.exhale}
              </span>
            )}
          </div>
          <div className="coherence-controls">
            {breathingActive && <div className={`breath-orb ${breathPhase}`} />}
            <button
              type="button"
              className="outline-button"
              onClick={() => setBreathingActive((b) => !b)}
            >
              {breathingActive ? t.learning.breathingStop : t.learning.breathingStart}
            </button>
          </div>
        </div>

        <div className="modal-foot">
          <button
            type="button"
            className="outline-button"
            onClick={handleDownloadMemo}
            title="Télécharger la fiche protocole ministérielle"
          >
            <Download size={14} /> Fiche Protocole MIC (TXT)
          </button>
          <button
            type="button"
            className="outline-button"
            onClick={() => onSelectModule(nextMod)}
          >
            {t.learning.moduleLabel} {nextMod.id} <ChevronRight size={14} className="rtl-flip" />
          </button>
          <button type="button" className="outline-button" onClick={onClose}>
            {t.common.close}
          </button>
          <button type="button" className="primary-button" onClick={onToggleComplete}>
            <Check size={15} />{' '}
            {module.status === 'completed' ? t.learning.completedBadge : t.learning.markComplete}
          </button>
        </div>
      </div>
    </div>
  )
}

function ResourcePlayerModal({
  lang,
  resource,
  isSaved,
  onToggleBookmark,
  onDownloadGuide,
  onClose,
}: {
  lang: Lang
  resource: ResourceItem
  isSaved: boolean
  onToggleBookmark: () => void
  onDownloadGuide: () => void
  onClose: () => void
}) {
  const t = translations[lang]
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(28)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 4))
    }, 600)
    return () => window.clearInterval(id)
  }, [playing])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="card modal-card view-enter" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="eyebrow">{resource.duration[lang]}</p>
            <h2>{resource.title[lang]}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label={t.common.close}>
            <X size={18} />
          </button>
        </div>

        <p className="subtitle">{resource.description[lang]}</p>

        <div className="media-player-box">
          <button
            type="button"
            className="play-circle-btn"
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
          </button>
          <div
            className="media-track-wrap"
            style={{ cursor: 'pointer' }}
            onClick={() => setProgress((p) => (p >= 85 ? 15 : p + 20))}
          >
            <div className="mini-progress">
              <span style={{ width: `${progress}%` }} />
            </div>
            <small>
              {playing ? `Playing (${progress}%)` : `Paused (${progress}%) · Click to play`}
            </small>
          </div>
        </div>

        <div className="takeaways-list">
          {resource.takeaways[lang].map((point) => (
            <div key={point} className="takeaway-row">
              <Sparkles size={14} />
              <span>{point}</span>
            </div>
          ))}
        </div>

        {resource.audioScript && (
          <div style={{ marginTop: 14, background: 'var(--card-subtle)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <strong style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: 'var(--teal)' }}>
              <FileText size={14} /> Script Studio Verbatim (Article 2 §1.1)
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: '140px', overflowY: 'auto' }}>
              {resource.audioScript[lang].map((line, idx) => (
                <div key={idx} style={{ fontSize: '0.78rem', lineHeight: 1.45, color: 'var(--text)' }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-foot">
          <button type="button" className="outline-button" onClick={onDownloadGuide}>
            <Download size={15} /> Fiche PDF/TXT
          </button>
          <button type="button" className="outline-button" onClick={onToggleBookmark}>
            <Bookmark size={15} />{' '}
            {isSaved ? t.resourcesView.bookmarked : t.resourcesView.bookmark}
          </button>
          <button type="button" className="primary-button" onClick={onClose}>
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  )
}

function ScheduleModal({
  lang,
  sessions,
  onAddSession,
  onRescheduleSession,
  onLaunchSession,
  onClose,
}: {
  lang: Lang
  sessions: ScheduleSession[]
  onAddSession: (s: ScheduleSession) => void
  onRescheduleSession: (id: string) => void
  onLaunchSession: (title: string) => void
  onClose: () => void
}) {
  const t = translations[lang]

  const handleBookNew = () => {
    const newSession: ScheduleSession = {
      id: `s-${Date.now()}`,
      date: {
        en: 'Friday, 25 Oct',
        fr: 'Vendredi, 25 Oct',
        ar: 'الجمعة، 25 أكتوبر',
      },
      time: '11:00 – 11:45',
      title: {
        en: 'Interactive Consolidation Workshop (Art. 2 §1.3)',
        fr: 'Atelier en ligne de consolidation des acquis (Art. 2 §1.3)',
        ar: 'ورشة تفاعلية عن بُعد لترسيخ المكتسبات (المادة 2 §1.3)',
      },
      type: {
        en: 'Online Workshop',
        fr: 'Atelier en ligne animé',
        ar: 'ورشة تفاعلية مؤطرة',
      },
      facilitator: 'Dr. Youssef Berrada',
    }
    onAddSession(newSession)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="card modal-card view-enter" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="eyebrow">NEUROMAROC · MIC COHORT #1</p>
            <h2>{t.schedule.title}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label={t.common.close}>
            <X size={18} />
          </button>
        </div>

        <p className="subtitle" style={{ marginBottom: 16 }}>
          {t.schedule.subtitle}
        </p>

        <div className="schedule-list">
          {sessions.map((s) => (
            <div key={s.id} className="schedule-item">
              <div className="schedule-date-badge">
                <Calendar size={16} />
                <div>
                  <strong>{s.date[lang]}</strong>
                  <small>{s.time}</small>
                </div>
              </div>
              <div className="schedule-info">
                <strong>{s.title[lang]}</strong>
                <small>
                  {s.type[lang]} · {s.facilitator}
                </small>
              </div>
              <div className="schedule-row-actions">
                <button
                  type="button"
                  className="outline-button"
                  onClick={() => onRescheduleSession(s.id)}
                  title={t.schedule.reschedule}
                >
                  <RefreshCw size={13} /> {t.schedule.reschedule}
                </button>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => onLaunchSession(s.title[lang])}
                >
                  {t.schedule.joinSession}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-foot">
          <button type="button" className="outline-button" onClick={onClose}>
            {t.common.close}
          </button>
          <button type="button" className="primary-button" onClick={handleBookNew}>
            <Plus size={15} /> {t.schedule.bookNew}
          </button>
        </div>
      </div>
    </div>
  )
}

function ReflectionModal({
  lang,
  onClose,
  onSubmitReflection,
}: {
  lang: Lang
  onClose: () => void
  onSubmitReflection: (note: string) => void
}) {
  const t = translations[lang]
  const [moodIdx, setMoodIdx] = useState(2)
  const [note, setNote] = useState('')

  const moods =
    lang === 'ar'
      ? ['مشتت', 'متوسط', 'مركز وهادئ', 'أداء عالٍ']
      : lang === 'fr'
        ? ['Dispersé', 'Modéré', 'Concentré & calme', 'Clarté optimale']
        : ['Scattered', 'Moderate', 'Focused & calm', 'Peak clarity']

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="card modal-card view-enter" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="eyebrow">ARTICLE 2 · §1.5 CONSOLIDATION</p>
            <h2>{t.progress.logReflection}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="scale" style={{ margin: '18px 0' }}>
          {moods.map((m, idx) => (
            <button
              key={m}
              type="button"
              className={moodIdx === idx ? 'selected-scale' : ''}
              onClick={() => setMoodIdx(idx)}
            >
              {m}
            </button>
          ))}
        </div>

        <textarea
          className="reflection-textarea"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={
            lang === 'ar'
              ? 'سجلي ملاحظة قصيرة حول تمرين التركيز اليوم...'
              : lang === 'fr'
                ? 'Notez une observation rapide sur votre séance de concentration du jour...'
                : 'Write a brief note on your focus practice today...'
          }
        />

        <div className="modal-foot">
          <button type="button" className="outline-button" onClick={onClose}>
            {t.common.cancel}
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={() => onSubmitReflection(note)}
          >
            <Send size={14} /> {t.common.confirm} (+2 pts)
          </button>
        </div>
      </div>
    </div>
  )
}

function ReportPreviewModal({
  lang,
  report,
  onDownload,
  onClose,
}: {
  lang: Lang
  report: (typeof adminReportsList)[0]
  onDownload: () => void
  onClose: () => void
}) {
  const t = translations[lang]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="card modal-card view-enter" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <div className="modal-head">
          <div>
            <p className="eyebrow">
              ROYAUME DU MAROC · MINISTÈRE DE L’INDUSTRIE ET DU COMMERCE · {report.code}
            </p>
            <h2>{report.title[lang]}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p className="subtitle" style={{ marginBottom: 14 }}>
          {report.desc[lang]}
        </p>

        {/* CNDP & Loi 09-08 Certification Box */}
        <div style={{ background: 'var(--card-subtle)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <ShieldCheck size={16} style={{ color: 'var(--teal)', flexShrink: 0 }} />
          <span>
            <b>Conformité Loi n° 09-08 (CNDP) :</b> Métriques 100 % agrégées et anonymisées à l’échelle des 66 cadres. Aucune donnée individuelle accessible par la hiérarchie.
          </span>
        </div>

        {/* 6 Indicateurs Clés d'Engagement */}
        <div className="report-preview-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
          <div className="preview-stat-box">
            <small>Activation Licences</small>
            <strong>100 % (66/66)</strong>
          </div>
          <div className="preview-stat-box">
            <small>Achèvement T0 ➔ T1</small>
            <strong>98,5 % (65/66)</strong>
          </div>
          <div className="preview-stat-box">
            <small>Delta Score Global</small>
            <strong style={{ color: 'var(--teal)' }}>+26,3 pts (+59%)</strong>
          </div>
          <div className="preview-stat-box">
            <small>Assiduité Globale</small>
            <strong>92,3 %</strong>
          </div>
          <div className="preview-stat-box">
            <small>Sessions Audio VFC</small>
            <strong>1 428 sessions</strong>
          </div>
          <div className="preview-stat-box">
            <small>Niveau 1 (Fragile)</small>
            <strong style={{ color: '#059669' }}>0 % (vs 68% T0)</strong>
          </div>
        </div>

        {/* Tableau de Progression Comparatif T0 vs T1 par Pilier */}
        <div style={{ background: 'var(--card-subtle)', borderRadius: '8px', padding: '12px', border: '1px solid var(--border)', marginBottom: 16 }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span>PROGRESSION COMPARATIVE PAR PILIER COGNITIF (T0 ➔ T1)</span>
            <span style={{ color: 'var(--teal)' }}>MOYENNE COHORTE</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
              <span>Pilier I : Attention & Clarté Mentale</span>
              <span>42,1 ➔ <b>69,8 / 100</b> <span style={{ color: 'var(--teal)', fontWeight: 700 }}>(+27,7 pts)</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
              <span>Pilier II : Régulation Émotionnelle & Stress</span>
              <span>48,5 ➔ <b>74,2 / 100</b> <span style={{ color: 'var(--teal)', fontWeight: 700 }}>(+25,7 pts)</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
              <span>Pilier III : Prise de Décision & Agilité</span>
              <span>41,2 ➔ <b>61,5 / 100</b> <span style={{ color: 'var(--teal)', fontWeight: 700 }}>(+20,3 pts)</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span>Pilier IV : Co-Régulation & Intelligence Collective</span>
              <span>46,8 ➔ <b>78,4 / 100</b> <span style={{ color: 'var(--teal)', fontWeight: 700 }}>(+31,6 pts)</span></span>
            </div>
          </div>
        </div>

        <div className="modal-foot">
          <button
            type="button"
            className="outline-button"
            onClick={() => window.print()}
          >
            <Printer size={15} /> Imprimer / PDF Officiel
          </button>
          <button type="button" className="primary-button" onClick={onDownload}>
            <Download size={15} /> {t.admin.downloadBtn} (Rapport MIC)
          </button>
        </div>
      </div>
    </div>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  trend,
  sub,
  color,
  onClick,
}: {
  icon: typeof Brain
  label: string
  value: string
  trend: string
  sub: string
  color: string
  onClick?: () => void
}) {
  return (
    <button type="button" className="metric card metric-btn" onClick={onClick}>
      <div className={`metric-icon ${color}`}>
        <Icon size={18} />
      </div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-foot">
        <span>{trend}</span> {sub}
      </div>
    </button>
  )
}

function CardHeader({
  title,
  action,
  onAction,
}: {
  title: string
  action: string
  onAction?: () => void
}) {
  return (
    <div className="card-header">
      <h2>{title}</h2>
      {action && (
        <button type="button" className="card-action" onClick={onAction}>
          {action} <ArrowUpRight size={14} className="rtl-flip" />
        </button>
      )}
    </div>
  )
}

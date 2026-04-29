import { useState } from 'react';
import './App.css';
import { BookOpen, FlaskConical, Heart, Menu, X, ChevronRight, Star, Clock, Award } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('materials');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'materials', label: 'Пособия', icon: BookOpen, color: '#FF6B6B' },
    { id: 'labs', label: 'Лабораторные работы', icon: FlaskConical, color: '#4ECDC4' },
    { id: 'useful', label: 'Что-то полезное', icon: Heart, color: '#FFE66D' },
  ];

  const materialsData = [
    { id: 1, title: 'Введение в программирование', progress: 75, time: '2 часа', difficulty: 'Легкий' },
    { id: 2, title: 'Основы алгоритмов', progress: 45, time: '3 часа', difficulty: 'Средний' },
    { id: 3, title: 'Структуры данных', progress: 20, time: '4 часа', difficulty: 'Сложный' },
    { id: 4, title: 'Объектно-ориентированное программирование', progress: 90, time: '2.5 часа', difficulty: 'Средний' },
  ];

  const labsData = [
    { id: 1, title: 'Лабораторная работа №1: Переменные', status: 'completed', grade: '5' },
    { id: 2, title: 'Лабораторная работа №2: Циклы', status: 'in-progress', grade: null },
    { id: 3, title: 'Лабораторная работа №3: Функции', status: 'locked', grade: null },
    { id: 4, title: 'Лабораторная работа №4: Массивы', status: 'locked', grade: null },
  ];

  const usefulData = [
    { id: 1, title: 'Шпаргалка по JavaScript', type: 'PDF', downloads: 1234 },
    { id: 2, title: 'Топ-10 ресурсов для разработчика', type: 'Статья', downloads: 856 },
    { id: 3, title: 'Чек-лист перед собеседованием', type: 'PDF', downloads: 2341 },
    { id: 4, title: 'Полезные расширения VS Code', type: 'Видео', downloads: 567 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4ECDC4';
      case 'in-progress': return '#FFE66D';
      case 'locked': return '#C7C7C7';
      default: return '#C7C7C7';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'materials':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Учебные пособия</h2>
              <p className="section-subtitle">Изучайте теорию в удобном темпе</p>
            </div>
            <div className="cards-grid">
              {materialsData.map((item) => (
                <div key={item.id} className="card material-card">
                  <div className="card-header">
                    <div className="card-icon" style={{ backgroundColor: `${menuItems[0].color}20` }}>
                      <BookOpen size={24} color={menuItems[0].color} />
                    </div>
                    <span className={`difficulty-badge difficulty-${item.difficulty.toLowerCase()}`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <div className="progress-container">
                    <div className="progress-info">
                      <span className="progress-label">Прогресс</span>
                      <span className="progress-value">{item.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="card-meta">
                      <Clock size={16} />
                      <span>{item.time}</span>
                    </div>
                    <button className="continue-btn">
                      Продолжить <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'labs':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Лабораторные работы</h2>
              <p className="section-subtitle">Практикуйтесь и закрепляйте знания</p>
            </div>
            <div className="labs-list">
              {labsData.map((lab) => (
                <div key={lab.id} className="lab-card">
                  <div className="lab-status" style={{ backgroundColor: getStatusColor(lab.status) }}></div>
                  <div className="lab-content">
                    <div className="lab-header">
                      <FlaskConical size={24} color={getStatusColor(lab.status)} />
                      <h3>{lab.title}</h3>
                    </div>
                    <div className="lab-footer">
                      <span className="lab-status-text" style={{ color: getStatusColor(lab.status) }}>
                        {lab.status === 'completed' && '✓ Выполнено'}
                        {lab.status === 'in-progress' && '◐ В процессе'}
                        {lab.status === 'locked' && '🔒 Заблокировано'}
                      </span>
                      {lab.grade && (
                        <div className="grade-badge">
                          <Award size={16} />
                          <span>Оценка: {lab.grade}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {lab.status !== 'locked' && (
                    <button className="lab-action-btn">
                      {lab.status === 'completed' ? 'Повторить' : 'Начать'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'useful':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Полезные материалы</h2>
              <p className="section-subtitle">Дополнительные ресурсы для обучения</p>
            </div>
            <div className="useful-grid">
              {usefulData.map((item) => (
                <div key={item.id} className="useful-card">
                  <div className="useful-card-header">
                    <div className="useful-icon">
                      <Heart size={20} />
                    </div>
                    <span className="resource-type">{item.type}</span>
                  </div>
                  <h3 className="useful-title">{item.title}</h3>
                  <div className="useful-footer">
                    <div className="download-stats">
                      <Star size={16} />
                      <span>{item.downloads} загрузок</span>
                    </div>
                    <button className="download-btn">Скачать</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <BookOpen size={28} />
            </div>
            <span className="logo-text">LearnHub</span>
          </div>
          <button 
            className="mobile-menu-close" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <div className="nav-icon" style={{ 
                    backgroundColor: activeSection === item.id ? item.color : `${item.color}20`,
                    color: activeSection === item.id ? '#fff' : item.color
                  }}>
                    <item.icon size={20} />
                  </div>
                  <span className="nav-label">{item.label}</span>
                  {activeSection === item.id && (
                    <ChevronRight size={18} className="nav-arrow" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">А</div>
            <div className="user-info">
              <span className="user-name">Алексей Петров</span>
              <span className="user-level">Junior Developer</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Mobile Header */}
        <header className="mobile-header">
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="mobile-logo">
            <BookOpen size={24} />
            <span>LearnHub</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </main>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default App;

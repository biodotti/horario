import React, { useState, useEffect } from 'react';
import { School, Users, BookOpen, Calendar, Settings, Save, ChevronRight, CheckCircle } from 'lucide-react';
import { db } from './firebase-config';
import SchoolForm from './components/SchoolForm';
import ClassesForm from './components/ClassesForm';
import TeachersForm from './components/TeachersForm';
import SubjectsForm from './components/SubjectsForm';
import ScheduleView from './components/ScheduleView';

function App() {
    const [activeTab, setActiveTab] = useState('school');
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Global State
    const [schoolData, setSchoolData] = useState(null);
    const [classesData, setClassesData] = useState([]);
    const [teachersData, setTeachersData] = useState([]);
    const [subjectsData, setSubjectsData] = useState({ subjects: [], rooms: [] });

    // Load data on mount
    useEffect(() => {
        loadData();
    }, []);

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    const loadData = async () => {
        setIsLoading(true);
        try {
            if (!db) {
                console.warn("Firebase DB not initialized");
                setIsLoading(false);
                return;
            }

            const docRef = db.collection("schedules").doc("default_school");
            const docSnap = await docRef.get();

            if (docSnap.exists) {
                const data = docSnap.data();
                if (data.school) setSchoolData(data.school);
                if (data.classes) setClassesData(data.classes);
                if (data.teachers) setTeachersData(data.teachers);
                if (data.subjects) setSubjectsData(data.subjects);
                showNotification('Dados carregados do Firebase!');
            }
        } catch (error) {
            console.error("Error loading document: ", error);
            showNotification('Erro ao carregar dados: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const saveDataToFirebase = async () => {
        setIsLoading(true);
        try {
            if (!db) {
                showNotification('Erro: Firebase não configurado.');
                return;
            }

            await db.collection("schedules").doc("default_school").set({
                school: schoolData,
                classes: classesData,
                teachers: teachersData,
                subjects: subjectsData,
                updatedAt: new Date()
            });
            showNotification('Todos os dados foram salvos na nuvem!');
        } catch (error) {
            console.error("Error writing document: ", error);
            showNotification('Erro ao salvar no Firebase: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = (type, data) => {
        switch (type) {
            case 'school': setSchoolData(data); break;
            case 'classes': setClassesData(data); break;
            case 'teachers': setTeachersData(data); break;
            case 'subjects': setSubjectsData(data); break;
        }
        showNotification('Dados salvos localmente!');
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            );
        }

        switch (activeTab) {
            case 'school': return <SchoolForm data={schoolData} onSave={(d) => handleSave('school', d)} />;
            case 'classes': return <ClassesForm data={classesData} onSave={(d) => handleSave('classes', d)} />;
            case 'teachers': return <TeachersForm data={teachersData} onSave={(d) => handleSave('teachers', d)} />;
            case 'subjects': return <SubjectsForm data={subjectsData} onSave={(d) => handleSave('subjects', d)} />;
            case 'schedule': return <ScheduleView
                data={{ school: schoolData, classes: classesData, teachers: teachersData, subjects: subjectsData }}
            />;
            default: return <SchoolForm data={schoolData} onSave={(d) => handleSave('school', d)} />;
        }
    };

    const NavItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === id
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            <Icon size={20} />
            <span>{label}</span>
            {activeTab === id && <ChevronRight size={16} className="ml-auto" />}
        </button>
    );

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
                        <Calendar size={24} />
                        <span>Scheduler AI</span>
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    <NavItem id="school" icon={School} label="Escola" />
                    <NavItem id="classes" icon={Users} label="Turmas" />
                    <NavItem id="teachers" icon={BookOpen} label="Professores" />
                    <NavItem id="subjects" icon={Settings} label="Disciplinas/Salas" />
                    <div className="pt-4 border-t border-gray-100 mt-4">
                        <NavItem id="schedule" icon={Calendar} label="Gerar Horário" />
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {activeTab === 'school' && 'Configuração da Escola'}
                            {activeTab === 'classes' && 'Gerenciar Turmas'}
                            {activeTab === 'teachers' && 'Corpo Docente'}
                            {activeTab === 'subjects' && 'Disciplinas e Salas'}
                            {activeTab === 'schedule' && 'Geração de Horários'}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {activeTab === 'school' && 'Defina os turnos e horários base.'}
                            {activeTab === 'classes' && 'Cadastre as séries e turmas.'}
                            {activeTab === 'teachers' && 'Cadastre professores e disponibilidades.'}
                            {activeTab === 'subjects' && 'Configure as matérias e ambientes.'}
                            {activeTab === 'schedule' && 'Utilize a IA para gerar a grade ideal.'}
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={saveDataToFirebase}
                            disabled={isLoading}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center space-x-2"
                        >
                            {isLoading ? <div className="animate-spin h-4 w-4 border-b-2 border-gray-700 rounded-full"></div> : <Save size={18} />}
                            <span>Salvar na Nuvem</span>
                        </button>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto">
                    {renderContent()}
                </div>
            </main>

            {/* Notification Toast */}
            {notification && (
                <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-bounce">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    {notification}
                </div>
            )}
        </div>
    );
}

export default App;

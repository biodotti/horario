import React, { useState } from 'react';
import { Plus, Settings, Trash2, Users, Save } from 'lucide-react';

const ClassesForm = ({ data, onSave }) => {
    const [classes, setClasses] = useState(data || []);

    const addClass = () => {
        setClasses([...classes, {
            id: Date.now(),
            name: '',
            grade: '',
            students: 30,
            subjects: {} // { Math: 5, Portuguese: 4 }
        }]);
    };

    const updateClass = (id, field, value) => {
        setClasses(classes.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const removeClass = (id) => {
        setClasses(classes.filter(c => c.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Turmas Cadastradas</h2>
                <button
                    onClick={addClass}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Turma
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {classes.map(cls => (
                    <div key={cls.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Nome da Turma</label>
                                <input
                                    type="text"
                                    value={cls.name}
                                    onChange={(e) => updateClass(cls.id, 'name', e.target.value)}
                                    placeholder="Ex: 6º Ano A"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Série/Ano</label>
                                <input
                                    type="text"
                                    value={cls.grade}
                                    onChange={(e) => updateClass(cls.id, 'grade', e.target.value)}
                                    placeholder="Ex: 6º Ano"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Nº Alunos</label>
                                <input
                                    type="number"
                                    value={cls.students}
                                    onChange={(e) => updateClass(cls.id, 'students', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 border-l pl-4 border-gray-100">
                            <button
                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Configurar Disciplinas"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => removeClass(cls.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remover Turma"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}

                {classes.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Nenhuma turma cadastrada ainda.</p>
                        <button onClick={addClass} className="mt-2 text-indigo-600 font-medium hover:underline">
                            Criar primeira turma
                        </button>
                    </div>
                )}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={() => onSave(classes)}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center font-medium"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Turmas
                </button>
            </div>
        </div>
    );
};

export default ClassesForm;

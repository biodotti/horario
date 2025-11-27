import React, { useState } from 'react';
import { Plus, Trash2, BookOpen, Save } from 'lucide-react';

const TeachersForm = ({ data, onSave }) => {
    const [teachers, setTeachers] = useState(data || []);

    const addTeacher = () => {
        setTeachers([...teachers, {
            id: Date.now(),
            name: '',
            subjects: [],
            availability: { mon: true, tue: true, wed: true, thu: true, fri: true }
        }]);
    };

    const updateTeacher = (id, field, value) => {
        setTeachers(teachers.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const removeTeacher = (id) => {
        setTeachers(teachers.filter(t => t.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Corpo Docente</h2>
                <button
                    onClick={addTeacher}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Professor
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {teachers.map(teacher => (
                    <div key={teacher.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 mr-4">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Nome do Professor</label>
                                <input
                                    type="text"
                                    value={teacher.name}
                                    onChange={(e) => updateTeacher(teacher.id, 'name', e.target.value)}
                                    placeholder="Ex: João Silva"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <button
                                onClick={() => removeTeacher(teacher.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-5"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-2">Disponibilidade</label>
                            <div className="flex space-x-2">
                                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map((day, idx) => {
                                    const key = ['mon', 'tue', 'wed', 'thu', 'fri'][idx];
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                const newAvail = { ...teacher.availability, [key]: !teacher.availability[key] };
                                                updateTeacher(teacher.id, 'availability', newAvail);
                                            }}
                                            className={`
                                                px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                                                ${teacher.availability[key]
                                                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                    : 'bg-gray-100 text-gray-400 border border-gray-200'}
                                            `}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
                {teachers.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Nenhum professor cadastrado.</p>
                    </div>
                )}
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={() => onSave(teachers)}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center font-medium"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Professores
                </button>
            </div>
        </div>
    );
};

export default TeachersForm;

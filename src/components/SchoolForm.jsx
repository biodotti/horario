import React, { useState } from 'react';
import { Clock, Coffee, Plus, Trash2, Save } from 'lucide-react';

const SchoolForm = ({ data, onSave }) => {
    const [formData, setFormData] = useState(data || {
        shifts: { morning: true, afternoon: false, night: false },
        lessonDuration: 50,
        breaks: []
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleShift = (shift) => {
        setFormData(prev => ({
            ...prev,
            shifts: { ...prev.shifts, [shift]: !prev.shifts[shift] }
        }));
    };

    const addBreak = () => {
        setFormData(prev => ({
            ...prev,
            breaks: [...prev.breaks, { start: '09:30', end: '09:50', name: 'Recreio' }]
        }));
    };

    const updateBreak = (index, field, value) => {
        const newBreaks = [...formData.breaks];
        newBreaks[index][field] = value;
        setFormData(prev => ({ ...prev, breaks: newBreaks }));
    };

    const removeBreak = (index) => {
        setFormData(prev => ({
            ...prev,
            breaks: prev.breaks.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                    Turnos e Horários
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {['morning', 'afternoon', 'night'].map(shift => (
                        <label key={shift} className={`
                            flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all
                            ${formData.shifts[shift]
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-600'}
                        `}>
                            <span className="capitalize">
                                {shift === 'morning' ? 'Manhã' : shift === 'afternoon' ? 'Tarde' : 'Noite'}
                            </span>
                            <input
                                type="checkbox"
                                checked={formData.shifts[shift]}
                                onChange={() => toggleShift(shift)}
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                        </label>
                    ))}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duração da Aula (minutos)
                    </label>
                    <input
                        type="number"
                        value={formData.lessonDuration}
                        onChange={(e) => handleChange('lessonDuration', parseInt(e.target.value))}
                        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                        <Coffee className="w-5 h-5 mr-2 text-emerald-600" />
                        Intervalos
                    </h2>
                    <button
                        onClick={addBreak}
                        className="flex items-center px-3 py-1.5 text-sm bg-emerald-50 text-emerald-700 rounded-md hover:bg-emerald-100 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Adicionar
                    </button>
                </div>

                <div className="space-y-3">
                    {formData.breaks.map((brk, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg group">
                            <input
                                type="text"
                                value={brk.name}
                                onChange={(e) => updateBreak(index, 'name', e.target.value)}
                                placeholder="Nome (ex: Recreio)"
                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <input
                                type="time"
                                value={brk.start}
                                onChange={(e) => updateBreak(index, 'start', e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-md"
                            />
                            <span className="text-gray-400">até</span>
                            <input
                                type="time"
                                value={brk.end}
                                onChange={(e) => updateBreak(index, 'end', e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-md"
                            />
                            <button
                                onClick={() => removeBreak(index)}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {formData.breaks.length === 0 && (
                        <p className="text-center text-gray-400 py-4 italic">Nenhum intervalo cadastrado</p>
                    )}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => onSave(formData)}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center font-medium"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Configurações
                </button>
            </div>
        </div>
    );
};

export default SchoolForm;

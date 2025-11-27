import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

const SubjectsForm = ({ data, onSave }) => {
    const [subjects, setSubjects] = useState(data?.subjects || []);
    const [rooms, setRooms] = useState(data?.rooms || []);

    const addSubject = () => setSubjects([...subjects, { id: Date.now(), name: '', constraints: [] }]);
    const addRoom = () => setRooms([...rooms, { id: Date.now(), name: '', capacity: 30, type: 'standard' }]);

    return (
        <div className="space-y-8">
            {/* Subjects Section */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Disciplinas</h2>
                    <button onClick={addSubject} className="flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200">
                        <Plus className="w-4 h-4 mr-1" /> Adicionar
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {subjects.map((sub, idx) => (
                        <div key={sub.id} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200">
                            <input
                                value={sub.name}
                                onChange={(e) => {
                                    const newSubs = [...subjects];
                                    newSubs[idx].name = e.target.value;
                                    setSubjects(newSubs);
                                }}
                                placeholder="Nome da Disciplina"
                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md"
                            />
                            <button onClick={() => setSubjects(subjects.filter((_, i) => i !== idx))} className="text-red-500 p-1">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Rooms Section */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Salas e Ambientes</h2>
                    <button onClick={addRoom} className="flex items-center px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200">
                        <Plus className="w-4 h-4 mr-1" /> Adicionar
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {rooms.map((room, idx) => (
                        <div key={room.id} className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200">
                            <input
                                value={room.name}
                                onChange={(e) => {
                                    const newRooms = [...rooms];
                                    newRooms[idx].name = e.target.value;
                                    setRooms(newRooms);
                                }}
                                placeholder="Nome da Sala"
                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md"
                            />
                            <select
                                value={room.type}
                                onChange={(e) => {
                                    const newRooms = [...rooms];
                                    newRooms[idx].type = e.target.value;
                                    setRooms(newRooms);
                                }}
                                className="px-3 py-1.5 border border-gray-300 rounded-md"
                            >
                                <option value="standard">Padrão</option>
                                <option value="lab">Laboratório</option>
                                <option value="gym">Quadra</option>
                                <option value="art">Artes</option>
                            </select>
                            <button onClick={() => setRooms(rooms.filter((_, i) => i !== idx))} className="text-red-500 p-1">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <div className="flex justify-end pt-4">
                <button
                    onClick={() => onSave({ subjects, rooms })}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center font-medium"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Tudo
                </button>
            </div>
        </div>
    );
};

export default SubjectsForm;

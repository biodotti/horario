import React, { useState } from 'react';
import { Loader, Sparkles } from 'lucide-react';
import { AIService } from '../services/AIService';

const ScheduleView = ({ data }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [schedule, setSchedule] = useState(null);
    const [apiKey, setApiKey] = useState('AIzaSyBq_zo0gwM_pFWAM7Qd4xce_DPRVGkYJV0');

    const generateSchedule = async () => {
        if (!apiKey) {
            alert('Por favor, insira sua chave da API Gemini.');
            return;
        }

        setIsGenerating(true);
        setSchedule(null);

        try {
            const aiService = new AIService(apiKey);
            const result = await aiService.generateSchedule(data);

            setSchedule({
                generated: true,
                message: "Horário gerado com sucesso!",
                data: result
            });
        } catch (error) {
            alert('Erro ao gerar horário: ' + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Gerador de Horários com IA</h2>
                <p className="text-indigo-100 mb-6">Utilize a inteligência artificial para criar a grade ideal para sua escola.</p>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 mb-6">
                    <label className="block text-sm font-medium text-indigo-100 mb-2">
                        Chave da API (Gemini/OpenAI)
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Cole sua API Key aqui..."
                            className="flex-1 px-4 py-2 bg-white/90 text-gray-900 rounded-lg focus:ring-2 focus:ring-white border-none placeholder-gray-500"
                        />
                    </div>
                    <p className="text-xs text-indigo-200 mt-2">
                        A chave é usada apenas localmente para gerar o horário e não é salva.
                    </p>
                </div>

                <button
                    onClick={generateSchedule}
                    disabled={isGenerating}
                    className={`
                        w-full py-3 rounded-lg font-bold text-lg shadow-lg transition-all flex items-center justify-center
                        ${isGenerating
                            ? 'bg-indigo-800 cursor-wait opacity-75'
                            : 'bg-white text-indigo-600 hover:bg-indigo-50'}
                    `}
                >
                    {isGenerating ? (
                        <>
                            <Loader className="animate-spin mr-2" />
                            Gerando Horário...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2" />
                            Gerar Horário Agora
                        </>
                    )}
                </button>
            </div>

            {schedule && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Resultado</h3>
                    <div className="p-4 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 mb-4">
                        {schedule.message}
                    </div>

                    {/* Schedule Grid Visualization */}
                    <div className="overflow-x-auto">
                        {schedule.data?.schedule?.map((cls, idx) => (
                            <div key={idx} className="mb-8 border rounded-lg overflow-hidden">
                                <div className="bg-gray-100 px-4 py-2 font-bold text-gray-700 border-b">
                                    Turma: {cls.class}
                                </div>
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2">Dia</th>
                                            <th className="px-4 py-2">Aulas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(cls.days).map(([day, subjects]) => (
                                            <tr key={day} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-4 py-2 font-medium text-gray-900">{day}</td>
                                                <td className="px-4 py-2">
                                                    <div className="flex flex-wrap gap-2">
                                                        {subjects.map((sub, i) => (
                                                            <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs">
                                                                {sub}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleView;

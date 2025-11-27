import React, { useState } from 'react';
import { Upload, Download, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import Papa from 'papaparse';

const CSVImport = ({ onImport }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const downloadTemplate = () => {
        const headers = [
            'Tipo (escola/turma/professor/disciplina)',
            'Nome',
            'Dados Extras (Série/Turno/Matérias/Capacidade)'
        ];

        const rows = [
            ['escola', 'Escola Modelo', 'Manhã;Tarde'],
            ['turma', '6º Ano A', '6º Ano'],
            ['professor', 'João Silva', 'Matemática;Física'],
            ['disciplina', 'Matemática', ''],
            ['sala', 'Sala 101', '30']
        ];

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'modelo_importacao_gera_skills.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setError(null);
        setSuccess(null);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                try {
                    processData(results.data);
                    setSuccess(`Arquivo processado com sucesso! ${results.data.length} registros encontrados.`);
                } catch (err) {
                    setError('Erro ao processar dados: ' + err.message);
                }
            },
            error: (err) => {
                setError('Erro ao ler arquivo CSV: ' + err.message);
            }
        });
    };

    const processData = (data) => {
        const processed = {
            school: null,
            classes: [],
            teachers: [],
            subjects: [],
            rooms: []
        };

        data.forEach((row, index) => {
            const type = row['Tipo (escola/turma/professor/disciplina)']?.toLowerCase().trim();
            const name = row['Nome']?.trim();
            const extra = row['Dados Extras (Série/Turno/Matérias/Capacidade)']?.trim();

            if (!type || !name) return;

            switch (type) {
                case 'escola':
                    const shifts = extra ? extra.split(';').map(s => s.trim().toLowerCase()) : [];
                    processed.school = {
                        name,
                        shifts: {
                            morning: shifts.includes('manhã'),
                            afternoon: shifts.includes('tarde'),
                            night: shifts.includes('noite')
                        }
                    };
                    break;
                case 'turma':
                    processed.classes.push({
                        id: Date.now() + index,
                        name,
                        grade: extra || '',
                        students: 30
                    });
                    break;
                case 'professor':
                    processed.teachers.push({
                        id: Date.now() + index,
                        name,
                        subjects: extra ? extra.split(';').map(s => s.trim()) : [],
                        availability: { mon: true, tue: true, wed: true, thu: true, fri: true }
                    });
                    break;
                case 'disciplina':
                    processed.subjects.push({
                        id: Date.now() + index,
                        name,
                        constraints: []
                    });
                    break;
                case 'sala':
                    processed.rooms.push({
                        id: Date.now() + index,
                        name,
                        capacity: parseInt(extra) || 30,
                        type: 'standard'
                    });
                    break;
            }
        });

        if (onImport) {
            onImport(processed);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                Importar Dados em Massa
            </h2>

            <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-4">
                        Agilize o cadastro importando uma planilha CSV.
                        Baixe o modelo abaixo para ver o formato correto.
                    </p>

                    <button
                        onClick={downloadTemplate}
                        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm mb-6"
                    >
                        <Download className="w-4 h-4 mr-1" />
                        Baixar Modelo CSV
                    </button>

                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold">Clique para enviar</span> ou arraste o arquivo
                            </p>
                            <p className="text-xs text-gray-500">CSV (separado por vírgulas)</p>
                        </div>
                        <input type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
                    </label>
                </div>

                <div className="flex-1 space-y-3">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-start">
                            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{success}</span>
                        </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-500">
                        <p className="font-semibold mb-2">Dicas de Formatação:</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Use ponto e vírgula (;) para separar múltiplos valores (ex: Manhã;Tarde)</li>
                            <li>A coluna "Tipo" deve ser exatamente: escola, turma, professor, disciplina ou sala</li>
                            <li>Certifique-se de salvar como CSV UTF-8</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CSVImport;

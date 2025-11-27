export class AIService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    }

    async generateSchedule(data) {
        const prompt = this.constructPrompt(data);

        try {
            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const result = await response.json();
            return result.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            throw error;
        }
    }

    constructPrompt(data) {
        return `
            Atue como um especialista em horários escolares. Gere um horário escolar otimizado com base nos seguintes dados JSON:
            ${JSON.stringify(data, null, 2)}

            Regras:
            1. Respeite a disponibilidade dos professores.
            2. Não exceda a capacidade das salas.
            3. Distribua as aulas uniformemente.
            4. Retorne APENAS o JSON do horário gerado, sem markdown ou explicações.
            5. O formato de saída deve ser um array de objetos: { "classId": "...", "day": "mon", "period": 1, "subject": "...", "teacher": "...", "room": "..." }
        `;
    }
}

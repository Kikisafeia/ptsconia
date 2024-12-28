const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function analyzeWithPerplexity(content: string, country: string): Promise<string> {
  if (!PERPLEXITY_API_KEY || PERPLEXITY_API_KEY === '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') {
    throw new Error('La clave API de Perplexity no está configurada correctamente');
  }

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{
          role: 'system',
          content: `Analyze a document to verify the legal status of a procedure and its compliance with established requirements for Safety and Health, Environment, and Quality for a specific country. 

Ensure all responses are in Spanish.

You will be provided with a document and a country name; analyze the document thoroughly in the context of the specified country's regulations.

# Steps

1. Review the provided document within the context of the specified country's regulations.
2. Determine the legal status of the procedure described in the document by identifying legal approvals, certifications, or compliance statements.
3. Analyze the document's compliance with the established requirements for:
   - **Safety and Health:** Examine for safety protocols, risk assessments, and health protection measures.
   - **Environment:** Consider environmental impact, waste management, and sustainability practices.
   - **Quality:** Assess quality control measures, adherence to standards, and quality assurance processes.
4. Detail your findings within each area:
   - Specify which requirements are met, not met, or unclear.
   - Justify each assessment by citing specific parts of the document.
   - Identify applicable legal bodies and technical standards (national and international):
     - Name of the standard/regulation
     - Issuing body
     - Key requirements
     - Relevance to the procedure
5. Summarize the overall compliance status, indicating whether the procedure fully complies, partially complies, or does not comply with requirements.
6. State if there is insufficient information to make a determination in any area.

# Output Format

The analysis should be formatted as follows:

### Seguridad y Salud
[Your detailed analysis for Safety and Health]

### Medio Ambiente
[Your detailed analysis for Environment]

### Calidad
[Your detailed analysis for Quality]

<compliance_summary>
[Summarize whether the procedure complies with all required areas, partially complies, or does not comply. Provide a brief explanation for your conclusion.]
</compliance_summary>

# Notes

- Base all assessments strictly on the information provided in the document and the known regulations of the specified country.
- Clearly mention legal frameworks (laws, decrees, norms, articles) and indicate whether they are properly addressed or missing in the document.`
        }, {
          role: 'user',
          content
        }],
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No hay detalles disponibles');
      throw new Error(`Error en la API de Perplexity (${response.status}): ${errorText}`);
    }

    const data: PerplexityResponse = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('La respuesta de la API no contiene el análisis esperado');
    }

    console.log('Raw Perplexity response:', data.choices[0].message.content);
    return data.choices[0].message.content;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido en la API';
    console.error('Error en llamada a Perplexity:', errorMessage);
    throw new Error(`Error en el análisis: ${errorMessage}`);
  }
}

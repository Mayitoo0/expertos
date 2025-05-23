// Función modificada con mejor manejo de errores
async function fetchExpertResponse(expertType, question) {
    const chat = document.getElementById('chat-container');
    
    try {
        // Mostrar "Cargando..." mientras espera respuesta
        const loadingMsg = document.createElement('div');
        loadingMsg.textContent = `Consultando al ${expertType}...`;
        chat.appendChild(loadingMsg);

       const response = await fetch(`/api/debate/${expertType}`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('apiKey') || 'AIzaSyDZ7Gexgr8gGPvZugciZI6dJTiOw_PHjBE'}` // Usa tu API_KEY
  },
  body: JSON.stringify({ 
    prompt: question || "¿Qué opinas sobre este tema?" 
  })
});
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        chat.removeChild(loadingMsg); // Eliminar mensaje de carga
        displayResponse(expertType, data.generatedResponse);
        
    } catch (error) {
        console.error("Error al obtener respuesta:", error);
        const errorMsg = document.createElement('div');
        errorMsg.style.color = 'red';
        errorMsg.textContent = `Error al consultar al ${expertType}: ${error.message}`;
        chat.appendChild(errorMsg);
    }
}
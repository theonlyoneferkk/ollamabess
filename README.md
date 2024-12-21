# Introduzione
Sì, è esattamente quello che sembra: un'interfaccia web poco stilizzata che sfrutta Ollama per funzionare. :)

# Dipendenze
Per utilizzare questo progetto, assicurati di avere installato:

- [Ollama](https://ollama.com)
- [Node.js](https://nodejs.org)

# Istruzioni
Qui trovi i comandi necessari per configurare il server.

1. Modifica il file `index.js` e imposta l'attributo `model` con il modello LLM che desideri utilizzare, ad esempio:  
`model: "llama3.2"`

2. Esegui i seguenti comandi nel terminale per avviare il server:

   ```bash
   ollama serve
   npm install
   node index.js
   ```

3. Infine, apri il file `index.html` con il tuo browser preferito per interagire con l'interfaccia.

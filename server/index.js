import express from "express";
import cors from "cors";
import { exec } from "child_process";
const app = express();
const port = 5003;
const ai_model = "llama3.2"; //!
app.use(cors());

exec("ollama serve", (error, stdout, stderr) => {
	if (error) {
		console.error(`Errore durante l'avvio di Ollama: ${error}`);
		return;
	}
	console.log("Server Ollama avviato");
});
app.get("/fetchMex", async (req, res) => {
	if (!req.query.prompt) {
		res.send("Errore, prompt non valido");
		return;
	}

	let correctReply = false;
	await fetch("http://127.0.0.1:11434/api/generate", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			model: ai_model,
			prompt: req.query.prompt,
		}),
	})
		.then((r) => r.text())
		.then((data) => {
			let risposta = data
				.split("\n")
				.filter((line) => line.trim())
				.map((line) => {
					try {
						const json = JSON.parse(line);
						return json.response;
					} catch (error) {
						return "";
					}
				})
				.join("");
			correctReply = true;
			res.send(risposta);
		})
		.catch((error) => console.error("Error:", error));
	if (!correctReply) {
		res.send("Si è verificato un errore nel server");
	}
});

app.listen(port, () => {
	console.log("Server Node in ascolto su porta " + port);
});

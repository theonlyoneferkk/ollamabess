import express from "express";
import cors from "cors";
const app = express();
const port = 5003;
app.use(cors());

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
			model: "llama3.2",
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

<script setup>
import { ref } from "vue";
import { Converter } from "showdown";
console.clear();

let ai_res = ref("");

const port = 5003;
const endpoint = "http://localhost:" + port + "/fetchMex?";
const fetchMex = () => {
	fetch(
		endpoint +
			new URLSearchParams({
				prompt: document.getElementById("prompt").value,
			})
	)
		.then((r) => r.text())
		.then((testo) => {
			console.log(testo);
			let c = new Converter();
			let res_hist = ai_res.value;
			ai_res.value =
				"<div class='ai-reply'>" +
				c.makeHtml(testo) +
				"</div>" +
				res_hist;
		})
		.catch((error) => console.error("Error:", error));
};
</script>

<template>
	<main>
		<h1>Come posso aiutarti?</h1>
		<div id="prompt-wrapper">
			<textarea name="" id="prompt"></textarea>
			<button id="prompt-send" @click="fetchMex">Invia</button>
		</div>
		<div v-html="ai_res"></div>
	</main>
</template>

<style>
.ai-reply {
	border: 1px solid red;
	margin-top: 1rem;
	padding: 1rem;
	text-align: justify;
}
</style>
<style scoped>
main {
	position: absolute;
	inset: 0;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
#prompt-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	margin-bottom: 1rem;
}
#prompt-send {
	border: 0;
	border-radius: 16px;
	background-color: white;
	margin-left: 1rem;
	padding: 1rem;
	font-size: larger;
	transition: all 150ms ease-in-out;
}
#prompt-send:active {
	background-color: wheat;
}
#prompt {
	height: 10rem;
	width: 40rem;
	padding: 1rem;
	border: 0;
	border-radius: 8px;
	font-family: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica,
		Apple Color Emoji, Arial, sans-serif, Segoe UI Emoji, Segoe UI Symbol;
	font-size: large;
	outline: none;
	resize: none;
	transition: all 150ms ease-in-out;
}
#prompt:active,
#prompt:focus {
	outline: 4px solid wheat;
}
</style>

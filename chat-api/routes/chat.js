import { Router } from 'express';
import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router();

// Substitua 'seu_access_key_id' e 'sua_secret_access_key' pelas suas credenciais reais
const client = new BedrockRuntimeClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
});

const modelId = "ai21.j2-mid-v1";

router.post('/', async (req, res) => {
    const { message } = req.body;

    console.log('Mensagem recebida do usuário:', message);

    const conversation = [
        {
            role: "user",
            content: [{ text: message }],
        },
    ];

    const command = new ConverseCommand({
        modelId,
        messages: conversation,
        inferenceConfig: { maxTokens: 500, temperature: 0, topP: 1, stopSequences: [], countPenalty: { scale: 0 }, presencePenalty: { scale: 0 }, frequencyPenalty: { scale: 0 } },
    });

    try {
        const response = await client.send(command);
        const responseText = response.output.message.content[0].text;
        console.log('Resposta do Jurassic-2:', responseText);
        res.json({ message: responseText });
    } catch (err) {
        console.error('Erro ao enviar mensagem para o Jurassic-2:', err);
        res.status(500).send(err);
    }
});

export default router;

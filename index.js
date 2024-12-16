import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "", // Buraya API anahtarını ekle
});

// Çevirmek istediğin metni buraya yaz
const textToConvert = " İşte buraya dönüştürülmesini istediğiniz metni yazın";

// Ses dosyasının kaydedileceği yol
const speechFile = path.resolve("./speech2.mp3");

//Dikkatli ol -  Her 1000 karakter 1,5 cent
async function main() {
    try {
        const mp3 = await openai.audio.speech.create({
            model: "tts-1-hd", // Text-to-speech model
            voice: "shimmer", // Ses tonu (isteğe göre değiştirilebilir)
            input: textToConvert, // Çevrilecek metin
        });

        // Ses dosyasını oluştur ve kaydet
        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(speechFile, buffer);

        console.log(`Ses dosyası başarıyla oluşturuldu: ${speechFile}`);
    } catch (error) {
        console.error("Bir hata oluştu:", error);
    }
}

main();

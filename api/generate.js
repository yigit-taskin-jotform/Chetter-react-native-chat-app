// OpenAI'nin Configuration ve OpenAIApi sınıflarını import et
import { Configuration, OpenAIApi } from "openai";

// OpenAI için yapılandırmayı sağlayan bir nesne oluştur
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,  // OpenAI API anahtarını kullanarak yapılandırmayı ayarla
});
// OpenAIApi sınıfını kullanarak bir OpenAI nesnesi oluştur
const openai = new OpenAIApi(configuration);

// HTTP talebine karşılık olarak çalışacak olan ana işlevi oluştur
export default async function (req, res) {
    // Eğer API anahtarı yapılandırılmamışsa hata döndür
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    // Gelen HTTP talebinin içinden 'animal' adlı bir parametre al
    const animal = req.body.animal || '';
    // Eğer 'animal' parametresi boşsa kullanıcıya hata mesajı döndür
    if (animal.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please send something",
            }
        });
        return;
    }

    try {
        // OpenAI API'sini kullanarak bir tamamlama yap
        const completion = await openai.createCompletion({
            model: "text-davinci-003",  // Kullanılacak modeli belirle
            prompt: generatePrompt(animal),  // OpenAI'ye gönderilecek prompt'u oluştur
            temperature: 0.6,  // Temperatür değerini belirle
        });
        // Başarıyla tamamlama yapıldığında, tamamlanan metni kullanıcıya gönder
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch (error) {
        // Hata durumunda uygun hata mesajını ve durumu kullanıcıya gönder
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

// OpenAI'ye gönderilecek olan prompt'u oluşturan yardımcı fonksiyon
function generatePrompt(animal) {
    // İlk harfi büyük yapmak için
    const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    // OpenAI'ye gönderilecek prompt'u oluştur
    return `Suggest three names for an animal that is a superhero.
  
  Animal: Cat
  Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
  Animal: Dog
  Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
  Animal: ${capitalizedAnimal}
  Names:`;
}

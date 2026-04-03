// ✅ الجواب الصحيح (٣ = الخيار رقم 1)
const correctAnswer = 1;

// ✅ دالة فحص الإجابة
async function check(choice) {
  const result = document.getElementById("result");
  const geminiBox = document.getElementById("gemini");

  if (choice === correctAnswer) {
    result.textContent = "✅ إجابة صحيحة!";
    result.style.color = "green";
    await askGemini("الطالب أجاب بشكل صحيح على ٢ + ١ = ٣. شجعه بكلمات بسيطة ولطيفة لطفل صف أول.");
  } else {
    result.textContent = "❌ حاول مرة أخرى";
    result.style.color = "red";
    await askGemini("الطالب أخطأ في ٢ + ١. شجعه بلطف دون توبيخ واطلب المحاولة مرة أخرى.");
  }
}

// ✅ استدعاء Gemini للتشجيع فقط
async function askGemini(promptText) {
  const geminiBox = document.getElementById("gemini");
  geminiBox.textContent = "🤖 ...";

  // ❗ ضع مفتاح Gemini هنا فقط
  const API_KEY = "AIzaSyCA6OpfGaUqzL-fpt_IOI1WbstyXcgLJ5k";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    "التزم بما يلي:\n" +
                    "- كلمات قصيرة\n" +
                    "- تشجيع لطيف\n" +
                    "- لا توبيخ\n" +
                    "- لا شرح طويل\n\n" +
                    promptText
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    geminiBox.textContent =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "🌱 أحسنت!";
  } catch (error) {
    geminiBox.textContent = "🌱 أحسنت!";
  }
}

/* =====================================
   Math Game - Grade 1
   app.js
   ===================================== */

/* ===== عناصر الصفحة ===== */
const resultEl = document.getElementById("result");
const geminiEl = document.getElementById("gemini");

/* ===== عرض نتيجة الإجابة ===== */
function showResult(isCorrect) {
  if (isCorrect) {
    resultEl.textContent = "✅ أحسنت!";
    resultEl.style.color = "green";
  } else {
    resultEl.textContent = "❌ حاول مرة أخرى";
    resultEl.style.color = "red";
  }
}

/* ===== التواصل مع Gemini (إن وُجد الخادم) ===== */
async function askGemini(prompt) {
  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.answer || null;
  } catch (error) {
    // في حال عدم وجود خادم أو انقطاع الاتصال
    return null;
  }
}

/* ===== التحقق من الإجابة =====
   x = 1  → صحيحة
   x ≠ 1 → خاطئة
*/
async function check(x) {
  const isCorrect = x === 1;

  showResult(isCorrect);

  // تفريغ تعليق Gemini السابق
  if (geminiEl) geminiEl.textContent = "";

  // 👶 تعليق لطيف (اختياري وآمن)
  let prompt;

  if (isCorrect) {
    prompt =
      "شجع طفلًا عمره 6 سنوات بجملة قصيرة ولطيفة لأنه أجاب إجابة صحيحة في مسألة جمع بسيطة.";
  } else {
    prompt =
      "شجع طفلًا عمره 6 سنوات بلطف وهدوء عندما يخطئ في مسألة جمع، بدون ذكر الخطأ بالتفصيل.";
  }

  const geminiMessage = await askGemini(prompt);

  // عرض تعليق Gemini فقط إن وُجد
  if (geminiMessage && geminiEl) {
    geminiEl.textContent = geminiMessage;
    geminiEl.style.color = "#444";
  }
}
``

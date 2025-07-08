const shareBtn = document.getElementById("whatsappBtn");
const shareCounter = document.getElementById("shareCounter");
const shareStatus = document.getElementById("shareStatus");
const form = document.getElementById("registrationForm");
const finalMsg = document.getElementById("finalMessage");
const submitBtn = document.getElementById("submitBtn");

let clicks = 0;
const maxClicks = 5;

// Check localStorage for submission
if (localStorage.getItem("submitted")) {
  disableForm();
  finalMsg.classList.remove("hidden");
  finalMsg.textContent = "🎉 Your submission has already been recorded. Thanks for joining!";
}

shareBtn.addEventListener("click", () => {
  if (clicks >= maxClicks) return;

  const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community 💖");
  const whatsappUrl = `https://wa.me/?text=${message}`;
  window.open(whatsappUrl, "_blank");

  clicks++;
  shareCounter.textContent = `Click count: ${clicks}/${maxClicks}`;

  if (clicks === maxClicks) {
    shareStatus.textContent = "✅ Sharing complete! You may now register.";
    shareBtn.disabled = true;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clicks < maxClicks) {
    alert("Please complete WhatsApp sharing before submitting.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const college = document.getElementById("college").value.trim();
  const screenshot = document.getElementById("screenshot").files[0];

  if (!screenshot) {
    alert("Upload required screenshot file.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", screenshot);

  try {
    const response = await fetch("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL", {
      method: "POST",
      body: formData,
    });

    const result = await response.text();

    if (result.includes("Success")) {
      localStorage.setItem("submitted", "true");
      disableForm();
      finalMsg.classList.remove("hidden");
      finalMsg.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("There was a problem submitting your registration. Try again later.");
  }
});

function disableForm() {
  form.querySelectorAll("input, button").forEach(el => el.disabled = true);
}

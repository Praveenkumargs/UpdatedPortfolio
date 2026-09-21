const menu = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");

if (menu) {
  menu.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });
}

document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("mobile-open"));
});

// Google Sheets contact form
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

const GOOGLE_SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwucLrmNRaM9a9DM2h-ogZWY10_oa0A3J9D7oXso0LOUWaUizA97chzK25ZIk8bkQKtpA/exec";

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      message: formData.get("message")
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";
    formStatus.textContent = "Sending your message...";
    formStatus.className = "form-status sending";

    try {
      await fetch(GOOGLE_SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      contactForm.reset();
      formStatus.textContent =
        "Message sent successfully. Thank you for reaching out!";
      formStatus.className = "form-status success";
    } catch (error) {
      console.error(error);
      formStatus.textContent =
        "Something went wrong. Please try again or contact me directly.";
      formStatus.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send message <span>↗</span>';
    }
  });
}

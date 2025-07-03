 
    function showOptions() {
      const box = document.getElementById("domainOptions");
      box.classList.toggle("active");
    }

    function searchDomain() {
      window.open("Result.html", "_blank");
    }
/*
const apiKey = "YOUR_ABSTRACT_API_KEY";  // Replace with your key

async function searchDomain() {
  const domainInput = document.getElementById("domainInput").value.trim();
  const resultBox = document.getElementById("result");
  const altBox = document.getElementById("alternatives");

  if (!domainInput) {
    resultBox.innerHTML = "❗ Please enter a domain name.";
    altBox.innerHTML = "";
    return;
  }

  resultBox.innerHTML = "🔍 Checking availability...";
  altBox.innerHTML = "";

  try {
    const res = await fetch(`https://whois.abstractapi.com/v1/?api_key=${apiKey}&domain=${domainInput}`);
    const data = await res.json();

    if (data.domain_status === "available") {
      resultBox.innerHTML = `✅ Great news! <strong>${domainInput}</strong> is available!`;
    } else {
      resultBox.innerHTML = `❌ Sorry, <strong>${domainInput}</strong> is already taken.`;

      // Suggest alternatives
      const base = domainInput.split(".")[0];
      const suggestions = [".net", ".in", ".org", ".co", ".info"];
      let html = "<br><strong>Try alternatives:</strong><ul>";

      suggestions.forEach(ext => {
        html += `<li>${base}${ext}</li>`;
      });

      html += "</ul>";
      altBox.innerHTML = html;
    }
  } catch (err) {
    console.error(err);
    resultBox.innerHTML = "❌ Error checking domain. Try again.";
  }
}

*/
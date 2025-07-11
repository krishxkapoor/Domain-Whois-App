function showOptions() {
  const box = document.getElementById("domainOptions");
  box.classList.toggle("active");
}

function showError(message) {
  const modal = document.getElementById("error-modal");
  const text = document.getElementById("error-text");
  const closeBtn = document.getElementById("error-close-btn");

  text.textContent = message;
  modal.hidden = false;

  closeBtn.onclick = () => {
    modal.hidden = true;
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.hidden = true;
    }
  };
}

function searchDomain() {
  const input = document.getElementById("domainInput");
  const domain = input.value.trim().toLowerCase();

  if (!domain) {
    showError("Please enter a domain.");
    return;
  }

  const pattern = /^[a-z0-9-]+\.(com|net|org|in|co|edu|io|ai|dev|xyz|gov)$/i;
  if (!pattern.test(domain)) {
    showError("Enter a valid domain with one of these TLDs: .com, .net, .org, .in, .io, .ai, etc.");
    return;
  }

  window.location.href = `result.html?domain=${encodeURIComponent(domain)}`;
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function fetchDomainStatus(domain) {
  const url = `https://domainr.p.rapidapi.com/v2/status?domain=${encodeURIComponent(domain)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9623a25903mshab304f78713f032p10930djsn6ae4371fd164',
      'X-RapidAPI-Host': 'domainr.p.rapidapi.com'
    }
  });

  if (!response.ok) throw new Error(`HTTP error ${response.status}`);
  const data = await response.json();
  return data.status[0]?.status;
}

window.onload = async function () {
  const resultDiv = document.getElementById("result");
  const domain = getQueryParam("domain");

  if (domain && resultDiv) {
    resultDiv.innerHTML = `<p>🔍 Checking availability for <strong>${domain}</strong>...</p>`;

    try {
      const status = await fetchDomainStatus(domain);

      if (status.includes("inactive") || status.includes("undelegated") || status.includes("available")) {
        resultDiv.innerHTML = `<h3 style="color:green;">✅ ${domain} is available!</h3>`;
      } else {
        resultDiv.innerHTML = `<h3 style="color:red;">❌ ${domain} is already taken.</h3>`;
      }
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = `<p style="color:orange;">⚠️ Error fetching data: ${error.message}</p>`;
    }
  }
};

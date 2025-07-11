function showOptions() {
  const box = document.getElementById("domainOptions");
  box.classList.toggle("active");
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function showValidationMessage(message) {
  const msgDiv = document.getElementById("validationMessage");
  if (!msgDiv) return;
  msgDiv.textContent = message;
  msgDiv.style.display = "block";
  setTimeout(() => {
    msgDiv.style.display = "none";
  }, 3500);
}

const allowedExtensions = [".com", ".net", ".org", ".edu", ".in", ".co", ".io", ".gov", ".info"];

function isValidDomain(domain) {
  domain = domain.toLowerCase();

  const validChars = /^[a-z0-9.-]+$/;
  if (!validChars.test(domain)) return false;

  return allowedExtensions.some(ext => domain.endsWith(ext));
}

function searchDomain() {
  const domainInput = document.getElementById("domainInput");
  const domain = domainInput.value.trim();

  if (!isValidDomain(domain)) {
    showValidationMessage(
      `Please enter a valid domain ending with: ${allowedExtensions.join(", ")}`
    );
    return false;
  }

  window.location.href = `result.html?domain=${encodeURIComponent(domain)}`;
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

window.onload = async function () {
  const resultDiv = document.getElementById("result");
  if (!resultDiv) return;

  let domain = getQueryParam("domain");
  if (!domain) {
    resultDiv.innerHTML = `<p style="color:#ff5252;">❌ No domain specified.</p>`;
    return;
  }

  domain = domain.trim().replace(/^www\./i, "");
  resultDiv.innerHTML = `<p>🔍 Checking availability for <strong>${domain}</strong>...</p>`;

  try {
    const response = await fetchWithTimeout(
      `https://api.domainsdb.info/v1/domains/search?domain=${encodeURIComponent(domain)}`,
      { timeout: 15000 }
    );

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const data = await response.json();

    const isTaken =
      data.domains &&
      data.domains.some(
        (d) => d.domain.toLowerCase() === domain.toLowerCase()
      );

    if (isTaken) {
      resultDiv.innerHTML = `<h3 style="color:#ff5252;">❌ The domain <strong>${domain}</strong> is already taken.</h3>`;
    } else {
      resultDiv.innerHTML = `<h3 style="color:#4caf50;">✅ The domain <strong>${domain}</strong> is available!</h3>`;
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p style="color:#ffa726;">⚠️ Could not fetch domain info: ${error.message}</p>`;
  }
};

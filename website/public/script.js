// Tool switching
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        
        // Update active button
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding tool section
        document.querySelectorAll('.tool-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${tool}-tools`).classList.add('active');
    });
});

// JSON Tools
async function beautifyJSON() {
    const input = document.getElementById('json-input').value;
    if (!input.trim()) return;
    
    try {
        const response = await fetch('/api/json/beautify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ json: input })
        });
        
        const data = await response.json();
        if (data.error) {
            document.getElementById('json-output').value = `Error: ${data.error}`;
        } else {
            document.getElementById('json-output').value = data.result;
        }
    } catch (error) {
        document.getElementById('json-output').value = `Error: ${error.message}`;
    }
}

async function minifyJSON() {
    const input = document.getElementById('json-input').value;
    if (!input.trim()) return;
    
    try {
        const response = await fetch('/api/json/minify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ json: input })
        });
        
        const data = await response.json();
        if (data.error) {
            document.getElementById('json-output').value = `Error: ${data.error}`;
        } else {
            document.getElementById('json-output').value = data.result;
        }
    } catch (error) {
        document.getElementById('json-output').value = `Error: ${error.message}`;
    }
}

function clearJSON() {
    document.getElementById('json-input').value = '';
    document.getElementById('json-output').value = '';
}

// Text Tools
function toUpperCase() {
    const input = document.getElementById('text-input').value;
    document.getElementById('text-output').value = input.toUpperCase();
}

function toLowerCase() {
    const input = document.getElementById('text-input').value;
    document.getElementById('text-output').value = input.toLowerCase();
}

function countWords() {
    const input = document.getElementById('text-input').value;
    const words = input.trim().split(/\s+/).filter(word => word.length > 0);
    const chars = input.length;
    const charsNoSpaces = input.replace(/\s/g, '').length;
    
    document.getElementById('text-output').value = 
        `Words: ${words.length}\nCharacters: ${chars}\nCharacters (no spaces): ${charsNoSpaces}`;
}

// URL Tools
function encodeURL() {
    const input = document.getElementById('url-input').value;
    document.getElementById('url-output').value = encodeURIComponent(input);
}

function decodeURL() {
    const input = document.getElementById('url-input').value;
    try {
        document.getElementById('url-output').value = decodeURIComponent(input);
    } catch (error) {
        document.getElementById('url-output').value = `Error: Invalid URL encoding`;
    }
}
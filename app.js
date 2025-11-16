const canvas = document.getElementById('dnaCanvas');
const ctx = canvas.getContext('2d');
let dnaSequence = '';
let animationFrame;
let offset = 0;

const baseColors = {
  'A': '#ff3366',  // Red
  'T': '#00ff66',  // Green
  'C': '#3366ff',  // Blue
  'G': '#ffff00'   // Yellow
};

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

// Initialize canvas
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function textToBinary(text) {
  return text.split('').map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join('');
}

function binaryToDNA(binary) {
  const mapping = {
    '00': 'A',
    '01': 'T',
    '10': 'C',
    '11': 'G'
  };

  let dna = '';
  for (let i = 0; i < binary.length; i += 2) {
    const pair = binary.substr(i, 2);
    dna += mapping[pair] || '';
  }
  return dna;
}

function dnaToBinary(dna) {
  const mapping = {
    'A': '00',
    'T': '01',
    'C': '10',
    'G': '11'
  };

  return dna.split('').map(base => mapping[base] || '').join('');
}

function binaryToText(binary) {
  let text = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.substr(i, 8);
    if (byte.length === 8) {
      text += String.fromCharCode(parseInt(byte, 2));
    }
  }
  return text;
}

function encodeMessage() {
  const messageInput = document.getElementById('messageInput');
  const dnaOutput = document.getElementById('dnaOutput');
  const decodedOutput = document.getElementById('decodedOutput');

  const message = messageInput.value.trim();

  if (!message) {
    dnaOutput.textContent = 'Please enter a message to encode!';
    dnaOutput.style.color = '#ff3366';
    return;
  }

  const binary = textToBinary(message);
  dnaSequence = binaryToDNA(binary);

  dnaOutput.style.opacity = '0';
  setTimeout(() => {
    dnaOutput.textContent = dnaSequence;
    dnaOutput.style.color = '#00ffff';
    dnaOutput.style.transition = 'opacity 0.5s ease';
    dnaOutput.style.opacity = '1';
  }, 100);

  // Hide decoded message
  decodedOutput.style.display = 'none';

  // Start visualization
  startVisualization();
}

function decodeMessage() {
  const decodedOutput = document.getElementById('decodedOutput');

  if (!dnaSequence) {
    decodedOutput.textContent = 'Please encode a message first!';
    decodedOutput.style.color = '#ff3366';
    decodedOutput.style.display = 'block';
    return;
  }

  const binary = dnaToBinary(dnaSequence);
  const decodedMessage = binaryToText(binary);

  // Display decoded message with fade-in animation
  decodedOutput.style.opacity = '0';
  decodedOutput.style.display = 'block';
  setTimeout(() => {
    decodedOutput.textContent = `Decoded: "${decodedMessage}"`;
    decodedOutput.style.color = '#00ff88';
    decodedOutput.style.transition = 'opacity 0.5s ease';
    decodedOutput.style.opacity = '1';
  }, 100);
}

function downloadDNA() {
  if (!dnaSequence) {
    alert('Please encode a message first!');
    return;
  }

  const blob = new Blob([dnaSequence], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dna_code.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==================== DNA VISUALIZATION ====================
function startVisualization() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
  offset = 0;
  animate();
}
function animate() {
    ctx.fillStyle = 'rgba(5, 5, 15, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!dnaSequence) {
        animationFrame = requestAnimationFrame(animate);
        return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const amplitude = canvas.height / 4;
    const spacing = 20;
    const baseRadius = 6;
    const frequency = 0.15;
    const strandOffset = Math.PI / 1.5; // phase shift between strands

    // Draw DNA double helix
    for (let i = 0; i < dnaSequence.length; i++) {
        const base = dnaSequence[i];
        const angle = i * frequency + offset * 0.02;

        // Two opposite strands (left/right)
        const x1 = centerX + Math.sin(angle) * amplitude;
        const x2 = centerX + Math.sin(angle + strandOffset) * amplitude;
        const y = (i * spacing + offset) % (canvas.height + dnaSequence.length * spacing);

        // Wrap-around (so DNA appears continuous)
        const yPos = (y > canvas.height + spacing) ? y - (dnaSequence.length * spacing) : y;

        // Base pair complement (A↔T, C↔G)
        let complement;
        if (base === 'A') complement = 'T';
        else if (base === 'T') complement = 'A';
        else if (base === 'C') complement = 'G';
        else if (base === 'G') complement = 'C';

        // Colors
        const color1 = baseColors[base] || '#ffffff';
        const color2 = baseColors[complement] || '#ffffff';

        // Connect strands (hydrogen bond)
        ctx.strokeStyle = '#ffffff22';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, yPos);
        ctx.lineTo(x2, yPos);
        ctx.stroke();

        // Draw base circles
        [ [x1, color1, base], [x2, color2, complement] ].forEach(([x, color, letter]) => {
            const gradient = ctx.createRadialGradient(x, yPos, 0, x, yPos, baseRadius * 3);
            gradient.addColorStop(0, color);
            gradient.addColorStop(0.5, color + '44');
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, yPos, baseRadius * 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, yPos, baseRadius, 0, Math.PI * 2);
            ctx.fill();

            // Base text
            ctx.fillStyle = '#000';
            ctx.font = 'bold 10px Orbitron';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(letter, x, yPos);
        });
    }

    // Animate scroll upward
    offset += 1;
    if (offset > dnaSequence.length * spacing) offset = 0;

    animationFrame = requestAnimationFrame(animate);
}

animate();

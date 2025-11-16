# Message in DNA — Encode Your Words into Life’s Language  

> “Every message can live forever, if written in DNA.” — **Jay Bhoi**

---

## Overview  

**Message in DNA** is an interactive web-based project that blends **biology, computer science, and neon cyberpunk design**.  
It allows users to encode any text message into a **DNA sequence** (A, T, C, G) using binary-to-base mapping — similar to how information is stored inside living cells.

The DNA is then displayed in two ways:
- As text  
- As a **beautiful animated double-helix visualization** using the Canvas API  

This project is a futuristic fusion of **science + art + coding**.

---

## Concept  

DNA can theoretically store **215 petabytes** of data per gram.  
Inspired by that, this project simulates how digital information can be mapped into DNA form.

### Encoding Steps  
1. Convert each character → ASCII  
2. Convert ASCII → 8-bit binary  
3. Split binary into **2-bit chunks**  
4. Map each chunk → DNA base using the table:

| Binary | DNA Base |
|--------|----------|
| 00     | A        |
| 01     | T        |
| 10     | G        |
| 11     | C        |

The encoded DNA is then animated as a **glowing, moving double helix**.

---

## Features  

-  Encode any text into a DNA sequence  
-  Decode DNA back to original text  
-  Download DNA sequence as `.txt`  
-  Neon cyberpunk UI with glow effects  
-  Animated **double helix** using Canvas  
-  Fully responsive design  
-  Built with *pure HTML, CSS, and JavaScript*  

---

##  Tech Stack  

| Tech | Purpose |
|------|---------|
| **HTML5** | Structure & layout |
| **CSS3** | Neon cyberpunk styling |
| **JavaScript** | Encoding & animation |
| **Canvas API** | DNA visualization |
| **Google Fonts** | Orbitron & Rajdhani |

---

##  Project Structure  
```
message-in-dna/
│
├── index.html # Main HTML file
├── style.css # Neon UI + layout
└── script.js # Encoding logic & helix animation
```

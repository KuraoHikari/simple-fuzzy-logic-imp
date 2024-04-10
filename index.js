// Fungsi keanggotaan fuzzy
function fuzzyMembership(value, low, mid, high) {
  if (value <= low || value >= high) return 0;
  else if (value === mid) return 1;
  else if (value > low && value < mid) return (value - low) / (mid - low);
  else return (high - value) / (high - mid);
}

// Menghitung derajat keanggotaan untuk setiap warna
function getColorMembership(color) {
  return {
    low: fuzzyMembership(color, 0, 85, 170),
    medium: fuzzyMembership(color, 85, 170, 255),
    high: fuzzyMembership(color, 170, 255, 255),
  };
}

// Aturan fuzzy sederhana
function fuzzyRule(red, green, blue) {
  if (red.high > 0 && green.low > 0 && blue.low > 0) {
    return 'High';
  } else if (red.medium > 0 && green.medium > 0 && blue.medium > 0) {
    return 'Medium';
  } else if (red.low > 0 && green.low > 0 && blue.high > 0) {
    return 'Low';
  } else {
    return 'None';
  }
}

// Defuzzifikasi dengan metode centroid (ilustratif)
function defuzzify(value) {
  // Ini adalah fungsi placeholder, dalam praktik nyata, Anda perlu menghitung pusat area di bawah kurva
  if (value === 'High') return 80;
  if (value === 'Medium') return 50;
  if (value === 'Low') return 20;
  return 0;
}

// Fungsi utama untuk menentukan kecocokan warna
function determineColorMatch(r, g, b) {
  const redMembership = getColorMembership(r);
  const greenMembership = getColorMembership(g);
  const blueMembership = getColorMembership(b);

  const ruleResult = fuzzyRule(redMembership, greenMembership, blueMembership);
  const matchValue = defuzzify(ruleResult);
  
  return matchValue;
}

// Test case 1: Semua nilai warna rendah
console.log(determineColorMatch(0, 0, 0)); // Expected output: 0

// Test case 3: Nilai warna merah tinggi, hijau dan biru rendah
console.log(determineColorMatch(200, 50, 50)); // Expected output: 80

// Test case 4: Nilai warna merah, hijau, dan biru sedang
console.log(determineColorMatch(150, 150, 150)); // Expected output: 50

// Test case 5: Nilai warna merah rendah, hijau rendah, biru tinggi
console.log(determineColorMatch(50, 50, 200)); // 20
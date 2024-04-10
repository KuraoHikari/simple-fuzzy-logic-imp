# simple-fuzzy-logic-imp

# LOGIKA FUZZY

Logika fuzzy adalah cabang matematika yang menggunakan komputer untuk memodelkan dunia nyata dengan cara yang sama seperti yang dilakukan manusia. Hal ini memudahkan dalam merumuskan masalah dengan presisi tinggi dan solusi yang akurat. Metode tersebut didasarkan pada hukum-hukum yang mengendalikan sistem dengan menggunakan model matematika. Logika fuzzy pertama kali dikemukakan oleh Lotfi A. Zadeh pada tahun 1965 melalui karyanya tentang teori himpunan fuzzy. Diterapkan pada banyak produk elektronik buatan Jepang, seperti mesin cuci dan AC. Alasan mengapa logika fuzzy lebih populer di Jepang adalah karena budaya. Budaya Barat seringkali hanya mengenal hal-hal tertentu saja, misalnya "ya" dan "tidak". Sedangkan budaya Timur, termasuk Jepang, seringkali menerima hal-hal yang bersifat abu-abu atau tidak pasti. Logika fuzzy ini juga terbilang mudah dipahami dan fleksibel.

## Sifat-sifat Logika Fuzzy
- Uncertainly
- Imprecise
- Noisy
- Significance

## Konsep Dasar Logika Fuzzy
- Variable fuzzy
- Fuzzy Sets
- Fungsi keanggotaan
- Aturan fuzzy
- Pengambilan Keputusan

## Contoh Aplikasi
Penerapan logika fuzzy untuk menentukan kecocokan warna pada suatu sistem RGB (Red, Green, Blue):

### 1. Mendefinisikan Variabel Input dan Output
Variabel input adalah intensitas dari komponen warna Red, Green, dan Blue (masing-masing dalam rentang 0-255). Variabel output adalah tingkat kecocokan warna, yang bisa kita definisikan dalam rentang 0-100, dimana 0 berarti tidak cocok sama sekali, dan 100 berarti cocok sempurna.

### 2. Membuat Fungsi Keanggotaan
Fungsi keanggotaan digunakan untuk mengubah input crisp (nilai pasti) menjadi nilai fuzzy. Contoh fungsi keanggotaan untuk Red, Green, dan Blue:
- Red: Low (0-85), Medium (85-170), High (170-255)
- Green: Low (0-85), Medium (85-170), High (170-255)
- Blue: Low (0-85), Medium (85-170), High (170-255)

### 3. Membuat Aturan Fuzzy
Aturan fuzzy menentukan bagaimana kombinasi dari nilai-nilai fuzzy ini menghasilkan output. Contoh aturan sederhana:
- Jika Red adalah High dan Green adalah Low dan Blue adalah Low maka Kecocokan adalah Tinggi.
- Jika Red adalah Medium dan Green adalah Medium dan Blue adalah Medium maka Kecocokan adalah Sedang.
- Jika Red adalah Low dan Green adalah Low dan Blue adalah High maka Kecocokan adalah Rendah.

### 4. Aplikasi Aturan Fuzzy
Dengan input warna nilai RGB (200, 50, 50), kita mengubah nilai ini menjadi nilai fuzzy menggunakan fungsi keanggotaan yang telah ditentukan:
- Red: High (karena 200 dekat dengan 255)
- Green: Low (karena 50 dekat dengan 0)
- Blue: Low (karena 50 dekat dengan 0)

Kemudian, kita terapkan aturan yang relevan. Dalam kasus ini, aturan pertama akan terpilih.

### 5. Defuzzifikasi
Proses mengubah nilai fuzzy kembali menjadi nilai crisp untuk menentukan output. Metode yang umum digunakan adalah metode centroid.

### 6. Pengambilan Keputusan
Dari proses defuzzifikasi, kita akan mendapatkan nilai crisp yang menunjukkan tingkat kecocokan.

### 7. Contoh Pengambilan Keputusan Fuzzy
Dengan penggunaan aturan fuzzy dan proses defuzzifikasi, kita dapatkan nilai kecocokan, misalnya 80 dari 100. Berdasarkan nilai ini, kita bisa mengambil keputusan bahwa warna input memiliki tingkat kecocokan yang tinggi dengan kriteria yang telah ditetapkan.

Ini adalah gambaran umum dari penerapan logika fuzzy dalam menentukan kecocokan warna dengan sistem RGB. Setiap langkah dapat diimplementasikan dengan lebih detail dan kompleks tergantung pada kebutuhan aplikasi dan ketepatan yang diinginkan.

# Dokumentasi Kode Logika Fuzzy untuk Kecocokan Warna

Kode ini menggunakan prinsip logika fuzzy untuk menentukan kecocokan warna berdasarkan intensitas komponen RGB (Red, Green, Blue).

## Fungsi dan Alur Kode

### Fungsi `fuzzyMembership`
Fungsi ini menghitung derajat keanggotaan sebuah nilai dalam rentang tertentu. Derajat keanggotaan adalah nilai antara 0 dan 1 yang menunjukkan seberapa kuat nilai tersebut tergolong dalam suatu kategori.
```javascript
// Fungsi keanggotaan fuzzy
function fuzzyMembership(value, low, mid, high) {
  if (value <= low || value >= high) return 0;
  else if (value === mid) return 1;
  else if (value > low && value < mid) return (value - low) / (mid - low);
  else return (high - value) / (high - mid);
}
```

### Fungsi `getColorMembership`
Fungsi ini menghitung derajat keanggotaan untuk setiap komponen warna (Red, Green, Blue) dengan memanggil `fuzzyMembership` untuk setiap kategori (low, medium, high).
```javascript
// Fungsi keanggotaan fuzzy
// Menghitung derajat keanggotaan untuk setiap warna
function getColorMembership(color) {
  return {
    low: fuzzyMembership(color, 0, 85, 170),
    medium: fuzzyMembership(color, 85, 170, 255),
    high: fuzzyMembership(color, 170, 255, 255),
  };
}
```

### Fungsi `fuzzyRule`
Fungsi ini menentukan output kecocokan berdasarkan aturan fuzzy yang didefinisikan. Outputnya adalah 'High', 'Medium', 'Low', atau 'None' tergantung pada kombinasi derajat keanggotaan dari setiap warna.
```javascript
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
```

### Fungsi `defuzzify`
Fungsi ini mengubah nilai fuzzy menjadi nilai crisp (nilai pasti) menggunakan metode centroid. Ini adalah ilustrasi, dan dalam implementasi nyata, perhitungan pusat area di bawah kurva diperlukan.
```javascript
// Defuzzifikasi dengan metode centroid (ilustratif)
function defuzzify(value) {
  // Ini adalah fungsi placeholder, dalam praktik nyata, Anda perlu menghitung pusat area di bawah kurva
  if (value === 'High') return 80;
  if (value === 'Medium') return 50;
  if (value === 'Low') return 20;
  return 0;
}
```

### Fungsi `determineColorMatch`
Fungsi utama ini menggabungkan semua fungsi di atas untuk menentukan kecocokan warna berdasarkan nilai RGB yang diberikan.
```javascript
// Fungsi utama untuk menentukan kecocokan warna
function determineColorMatch(r, g, b) {
  const redMembership = getColorMembership(r);
  const greenMembership = getColorMembership(g);
  const blueMembership = getColorMembership(b);

  const ruleResult = fuzzyRule(redMembership, greenMembership, blueMembership);
  const matchValue = defuzzify(ruleResult);
  
  return matchValue;
}
```

## Contoh Penggunaan
Kode ini juga menyertakan beberapa test case untuk menunjukkan bagaimana fungsi `determineColorMatch` bekerja dengan nilai RGB yang berbeda.
```javascript
// Test case 1: Semua nilai warna rendah
console.log(determineColorMatch(0, 0, 0)); // Expected output: 0

// Test case 3: Nilai warna merah tinggi, hijau dan biru rendah
console.log(determineColorMatch(200, 50, 50)); // Expected output: 80

// Test case 4: Nilai warna merah, hijau, dan biru sedang
console.log(determineColorMatch(150, 150, 150)); // Expected output: 50

// Test case 5: Nilai warna merah rendah, hijau rendah, biru tinggi
console.log(determineColorMatch(50, 50, 200)); // 20
```

## Penjelasan Alur Kode
1. Untuk setiap komponen warna, hitung derajat keanggotaannya.
2. Terapkan aturan fuzzy untuk menentukan tingkat kecocokan.
3. Gunakan defuzzifikasi untuk mendapatkan nilai kecocokan yang pasti.
4. Uji fungsi dengan beberapa test case untuk memverifikasi outputnya.

Dengan menggunakan prinsip logika fuzzy, kode ini dapat membantu dalam menentukan kecocokan warna dengan cara yang mirip dengan penilaian manusia, yang seringkali tidak hanya hitam dan putih, tetapi juga mempertimbangkan nuansa abu-abu.

